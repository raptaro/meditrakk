# appointments/services/paymaya.py
import base64
import logging
import requests
from typing import Optional, Dict, Any
from django.conf import settings

logger = logging.getLogger(__name__)

DEFAULT_TIMEOUT = 30  # seconds

class PayMayaService:
    """
    Helper for PayMaya interactions.
    - Use PUBLIC key for checkout creation (common PayMaya requirement)
    - Use SECRET key for payment status checks
    """

    @staticmethod
    def _get_basic_auth_header(use_public_key: bool = True) -> str:
        """
        Build Basic auth header with null checks
        """
        try:
            if use_public_key:
                key = getattr(settings, 'MAYA_PUBLIC_KEY', None)
                key_type = "PUBLIC"
            else:
                key = getattr(settings, 'MAYA_SECRET_KEY', None)
                key_type = "SECRET"
            
            # Check if key exists and is not None
            if not key:
                error_msg = f"PayMaya {key_type} key is not set or is None"
                logger.error(error_msg)
                raise ValueError(error_msg)
            
            # Log the key (masked for security)
            masked_key = key[:8] + "..." + key[-4:] if len(key) > 12 else "***"
            logger.info(f"Using PayMaya {key_type} key: {masked_key}")
            
            # PayMaya expects "key:" format
            creds = f"{key}:"
            encoded = base64.b64encode(creds.encode()).decode()
            
            return f"Basic {encoded}"
            
        except Exception as e:
            logger.exception(f"Error creating auth header: {e}")
            raise
        
    @staticmethod
    def test_paymaya_auth():
        """
        Test function to check PayMaya authentication and API connectivity
        """
        try:
            url = f"{settings.MAYA_API_BASE_URL.rstrip('/')}/checkout/v1/checkouts"
            
            # Minimal test payload
            test_payload = {
                "totalAmount": {
                    "value": 100.00,
                    "currency": "PHP"
                },
                "buyer": {
                    "firstName": "Test",
                    "lastName": "User"
                },
                "items": [
                    {
                        "name": "Test Item",
                        "quantity": 1,
                        "amount": {"value": 100.00},
                        "totalAmount": {"value": 100.00}
                    }
                ],
                "redirectUrl": {
                    "success": f"{settings.FRONTEND_URL.rstrip('/')}/success",
                    "failure": f"{settings.FRONTEND_URL.rstrip('/')}/failure",
                    "cancel": f"{settings.FRONTEND_URL.rstrip('/')}/cancel"
                },
                "requestReferenceNumber": "TEST_123"
            }

            headers = {
                "Content-Type": "application/json",
                "Authorization": PayMayaService._get_basic_auth_header(use_public_key=True),  # Use PUBLIC key
            }

            print(f"Testing PayMaya API...")
            print(f"URL: {url}")
            print(f"Using PUBLIC key for authentication")
            print(f"Payload: {test_payload}")

            response = requests.post(url, json=test_payload, headers=headers, timeout=30)
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Body: {response.text}")
            
            if response.status_code == 401:
                print("❌ AUTHENTICATION FAILED: 401 Unauthorized")
                print("Possible issues:")
                print("1. Wrong authentication method (trying PUBLIC key)")
                print("2. Keys are not activated in PayMaya dashboard")
                print("3. Using production keys in sandbox or vice versa")
            elif response.status_code == 200 or response.status_code == 201:
                print("✅ SUCCESS: API call worked!")
            else:
                print(f"⚠️  Unexpected status: {response.status_code}")
                
            return response
            
        except Exception as e:
            print(f"❌ ERROR: {e}")
            return None

    @staticmethod
    def test_with_secret_key():
        """
        Alternative test using SECRET key
        """
        try:
            url = f"{settings.MAYA_API_BASE_URL.rstrip('/')}/checkout/v1/checkouts"
            
            test_payload = {
                "totalAmount": {
                    "value": 100.00,
                    "currency": "PHP"
                },
                "buyer": {
                    "firstName": "Test",
                    "lastName": "User"
                },
                "items": [
                    {
                        "name": "Test Item",
                        "quantity": 1,
                        "amount": {"value": 100.00},
                        "totalAmount": {"value": 100.00}
                    }
                ],
                "redirectUrl": {
                    "success": f"{settings.FRONTEND_URL.rstrip('/')}/success",
                    "failure": f"{settings.FRONTEND_URL.rstrip('/')}/failure",
                    "cancel": f"{settings.FRONTEND_URL.rstrip('/')}/cancel"
                },
                "requestReferenceNumber": "TEST_123"
            }

            headers = {
                "Content-Type": "application/json",
                "Authorization": PayMayaService._get_basic_auth_header(use_public_key=False),  # Use SECRET key
            }

            print(f"Testing with SECRET key...")
            response = requests.post(url, json=test_payload, headers=headers, timeout=30)
            
            print(f"Status Code: {response.status_code}")
            print(f"Response Body: {response.text}")
                
            return response
            
        except Exception as e:
            print(f"❌ ERROR: {e}")
            return None

    @staticmethod
    def _extract_checkout_response(payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Tolerant extraction of checkout id / redirect url from different API shapes.
        """
        checkout_id = payload.get("checkoutId") or payload.get("id") or payload.get("checkout_id")
        
        redirect_url = payload.get("redirectUrl")
        if isinstance(redirect_url, dict):
            redirect_url = redirect_url.get("checkoutUrl") or redirect_url.get("success")

        return {
            "checkout_id": checkout_id,
            "checkout_url": redirect_url,
            "raw": payload
        }

    @staticmethod
    def create_checkout(payment, patient, appointment) -> Dict[str, Any]:
        """
        Create a PayMaya checkout session with enhanced error handling
        """
        try:
            # Validate required settings first
            required_settings = {
                'MAYA_API_BASE_URL': getattr(settings, 'MAYA_API_BASE_URL', None),
                'MAYA_PUBLIC_KEY': getattr(settings, 'MAYA_PUBLIC_KEY', None),
                'FRONTEND_URL': getattr(settings, 'FRONTEND_URL', None)
            }
            
            missing_settings = [key for key, value in required_settings.items() if not value]
            if missing_settings:
                error_msg = f"Missing required settings: {', '.join(missing_settings)}"
                logger.error(error_msg)
                return {"success": False, "error": error_msg}
            
            # Clean the URLs
            base_url = required_settings['MAYA_API_BASE_URL'].rstrip('/')
            frontend_url = required_settings['FRONTEND_URL'].rstrip('/')
            
            url = f"{base_url}/checkout/v1/checkouts"
                
            logger.info(f"🎯 Creating PayMaya checkout for payment {payment.id}")
            logger.info(f"Amount: {payment.amount}, Patient: {patient.first_name}")

            payload = {
                "totalAmount": {
                    "value": float(payment.amount),
                    "currency": "PHP",
                    "details": {
                        "discount": 0,
                        "serviceCharge": 0,
                        "shippingFee": 0,
                        "tax": 0,
                        "subtotal": float(payment.amount)
                    }
                },
                "buyer": {
                    "firstName": patient.first_name[:50] if patient.first_name else "",
                    "lastName": patient.last_name[:50] if patient.last_name else "",
                    "contact": {
                        "phone": str(getattr(patient, "phone_number", "") or "")[:20],
                        "email": str(getattr(patient, "email", "") or "")[:100]
                    }
                },
                "items": [
                    {
                        "name": f"Consultation with {appointment.doctor.user.get_full_name()}"[:100],
                        "quantity": 1,
                        "code": f"CONSULT_{appointment.id}"[:50],
                        "description": "Medical Consultation Fee",
                        "amount": {
                            "value": float(payment.amount),
                            "details": {
                                "discount": 0,
                                "serviceCharge": 0,
                                "shippingFee": 0,
                                "tax": 0,
                                "subtotal": float(payment.amount)
                            }
                        },
                        "totalAmount": {
                            "value": float(payment.amount)
                        }
                    }
                ],
                "redirectUrl": {
                    "success": f"{frontend_url}/payments/success/{payment.id}",
                    "failure": f"{frontend_url}/payment/failed?payment_id={payment.id}",
                    "cancel": f"{frontend_url}/payment/cancelled?payment_id={payment.id}"
                },
                "requestReferenceNumber": str(payment.id)[:50],
                "metadata": {
                    "appointment_id": str(appointment.id),
                    "patient_id": str(getattr(patient, "pk", "")),
                    "doctor_id": str(getattr(appointment.doctor, "id", ""))
                }
            }

            # Get auth header with error handling
            try:
                auth_header = PayMayaService._get_basic_auth_header(use_public_key=True)
            except ValueError as e:
                return {"success": False, "error": str(e)}

            headers = {
                "Content-Type": "application/json",
                "Authorization": auth_header,
            }

            logger.info(f"📤 Sending PayMaya request to: {url}")
            resp = requests.post(url, json=payload, headers=headers, timeout=DEFAULT_TIMEOUT)
            
            # Enhanced logging
            logger.info(f"📥 PayMaya Response: {resp.status_code}")
            logger.info(f"Response body: {resp.text}")

            if not resp.ok:
                logger.error(f"❌ PayMaya API error {resp.status_code}: {resp.text}")
                return {
                    "success": False, 
                    "error": f"PayMaya API error: {resp.status_code}",
                    "details": resp.text,
                    "status_code": resp.status_code
                }

            data = resp.json()
            logger.info(f"✅ PayMaya checkout created: {data.get('checkoutId', 'Unknown')}")

            # Extract checkout details
            checkout_id = data.get("checkoutId")
            redirect_url = data.get("redirectUrl")
            
            if isinstance(redirect_url, dict):
                redirect_url = redirect_url.get("checkoutUrl") or redirect_url.get("success")

            # Update payment
            payment.paymaya_reference_id = checkout_id
            payment.paymaya_checkout_url = redirect_url
            payment.paymaya_response = data
            payment.save()

            return {
                "success": True,
                "checkout_id": checkout_id,
                "checkout_url": redirect_url,
                "payment_id": payment.id,
                "raw": data
            }

        except Exception as e:
            logger.exception(f"💥 Unexpected error in PayMaya create_checkout: {str(e)}")
            return {"success": False, "error": f"Unexpected error: {str(e)}"}
    @staticmethod
    def get_payment_status(checkout_id: str) -> Optional[Dict[str, Any]]:
        """
        Get payment status for a checkout ID.
        Uses SECRET key for authentication
        """
        try:
            # CORRECT ENDPOINT - Get checkout details (not payments list)
            url = f"{settings.MAYA_API_BASE_URL.rstrip('/')}/payments/v1/checkouts/{checkout_id}"
            
            headers = {
                "Authorization": PayMayaService._get_basic_auth_header(use_public_key=False),
            }
            
            logger.info(f"Checking payment status for checkout: {checkout_id}")
            resp = requests.get(url, headers=headers, timeout=DEFAULT_TIMEOUT)

            if not resp.ok:
                logger.error("PayMaya get_payment_status failed: %s %s", resp.status_code, resp.text)
                return None

            payload = resp.json()
            
            # Parse checkout response (different structure)
            return {
                "status": payload.get("status"),  # CHECKOUT_SUCCESS, CHECKOUT_FAILED, etc.
                "payment_status": payload.get("paymentStatus"),  # PAYMENT_SUCCESS, PAYMENT_FAILED
                "checkout_id": payload.get("id"),
                "amount": payload.get("amount", {}).get("value") if isinstance(payload.get("amount"), dict) else payload.get("amount"),
                "currency": payload.get("amount", {}).get("currency") if isinstance(payload.get("amount"), dict) else "PHP",
                "paid_at": payload.get("createdAt"),
                "raw": payload
            }

        except Exception as e:
            logger.exception("Error getting PayMaya status for checkout_id=%s: %s", checkout_id, e)
            return None

    @staticmethod
    def verify_environment():
        """
        Verify that all required environment variables are set
        """
        required_vars = [
            'MAYA_API_BASE_URL',
            'MAYA_SECRET_KEY', 
            'MAYA_PUBLIC_KEY',
            'FRONTEND_URL'
        ]
        
        missing = []
        for var in required_vars:
            if not hasattr(settings, var) or not getattr(settings, var):
                missing.append(var)
                
        if missing:
            print(f"❌ Missing environment variables: {', '.join(missing)}")
            return False
        else:
            print("✅ All required environment variables are set")
            print(f"   API Base: {settings.MAYA_API_BASE_URL}")
            return True
    @staticmethod
    def get_payment_failure_reason(checkout_id: str) -> Optional[Dict[str, Any]]:
        """
        Get detailed failure reason for a payment
        """
        try:
            # Try to get payment details
            status_info = PayMayaService.get_payment_status(checkout_id)
            if status_info:
                logger.info(f"Payment status for {checkout_id}: {status_info.get('status')}")
                logger.info(f"Full status info: {status_info}")
                return status_info
            
            # If no payment found, try to get checkout details
            url = f"{settings.MAYA_API_BASE_URL.rstrip('/')}/checkout/v1/checkouts/{checkout_id}"
            headers = {
                "Authorization": PayMayaService._get_basic_auth_header(use_public_key=True),
            }
            
            resp = requests.get(url, headers=headers, timeout=30)
            if resp.status_code == 200:
                checkout_data = resp.json()
                logger.info(f"Checkout details: {checkout_data}")
                return {"type": "checkout", "data": checkout_data}
            else:
                logger.error(f"Failed to get checkout details: {resp.status_code} - {resp.text}")
                return None
                
        except Exception as e:
            logger.exception(f"Error getting payment failure reason: {e}")
            return None