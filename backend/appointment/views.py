from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.utils.dateparse import parse_datetime

from .models import AppointmentReferral
from patient.models import Patient
from .serializers import AppointmentReferralSerializer, AppointmentSerializer
from user.permissions import isDoctor, isSecretary

from django.utils import timezone
from datetime import date
from django.utils.timezone import now, localtime
from datetime import datetime, timedelta
from .models import Appointment

from user.models import Doctor, UserAccount, Schedule
from user.models import UserAccount 
from user.permissions import IsReferralParticipant, IsMedicalStaff, PatientMedicalStaff

from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from patient.serializers import PatientSerializer
from django.db import IntegrityError
import pytz
from dateutil.relativedelta import relativedelta  # <-- Add this
from dateutil.relativedelta import MO, TU, WE, TH, FR, SA, SU
from django.db.models import Max
from .serializers import AppointmentSerializer, QueueSerializer
from queueing.models import TemporaryStorageQueue
from django.db.models import F
from django.db import transaction
import pytz

class DoctorCreateReferralView(APIView):
    permission_classes = [isDoctor]

    def post(self, request):
        payload = request.data
        print(payload)
        # check if payload is bulk or dict
        is_bulk = isinstance(payload, list)

        serializer = AppointmentReferralSerializer(
            data = payload,
            many=is_bulk,
            context={'request': request}
        )
        
        serializer.is_valid(raise_exception=True)
        created = serializer.save()
        
        if is_bulk:
            output = AppointmentReferralSerializer(created, many=True).data
        else:
            output = AppointmentReferralSerializer(created).data
        
        return Response(output, status=status.HTTP_201_CREATED)
        
class ReferralViewList(APIView):
    permission_classes = [isSecretary]
    def get(self, request):
        referrals = AppointmentReferral.objects.filter(status='pending')
        serializer = AppointmentReferralSerializer(referrals, many=True)
        
        return Response(serializer.data)
class DoctorSchedule(APIView):
    permission_classes = [PatientMedicalStaff]

    def get(self, request, doctor_id):
        try:
            # Step 1: Get UserAccount (using the provided user ID)
            user = UserAccount.objects.get(id=doctor_id, role__in=['doctor', 'on-call-doctor'])
            doctor = user.doctor_profile  # Access the related Doctor instance
            schedules = Schedule.objects.filter(doctor=doctor)
            
            # Step 4: Generate availability slots based on the schedules
            availability = []
            doctor_tz = pytz.timezone(doctor.timezone)
            now = timezone.now().astimezone(doctor_tz)

            for schedule in schedules:
                # For each scheduled day (e.g., Tuesday), generate slots for the next 12 weeks
                day_name = schedule.day_of_week
                start_time = schedule.start_time
                end_time = schedule.end_time

                # Generate slots for this day for the next 12 weeks
                for week in range(12):
                    # Find the next occurrence of this day (e.g., Tuesday)
                    next_day = now + relativedelta(
                        weeks=week, 
                        weekday=day_to_weekday(day_name),  # Helper function
                        hour=start_time.hour,
                        minute=start_time.minute,
                        second=0,
                        microsecond=0
                    )
                    
                    # Generate time slots for this day
                    current_slot = next_day
                    while current_slot.time() < end_time:
                        slot_end = current_slot + timedelta(minutes=30)
                        
                        # Check if slot is available
                        is_available = not Appointment.objects.filter(
                            doctor=doctor,
                            appointment_date__gte=current_slot.astimezone(pytz.UTC),
                            appointment_date__lt=slot_end.astimezone(pytz.UTC),
                            status='Scheduled'
                        ).exists()
                        
                        availability.append({
                            "start": current_slot.astimezone(pytz.UTC).isoformat(),
                            "end": slot_end.astimezone(pytz.UTC).isoformat(),
                            "is_available": is_available
                        })
                        
                        current_slot = slot_end

            return Response({
                "doctor_id": user.id,
                "doctor_name": user.get_full_name(),
                "timezone": doctor.timezone,
                "specialization": doctor.specialization,
                "availability": availability
            })

        except UserAccount.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=404)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor profile not found"}, status=404)
    
def day_to_weekday(day_name):
    return {
        'Monday': MO(-1),
        'Tuesday': TU(-1),
        'Wednesday': WE(-1),
        'Thursday': TH(-1),
        'Friday': FR(-1),
        'Saturday': SA(-1),
        'Sunday': SU(-1)
    }[day_name]    
        
class ScheduleAppointment(APIView):
    permission_classes = [isSecretary]

    def post(self, request):
        data = request.data
        print('data', data)
        referral_id = data.get("referral_id")
        appointment_date_str = data.get("appointment_date")

        if not referral_id or not appointment_date_str:
            return Response(
                {"error": "Both referral_id and appointment_date are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            referral = AppointmentReferral.objects.get(id=referral_id)
            doctor = referral.receiving_doctor.doctor_profile
            doctor_tz = pytz.timezone(doctor.timezone)
        except (AppointmentReferral.DoesNotExist, Doctor.DoesNotExist):
            return Response({"error": "Invalid referral"}, status=status.HTTP_404_NOT_FOUND)

        # Parse datetime
        try:
            # Handle both naive and aware datetimes
            if 'Z' in appointment_date_str:
                appointment_date = datetime.fromisoformat(appointment_date_str.replace('Z', '+00:00'))
            else:
                appointment_date = datetime.fromisoformat(appointment_date_str)
        except ValueError:
            return Response({"error": "Invalid ISO datetime format"}, status=400)

        # Convert to doctor's timezone and UTC
        try:
            if appointment_date.tzinfo is None:  # Naive datetime
                appointment_date_doctor = doctor_tz.localize(appointment_date)
            else:  # Aware datetime - convert directly
                appointment_date_doctor = appointment_date.astimezone(doctor_tz)
                
            appointment_date_utc = appointment_date_doctor.astimezone(pytz.UTC)
        except (pytz.exceptions.NonExistentTimeError, pytz.exceptions.AmbiguousTimeError):
            return Response({"error": "Invalid time due to DST transition"}, status=400)

        # Validate slot alignment
        if (appointment_date_doctor.minute % 30 != 0 or 
            appointment_date_doctor.second != 0 or 
            appointment_date_doctor.microsecond != 0):
            return Response({"error": "Appointments must start at :00 or :30"}, status=400)

        # Check doctor's schedule
        day_of_week = appointment_date_doctor.strftime('%A')
        schedule_exists = doctor.schedule.filter(
            day_of_week=day_of_week,
            start_time__lte=appointment_date_doctor.time(),
            end_time__gte=(appointment_date_doctor + timedelta(minutes=30)).time()
        ).exists()
        
        if not schedule_exists:
            return Response({"error": "Doctor not available at this time"}, status=400)

        # Check for conflicts using calculated end time
        calculated_end_utc = appointment_date_utc + timedelta(minutes=30)
        conflict = Appointment.objects.filter(
            doctor=doctor,
            appointment_date__lt=calculated_end_utc,
            appointment_date__gte=appointment_date_utc - timedelta(minutes=29)  # 1-minute buffer
        ).exists()

        if conflict:
            return Response({"error": "Time slot is already booked"}, status=status.HTTP_409_CONFLICT)

        # Create appointment
        try:
            appointment = Appointment.objects.create(
                patient=referral.patient,
                doctor=doctor,
                scheduled_by=request.user,
                appointment_date=appointment_date_utc,
                status='Scheduled'
            )
        except IntegrityError:
            return Response({"error": "Appointment conflict detected"}, status=status.HTTP_409_CONFLICT)

        # Update referral
        referral.appointment = appointment
        referral.status = 'scheduled'
        referral.save()

        return Response({
            "message": "Appointment scheduled successfully",
            "appointment_id": appointment.id,
            "appointment_date_utc": appointment.appointment_date.isoformat(),
            "appointment_date_local": appointment_date_doctor.isoformat()
        }, status=status.HTTP_201_CREATED)
        
# only referral participants can access this


class AppointmentReferralViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentReferralSerializer
    permission_classes = [IsAuthenticated, IsReferralParticipant]

    def get_queryset(self):
        """
        Base queryset: shows relevant referrals based on user type.
        - Patients: only their referrals
        - Doctors: referrals they sent or received
        """
        user = self.request.user
        queryset = AppointmentReferral.objects.all()

        if hasattr(user, 'patient_profile'):
            # Patient: only referrals related to them
            queryset = queryset.filter(patient=user.patient_profile)
        else:
            # Doctor: referrals where they are sender or receiver
            queryset = queryset.filter(
                Q(referring_doctor=user) | Q(receiving_doctor=user)
            )

        return queryset.select_related('patient', 'appointment').order_by('-created_at')

    def perform_create(self, serializer):
        """Automatically sets the referring doctor to the logged-in user."""
        serializer.save(referring_doctor=self.request.user)

    @action(detail=True, methods=['patch'], url_path='decline')
    def decline_referral(self, request, pk=None):
        """
        Allows the receiving doctor to decline a referral.
        This also cancels the linked appointment (if it exists).
        """
        referral = self.get_object()
        if referral.receiving_doctor != request.user:
            return Response(
                {'detail': 'Only the receiving doctor can decline this referral.'},
                status=status.HTTP_403_FORBIDDEN
            )

        appointment = getattr(referral, 'appointment', None)
        if appointment:
            appointment.status = 'cancelled'
            appointment.save()

        referral.status = 'cancelled'
        referral.save()
        serializer = self.get_serializer(referral)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='patient-info')
    def get_patient_info(self, request, pk=None):
        """
        Allows the receiving doctor or the patient to view patient info.
        Restricts unauthorized access.
        """
        referral = self.get_object()
        if (
            referral.receiving_doctor != request.user
            and not (
                hasattr(request.user, 'patient_profile')
                and referral.patient == request.user.patient_profile
            )
        ):
            return Response({'detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = PatientSerializer(referral.patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='my-referrals')
    def my_referrals(self, request):
        """
        Allows a patient to view all of their referrals.
        """
        if not hasattr(request.user, 'patient_profile'):
            return Response(
                {'detail': 'Only patients can access this endpoint.'},
                status=status.HTTP_403_FORBIDDEN
            )

        referrals = AppointmentReferral.objects.filter(
            patient=request.user.patient_profile
        ).select_related('referring_doctor', 'receiving_doctor', 'appointment')

        serializer = self.get_serializer(referrals, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='upcoming')
    def upcoming_appointments(self, request):
        now = timezone.now()
        qs = self.get_queryset().filter(
            appointment__appointment_date__gte=now,
            status__in=['scheduled', 'pending']
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='past')
    def past_appointments(self, request):
        now = timezone.now()
        qs = self.get_queryset().filter(
            Q(appointment__appointment_date__lt=now) |
            Q(status__in=['completed', 'canceled'])
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
    
# upcoming appointments in registration
class UpcomingAppointments(APIView):
    permission_classes = [PatientMedicalStaff]
    
    def get(self, request):
        user = request.user
        manila = pytz.timezone("Asia/Manila")
        current_time = localtime(now(), manila)   # Manila datetime
        date_today = current_time.date()          # Manila date
        print(date_today, current_time)
        role = getattr(request.user, "role", None)
        print("Role:", role, "User:", request.user.id)

        if role == 'secretary':
            # Secretaries see ALL
            appointments_today = Appointment.objects.filter(
                status="Scheduled",
                appointment_date__date=date_today,
                appointment_date__gte=current_time
            )

        elif role == 'doctor':
            # General doctor sees their own appointments
            doctor = Doctor.objects.filter(user=request.user).first()
            appointments_today = Appointment.objects.filter(
                status="Scheduled",
                appointment_date__date=date_today,
                appointment_date__gte=current_time,
                doctor=doctor
            )
        elif role == 'on-call-doctor':
            # On-call doctor sees their own appointments (FIXED)
            doctor = Doctor.objects.filter(user=request.user).first()
            appointments_today = Appointment.objects.filter(
                status="Scheduled",
                appointment_date__date=date_today,
                appointment_date__gte=current_time,
                doctor=doctor  # Changed from patient__user=user to doctor=doctor
            )
        elif role == 'patient':
            # Patient sees their own appointments
            appointments_today = Appointment.objects.filter(
                status="Scheduled",
                appointment_date__date=date_today,
                appointment_date__gte=current_time,
                patient__user=user  # This is correct for patient role
            )
        else:
            appointments_today = Appointment.objects.none()
      
        serializer = AppointmentSerializer(appointments_today, many=True)
        return Response(serializer.data)


def ensure_positions_initialized_for_date(queue_date):
    """
    Ensure every TemporaryStorageQueue for queue_date has a sequential non-zero position.
    Positions will be assigned as 1..N in ascending order of queue_number if any position <= 0.
    """
    qs = TemporaryStorageQueue.objects.filter(queue_date=queue_date).order_by('queue_number')
    # Initialization needed if any position is <= 0 or missing
    if qs.filter(position__lte=0).exists():
        with transaction.atomic():
            locked = TemporaryStorageQueue.objects.select_for_update().filter(
                queue_date=queue_date
            ).order_by('queue_number')
            pos = 1
            for entry in locked:
                if entry.position != pos:
                    entry.position = pos
                    entry.save(update_fields=['position'])
                pos += 1

def _patient_identifier(patient):
    """Return a safe scalar identifier for a patient instance."""
    if patient is None:
        return None
    return getattr(patient, 'pk', None) or getattr(patient, 'id', None) or getattr(patient, 'patient_id', None) or str(patient)

def _patient_name(patient):
    """Return a safe display name for a patient instance."""
    if patient is None:
        return ""
    # prefer method
    if callable(getattr(patient, "get_full_name", None)):
        try:
            return patient.get_full_name()
        except Exception:
            pass
    for attr in ("full_name", "name", "display_name"):
        val = getattr(patient, attr, None)
        if val:
            return val
    return str(patient)

class AcceptAppointmentView(APIView):
    permission_classes = [isSecretary]

    def post(self, request, appointment_id):
        today = now().date()
        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
        
        already = TemporaryStorageQueue.objects.filter(
            patient=appointment.patient,
            queue_date=today
        ).exclude(status__in=['Completed', 'Cancelled'])
        
        if already.exists():
            return Response(
                {"message": "Patient already in queue today"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        priority_level = "Priority"
        if hasattr(appointment, 'appointmentreferral') and getattr(appointment.appointmentreferral, 'reason', None):
            reason = (appointment.appointmentreferral.reason or "").lower()
            if "urgent" in reason or "priority" in reason:
                priority_level = "Priority"

        complaint_text = appointment.notes or "Appointment"

        ensure_positions_initialized_for_date(today)

        with transaction.atomic():
            # Lock today's active rows
            current_qs = TemporaryStorageQueue.objects.select_for_update().filter(
                queue_date=today
            ).exclude(status__in=['Completed', 'Cancelled']).order_by('position', 'queue_number')
            max_q = current_qs.aggregate(Max('queue_number'))['queue_number__max'] or 0
            new_queue_number = max_q + 1

            if current_qs.exists():
                first_entry = current_qs.first()

                TemporaryStorageQueue.objects.filter(
                    queue_date=today,
                    position__gt=first_entry.position
                ).update(position=F('position') + 1)
                new_position = first_entry.position + 1
            else:
                new_position = 1
            queue_entry = TemporaryStorageQueue.objects.create(
                patient=appointment.patient,
                priority_level=priority_level,
                queue_number=new_queue_number,
                complaint=complaint_text,
                status="Waiting",
                queue_date=today,
                position=new_position
            )

            appointment.status = "Waiting"
            appointment.save(update_fields=['status'])

        ordered_qs = TemporaryStorageQueue.objects.filter(
            queue_date=today
        ).exclude(status__in=['Completed', 'Cancelled']).order_by('position', 'queue_number')

        queue_list = []
        for q in ordered_qs:
            queue_list.append({
                "position": q.position,
                "queue_number": q.queue_number,
                "patient_id": _patient_identifier(getattr(q, 'patient', None)),
                "patient_name": _patient_name(getattr(q, 'patient', None)),
                "priority_level": q.priority_level,
                "status": q.status,
            })

        return Response({
            "message": "Appointment accepted",
            "new_queue_number": queue_entry.queue_number,
            "new_position": queue_entry.position,
            "queue_entry_id": queue_entry.id,
            "ordered_queue": queue_list
        }, status=status.HTTP_201_CREATED)


class CancelAppointmentView(APIView):
    def post(self, request, appointment_id):
        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)

        appointment.status = "Cancelled"
        appointment.save()

        return Response({"message": "Appointment cancelled"}, status=200)


class RequeueAppointmentView(APIView):
    """
    For patients who arrive late (>30 mins) but are still allowed to be requeued.
    """
    def post(self, request, appointment_id):
        try:
            appointment = Appointment.objects.get(id=appointment_id)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=404)

        # Mark original appointment as cancelled
        appointment.status = "Cancelled"
        appointment.save()

        # Add to queue as a walk-in (end of queue)
        queue_entry = TemporaryStorageQueue.objects.create(
            patient=appointment.patient,
            complaint=appointment.notes or "General Illness",
            status="Waiting"
        )

        return Response({
            "message": "Late patient requeued at end of queue",
            "queue": QueueSerializer(queue_entry).data
        }, status=200)
        
from datetime import datetime
from calendar import monthrange

class QueueDebugMonthView(APIView):
    """
    Returns all TemporaryStorageQueue entries for a given month and year
    as JSON response. Defaults to current month if not provided.
    """
    permission_classes = [IsMedicalStaff]
    def get(self, request):
        # Get month and year from query parameters, or default to today’s month & year
        today = now().date()
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        try:
            if month is not None:
                month = int(month)
                if not (1 <= month <= 12):
                    raise ValueError
            else:
                month = today.month

            if year is not None:
                year = int(year)
                # Optional: you may want to validate a range for year
            else:
                year = today.year
        except ValueError:
            return Response(
                {"error": "Invalid month or year parameter"},
                status=400
            )

        # Compute first day and last day of the month
        first_day = datetime(year, month, 1).date()
        last_day = datetime(year, month, monthrange(year, month)[1]).date()

        # Filter queue entries by queue_date in that range
        queue_entries = TemporaryStorageQueue.objects.filter(
            queue_date__gte=first_day,
            queue_date__lte=last_day
        ).order_by('queue_number')

        data = []
        for entry in queue_entries:
            data.append({
                "id": entry.id,
                "patient_id": entry.patient.patient_id,
                "patient_name": f"{entry.patient.first_name} {entry.patient.last_name}",
                "queue_number": entry.queue_number,
                "priority_level": entry.priority_level,
                "complaint": entry.complaint,
                "status": entry.status,
                "created_at": entry.created_at,
                "queue_date": entry.queue_date,  # include the date if useful
            })

        return Response({
            "month": month,
            "year": year,
            "entries": data
        })


from django.core.mail import send_mail
from django.http import JsonResponse
from django.views import View

class TestEmailView(View):
    permission_classes = [IsMedicalStaff]   
    def get(self, request):
        send_mail(
            subject="This is from django",
            message="Sample email",
            from_email="ralphancheta000@gmail.com",
            recipient_list=["dpares08@gmail.com"],
            fail_silently=False,
        )
        return JsonResponse({"status": "Email sent!"})
    
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import datetime
import requests
import json
import base64
from django.conf import settings

from .models import Appointment, Payment, Patient, Doctor
from .serializers import (
    AppointmentBookingSerializer, 
    PaymentSerializer,
    AppointmentDetailSerializer
)

class PayMayaService:
    """Service class to handle PayMaya API interactions"""
    
    @staticmethod
    def get_auth_header(use_public=False):
        if use_public:
            credentials = f"{settings.MAYA_PUBLIC_KEY}:"
        else:
            credentials = f"{settings.MAYA_SECRET_KEY}:"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        return f"Basic {encoded_credentials}"

    
    @staticmethod
    def create_checkout(payment, patient, appointment):
        """Create PayMaya checkout session"""
        try:
            url = f"{settings.MAYA_API_BASE_URL}/checkout/v1/checkouts"
            
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
                    "firstName": patient.first_name,
                    "lastName": patient.last_name,
                    "contact": {
                        "phone": patient.phone_number,
                        "email": patient.email
                    }
                },
                "items": [
                    {
                        "name": f"Consultation with {appointment.doctor.user.get_full_name()}",
                        "quantity": 1,
                        "code": f"CONSULT_{appointment.id}",
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
                    "success": f"{settings.FRONTEND_URL}/payment/success?payment_id={payment.id}",
                    "failure": f"{settings.FRONTEND_URL}/payment/failed?payment_id={payment.id}",
                    "cancel": f"{settings.FRONTEND_URL}/payment/cancelled?payment_id={payment.id}"
                },
                "requestReferenceNumber": str(payment.id),
                "metadata": {
                    "appointment_id": appointment.id,
                    "patient_id": patient.pk,
                    "doctor_id": appointment.doctor.id
                }
            }
            
            headers = {
                'Content-Type': 'application/json',
                'Authorization': PayMayaService.get_auth_header(use_public=True)
            }
            
            response = requests.post(url, json=payload, headers=headers, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                
                # Update payment with PayMaya details
                payment.paymaya_reference_id = data.get('checkoutId')
                payment.paymaya_checkout_url = data.get('redirectUrl')
                payment.paymaya_response = data
                payment.save()
                
                return {
                    'success': True,
                    'checkout_id': data.get('checkoutId'),
                    'checkout_url': data.get('redirectUrl'),
                    'payment_id': payment.id
                }
            else:
                print(f"PayMaya API Error: {response.status_code} - {response.text}")
                return {
                    'success': False,
                    'error': f"PayMaya API error: {response.status_code}",
                    'details': response.text
                }
                
        except requests.exceptions.Timeout:
            return {
                'success': False,
                'error': 'PayMaya API timeout'
            }
        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': f'PayMaya API request failed: {str(e)}'
            }
        except Exception as e:
            return {
                'success': False,
                'error': f'Unexpected error: {str(e)}'
            }
    
    @staticmethod
    def get_payment_status(checkout_id):
        """Get payment status from PayMaya"""
        try:
            url = f"{settings.MAYA_API_BASE_URL}/payments/v1/checkouts/{checkout_id}/payments"
            headers = {
                'Authorization': PayMayaService.get_auth_header()
            }
            
            response = requests.get(url, headers=headers, timeout=30)
            
            if response.status_code == 200:
                payments = response.json()
                if payments:
                    # Get the latest payment
                    latest_payment = payments[0]
                    return {
                        'status': latest_payment.get('status'),
                        'payment_id': latest_payment.get('id'),
                        'amount': latest_payment.get('amount'),
                        'currency': latest_payment.get('currency'),
                        'paid_at': latest_payment.get('createdAt')
                    }
            return None
            
        except Exception as e:
            print(f"Error getting PayMaya status: {str(e)}")
            return None

class BookAppointmentAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            data = request.data
            print(data)

            # Check if user has a patient profile
            if not hasattr(request.user, 'patient_profile'):
                return Response({
                    'error': 'Patient profile not found. Please complete your patient profile setup.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            patient = request.user.patient_profile
            
            if not patient.first_name or not patient.last_name or not patient.phone_number:
                return Response({
                    'error': 'Please complete your patient profile with first name, last name, and phone number.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            print(f"Using authenticated patient: {patient.patient_id} - {patient.full_name}")
            
            doctor_id = data.get('doctor_id')
            appointment_date = data.get('appointment_date')
            notes = data.get('notes', '')
            payment_method = data.get('payment_method', 'Gcash')
            
            if not all([doctor_id, appointment_date]):
                return Response({
                    'error': 'Doctor and appointment date are required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                doctor = Doctor.objects.get(role_id=data["doctor_id"])

            except Doctor.DoesNotExist:
                return Response({
                    'error': 'Doctor not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            existing_appointment = Appointment.objects.filter(
                doctor=doctor,
                appointment_date=appointment_date,
                status__in=['Scheduled', 'PendingPayment', 'Waiting']
            ).exists()
            
            if existing_appointment:
                return Response({
                    'error': 'This time slot is already booked. Please choose another time.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create appointment
            appointment = Appointment.objects.create(
                patient=patient,
                doctor=doctor,
                appointment_date=appointment_date,
                notes=notes,
                status='PendingPayment'
            )

            # ✅ Fixed payment creation
            payment = Payment.objects.create(
                appointment=appointment,
                patient=patient,  # Required field added
                amount=500.00,
                payment_method=payment_method,
                status='Pending'
            )

            # Payment handling
            if payment_method == 'PayMaya':
                paymaya_result = PayMayaService.create_checkout(payment, patient, appointment)
                
                if paymaya_result['success']:
                    return Response({
                        'appointment_id': appointment.id,
                        'payment_id': payment.id,
                        'checkout_url': paymaya_result['checkout_url'],
                        'message': 'Appointment created. Please complete the payment.'
                    }, status=status.HTTP_201_CREATED)
                else:
                    appointment.delete()
                    return Response({
                        'error': paymaya_result.get('error', 'Payment processing failed'),
                        'details': paymaya_result.get('details')
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    
            else:
                return Response({
                    'appointment_id': appointment.id,
                    'payment_id': payment.id,
                    'message': 'Appointment created. Please upload GCash payment proof.',
                    'payment_details': {
                        'amount': '500.00',
                        'payment_method': payment_method,
                        'status': 'Pending'
                    }
                }, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            print(f"Error in BookAppointmentAPIView: {str(e)}")
            return Response({
                'error': f'Failed to create appointment: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CheckPaymentStatusAPIView(APIView):
    """
    API to check PayMaya payment status
    """
    def get(self, request, payment_id):
        try:
            payment = Payment.objects.get(id=payment_id)
            
            if payment.payment_method == 'PayMaya' and payment.paymaya_reference_id:
                status_result = PayMayaService.get_payment_status(
                    payment.paymaya_reference_id
                )
                
                if status_result:
                    # Update payment status based on PayMaya response
                    if status_result['status'] == 'PAYMENT_SUCCESS':
                        payment.status = 'Paid'
                        payment.appointment.status = 'Scheduled'
                        payment.appointment.save()
                    elif status_result['status'] in ['PAYMENT_FAILED', 'PAYMENT_EXPIRED']:
                        payment.status = 'Failed'
                    
                    payment.save()
                    
                    return Response({
                        'payment_status': payment.status,
                        'appointment_status': payment.appointment.status,
                        'paymaya_status': status_result['status']
                    })
            
            return Response({
                'payment_status': payment.status,
                'appointment_status': payment.appointment.status
            })
            
        except Payment.DoesNotExist:
            return Response({
                'error': 'Payment not found'
            }, status=status.HTTP_404_NOT_FOUND)

class PaymentWebhookAPIView(APIView):
    """
    Webhook for PayMaya payment notifications
    """
    def post(self, request):
        try:
            # Verify webhook signature (you should verify this in production)
            webhook_data = request.data
            
            # Extract relevant data from webhook
            checkout_id = webhook_data.get('id')
            event_type = webhook_data.get('type')
            payment_status = webhook_data.get('data', {}).get('status')
            
            if event_type == 'CHECKOUT_SUCCESS' and payment_status == 'PAYMENT_SUCCESS':
                # Find payment by checkout ID
                payment = Payment.objects.get(
                    paymaya_reference_id=checkout_id
                )
                
                payment.status = 'Paid'
                payment.paymaya_response = webhook_data
                payment.save()
                
                # Update appointment status
                payment.appointment.status = 'Scheduled'
                payment.appointment.save()
                
                # TODO: Send confirmation email/SMS
                
                return Response({'status': 'success'}, status=status.HTTP_200_OK)
                
            elif event_type in ['CHECKOUT_FAILURE', 'CHECKOUT_DROPOUT']:
                payment = Payment.objects.get(
                    paymaya_reference_id=checkout_id
                )
                payment.status = 'Failed'
                payment.paymaya_response = webhook_data
                payment.save()
                
                return Response({'status': 'failed'}, status=status.HTTP_200_OK)
                
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, 
                          status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Webhook error: {str(e)}")
            return Response({'error': str(e)}, 
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UploadGcashProofAPIView(APIView):
    """
    API for uploading GCash payment proof
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, appointment_id):
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            
            # Verify the patient matches (you might want to use authentication instead)
            if hasattr(request.user, 'patient'):
                if appointment.patient != request.user.patient:
                    return Response({
                        'error': 'You can only upload proof for your own appointments'
                    }, status=status.HTTP_403_FORBIDDEN)
            
            payment = appointment.payment
            
            if payment.payment_method != 'Gcash':
                return Response({
                    'error': 'This appointment does not use GCash payment'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            gcash_proof = request.FILES.get('gcash_proof')
            if not gcash_proof:
                return Response({
                    'error': 'GCash proof image is required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate file type
            allowed_types = ['image/jpeg', 'image/png', 'image/jpg']
            if gcash_proof.content_type not in allowed_types:
                return Response({
                    'error': 'Only JPEG and PNG images are allowed'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate file size (5MB max)
            if gcash_proof.size > 5 * 1024 * 1024:
                return Response({
                    'error': 'File size must be less than 5MB'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            payment.gcash_proof = gcash_proof
            payment.status = 'Pending'  # Wait for secretary verification
            payment.save()
            
            return Response({
                'message': 'GCash proof uploaded successfully. Waiting for verification.',
                'payment_id': payment.id
            }, status=status.HTTP_200_OK)
            
        except Appointment.DoesNotExist:
            return Response({
                'error': 'Appointment not found'
            }, status=status.HTTP_404_NOT_FOUND)

class SecretaryAppointmentAPIView(APIView):
    """
    API for secretary to manage appointments
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Get all appointments for secretary dashboard
        """
        status_filter = request.GET.get('status', '')
        payment_status = request.GET.get('payment_status', '')
        
        appointments = Appointment.objects.select_related(
            'patient', 'doctor', 'payment'
        ).all()
        
        if status_filter:
            appointments = appointments.filter(status=status_filter)
        
        if payment_status:
            appointments = appointments.filter(payment__status=payment_status)
        
        serializer = AppointmentDetailSerializer(appointments, many=True)
        return Response(serializer.data)
    
    def patch(self, request, appointment_id):
        """
        Update appointment status (for secretary)
        """
        try:
            appointment = Appointment.objects.get(id=appointment_id)
            new_status = request.data.get('status')
            action = request.data.get('action')
            
            if action == 'verify_payment':
                # Verify any pending payment
                if appointment.payment.status == 'Pending':
                    appointment.payment.status = 'Paid'
                    appointment.payment.save()
                    appointment.status = 'Scheduled'
                    appointment.save()
                    
                    return Response({
                        'message': 'Payment verified and appointment scheduled'
                    })
            
            elif action == 'reject_payment':
                if appointment.payment.status == 'Pending':
                    appointment.payment.status = 'Failed'
                    appointment.payment.save()
                    appointment.status = 'Cancelled'
                    appointment.save()
                    
                    return Response({
                        'message': 'Payment rejected and appointment cancelled'
                    })
            
            elif new_status and new_status in dict(Appointment.STATUS):
                appointment.status = new_status
                appointment.save()
                
                return Response({
                    'message': f'Appointment status updated to {new_status}'
                })
            
            return Response({
                'error': 'Invalid action or status'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        except Appointment.DoesNotExist:
            return Response({
                'error': 'Appointment not found'
            }, status=status.HTTP_404_NOT_FOUND)
