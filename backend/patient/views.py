import boto3
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404, FileResponse
from django.shortcuts import get_object_or_404
from django.db.models.functions import Lower
from django.utils.timezone import now

from queueing.serializers import PreliminaryAssessmentBasicSerializer, TemporaryStorageQueueSerializer
from .serializers import PatientMedicalRecordSerializer, PatientSerializer, PatientRegistrationSerializer, LabRequestSerializer, LabResultSerializer, PatientVisitSerializer, PatientLabTestSerializer, CommonDiseasesSerializer, PrescriptionSerializer
from queueing.models import  PreliminaryAssessment, TemporaryStorageQueue
from queueing.models import Treatment as TreatmentModel

from datetime import datetime
from django.db.models import Max
from django.db.models import Q, Prefetch
from patient.models import Patient, Prescription

# Supabase credentials
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from backend.supabase_client import supabase
from uuid import uuid4
from django.conf import settings
import os
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.permissions import IsDoctorOrOnCallDoctor, IsMe, IsMedicalStaff, IsParticipant, isDoctor, isSecretary, isAdmin
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics
from .models import LabRequest, LabResult, Diagnosis
from rest_framework.parsers import MultiPartParser, FormParser

#reports
from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth
from django.utils.dateparse import parse_date
from collections import defaultdict

# create user
from user.models import UserAccount, create_user_id

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from queueing.utils import compute_queue_snapshot
import logging

from rest_framework.exceptions import PermissionDenied
logger = logging.getLogger(__name__)


class PatientListView(APIView):
    permission_classes = [IsMedicalStaff]

    def get(self, request):
        try:
            role = getattr(request.user, "role", None)
            print(f"User role: {role}")
            user_id = request.user.id
            print(f"User ID: {user_id}")
            
            # Check if Supabase client is properly initialized
            if supabase is None:
                return Response(
                    {"error": "Supabase client not configured"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            if role == "on-call-doctor" and user_id != "cooper-020006":
                # Get unique patient IDs first from treatments
                treatment_response = supabase.table("queueing_treatment").select(
                    "patient_id"
                ).eq("doctor_id", user_id).execute()
                
                # Handle both response object and dict
                if hasattr(treatment_response, 'data'):
                    treatment_data = treatment_response.data
                elif isinstance(treatment_response, dict) and 'data' in treatment_response:
                    treatment_data = treatment_response['data']
                else:
                    print(f"Unexpected treatment response: {treatment_response}")
                    treatment_data = []
                
                patient_ids = list(set([t['patient_id'] for t in treatment_data if 'patient_id' in t]))
                print(f"Found patient IDs for doctor {user_id}: {patient_ids}")
                
                if patient_ids:
                    # Fetch patients using patient_id (the primary key)
                    response = (
                        supabase.table("patient_patient")
                        .select("*, queueing_temporarystoragequeue(id, status, created_at, priority_level, queue_number, complaint)")
                        .in_("patient_id", patient_ids)
                        .execute()
                    )
                    
                    # Handle both response object and dict
                    if hasattr(response, 'data'):
                        patients = response.data
                    elif isinstance(response, dict) and 'data' in response:
                        patients = response['data']
                    else:
                        print(f"Unexpected patient response: {response}")
                        patients = []
                else:
                    patients = []
                    
            elif role in ["secretary", "admin"] or user_id == "cooper-020006":
                # Get all patients using patient_id as the identifier
                response = (
                    supabase.table("patient_patient")
                    .select("*, queueing_temporarystoragequeue(id, status, created_at, priority_level, queue_number, complaint)")
                    .execute()
                )
                
                # Handle both response object and dict
                if hasattr(response, 'data'):
                    patients = response.data
                elif isinstance(response, dict) and 'data' in response:
                    patients = response['data']
                else:
                    print(f"Unexpected all patients response: {response}")
                    patients = []
                
            else: 
                return Response(
                    {"error": "Unauthorized role"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Remove duplicates using patient_id (the primary key)
            unique_patients = {}
            for patient in patients:
                patient_id = patient.get('patient_id')
                if patient_id and patient_id not in unique_patients:
                    unique_patients[patient_id] = patient
            
            patients = list(unique_patients.values())
            
            # Process queue data for each patient and filter out "Waiting" status
            filtered_patients = []
            for patient in patients:
                patient_id = patient.get('patient_id', 'unknown')
                queue_list = patient.get('queueing_temporarystoragequeue') or []
                
                if queue_list:
                    # Get the latest queue entry
                    sorted_queue = sorted(
                        queue_list,
                        key=lambda q: q.get('created_at'),
                        reverse=True
                    )
                    latest_queue = sorted_queue[0]
                    patient['latest_queue'] = latest_queue
                    print(f"Latest queue for patient {patient_id}: {latest_queue}")
                    
                    # Check if the latest status is "Waiting" - if so, skip this patient
                    if latest_queue.get('status') == 'Waiting':
                        print(f"Skipping patient {patient_id} because status is 'Waiting'")
                        continue
                else:
                    patient['latest_queue'] = None
                    print(f"No queue entries for patient {patient_id}.")
                
                # If we get here, the patient doesn't have "Waiting" status, so include them
                filtered_patients.append(patient)

            serializer = PatientSerializer(filtered_patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception occurred:", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PatientUpdate(APIView):
    permission_classes = []
    
    def patch(self, request, patient_id):
        try:
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PatientSerializer(
            patient, 
            data=request.data, 
            partial=True
        )
        
        if serializer.is_valid():
            updated_patient = serializer.save()
            
            # Return only basic fields, not the computed ones
            response_data = {
                'patient_id': updated_patient.patient_id,
                'first_name': updated_patient.first_name,
                'middle_name': updated_patient.middle_name,
                'last_name': updated_patient.last_name,
                'phone_number': updated_patient.phone_number,
                'date_of_birth': updated_patient.date_of_birth,
                'street_address': updated_patient.street_address,
                'barangay': updated_patient.barangay,
                'municipal_city': updated_patient.municipal_city,
            }
            return Response(response_data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PatientFlowView(APIView):
    permission_classes = [IsMedicalStaff]

    def get(self, request):
        try:
            role = getattr(request.user, "role", None)
            user_id = request.user.id
            
            if supabase is None:
                return Response(
                    {"error": "Supabase client not configured"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            if role == "on-call-doctor" and user_id != "cooper-020006":
                # Get unique patient IDs first from treatments
                treatment_response = supabase.table("queueing_treatment").select(
                    "patient_id"
                ).eq("doctor_id", user_id).execute()
                
                if hasattr(treatment_response, 'data'):
                    treatment_data = treatment_response.data
                elif isinstance(treatment_response, dict) and 'data' in treatment_response:
                    treatment_data = treatment_response['data']
                else:
                    treatment_data = []
                
                patient_ids = list(set([t['patient_id'] for t in treatment_data if 'patient_id' in t]))
                
                if patient_ids:
                    # Fetch ALL patients including those with waiting status
                    response = (
                        supabase.table("patient_patient")
                        .select("*, queueing_temporarystoragequeue(id, status, created_at, priority_level, queue_number, complaint)")
                        .in_("patient_id", patient_ids)
                        .execute()
                    )
                    
                    if hasattr(response, 'data'):
                        patients = response.data
                    elif isinstance(response, dict) and 'data' in response:
                        patients = response['data']
                    else:
                        patients = []
                else:
                    patients = []
                    
            elif role in ["secretary", "admin"] or user_id == "cooper-020006":
                # Get ALL patients including those with waiting status
                response = (
                    supabase.table("patient_patient")
                    .select("*, queueing_temporarystoragequeue(id, status, created_at, priority_level, queue_number, complaint)")
                    .execute()
                )
                
                if hasattr(response, 'data'):
                    patients = response.data
                elif isinstance(response, dict) and 'data' in response:
                    patients = response['data']
                else:
                    patients = []
                
            else: 
                return Response(
                    {"error": "Unauthorized role"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Remove duplicates using patient_id (the primary key)
            unique_patients = {}
            for patient in patients:
                patient_id = patient.get('patient_id')
                if patient_id and patient_id not in unique_patients:
                    unique_patients[patient_id] = patient
            
            patients = list(unique_patients.values())
            
            # Process queue data for each patient (NO FILTERING - include all statuses)
            for patient in patients:
                patient_id = patient.get('patient_id', 'unknown')
                queue_list = patient.get('queueing_temporarystoragequeue') or []
                
                if queue_list:
                    # Get the latest queue entry
                    sorted_queue = sorted(
                        queue_list,
                        key=lambda q: q.get('created_at'),
                        reverse=True
                    )
                    patient['latest_queue'] = sorted_queue[0]
                else:
                    patient['latest_queue'] = None

            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception occurred:", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class PatientInfoView(APIView):
    permission_classes = [IsMedicalStaff]
    
    def get(self, request, patient_id):
        try: 
            response = supabase.table("patient_patient").select("*").eq("patient_id", patient_id).execute()
            if hasattr(response, 'error') and response.error:
                return Response({"error": response.error.message}, status=status.HTTP_400_BAD_REQUEST)

            patient_data = response.data[0] if response.data else None
            if not patient_data:
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

            if patient_data.get("date_of_birth"):
                try:
                    patient_data['date_of_birth'] = datetime.strptime(patient_data["date_of_birth"], "%Y-%m-%d").date()
                except Exception:
                    patient_data["date_of_birth"] = None
                    
            patient_age = Patient(**patient_data)
            patient_data['age'] = patient_age.get_age()
            
            # fetch latest queue data using supa
            queue_response = supabase.table("queueing_temporarystoragequeue").select(
                "id, priority_level, created_at, queue_number, complaint, status"
            ).eq("patient_id", patient_id).order("created_at", desc=True).execute()
            queue_data = queue_response.data[0] if queue_response.data else None
            
            # fetch latest assessment
            assessment_response = PreliminaryAssessment.objects.filter(
                patient__patient_id = patient_id
            ).order_by("-assessment_date").first()
            assessment_data = PreliminaryAssessmentBasicSerializer(assessment_response).data if assessment_response else None

            print(assessment_data)
            # fetch latest treatment with related diagnoses and prescriptions
            treatment_response = supabase.table("queueing_treatment").select(
                "id, treatment_notes, created_at, updated_at, patient_id, "
                "queueing_treatment_diagnoses(id, diagnosis_id, patient_diagnosis(*)), "
                "queueing_treatment_prescriptions(id, prescription_id, patient_prescription(*, medicine_medicine(id, name)))"
            ).eq("patient_id", patient_id).order("created_at", desc=True).limit(1).execute()
            
            appointment_response = supabase.table('appointment_appointment').select(
                "appointment_date, status, doctor_id, "
                "appointment_appointmentreferral(id, reason)"
            ).eq('patient_id', patient_id).order('appointment_date', desc=True).execute()
            
            lab_result_obj = LabResult.objects.filter(lab_request__patient__patient_id=patient_id).order_by('-uploaded_at').first()

            if lab_result_obj is None:
                lab_results_serialized = []   # or None, depending on what the front-end expects
            else:
                # serialize a single instance (many=False)
                lab_results_serialized = LabResultSerializer(lab_result_obj, many=False, context={'request': request}).data
            appointment_data = appointment_response.data or []
            # build doctor id list safely (only truthy doctor ids)
            doctor_ids = list({a.get("doctor_id") for a in appointment_data if a.get("doctor_id")})
            doctor_name_map = {}
            
            if doctor_ids:
                doctors_resp = supabase.table("user_doctor") \
                    .select("id, user_useraccount ( first_name, last_name )") \
                    .in_("id", doctor_ids) \
                    .execute()
                for doc in doctors_resp.data or []:
                    ua = doc.get("user_useraccount") or {}
                    doctor_name_map[doc["id"]] = f"{ua.get('first_name','')} {ua.get('last_name','')}".strip()
                            
            annotated_appts = []
            for a in appointment_data:
                # if the key exists but its value is None, a.get(...) returns None — use `or {}` to guard
                referral = a.get("appointment_appointmentreferral") or {}
                reason   = referral.get("reason", "") if isinstance(referral, dict) else ""
                annotated_appts.append({
                    # use .get to avoid KeyError if any field is missing
                    "appointment_date": a.get("appointment_date"),
                    "status": a.get("status"),
                    "doctor_id": a.get("doctor_id"),
                    "doctor_name": doctor_name_map.get(a.get("doctor_id"), ""),
                    "reason": reason,
                })       
                    
            latest_treatment = treatment_response.data[0] if treatment_response.data else None
            if latest_treatment:
                diagnoses = [
                    d["patient_diagnosis"]
                    for d in latest_treatment.get("queueing_treatment_diagnoses", [])
                    if d and isinstance(d, dict) and d.get("patient_diagnosis")
                ]
                prescriptions = [
                    p["patient_prescription"]
                    for p in latest_treatment.get("queueing_treatment_prescriptions", [])
                    if p and isinstance(p, dict) and p.get("patient_prescription")
                ]
                treatment_summary = {
                    "id": latest_treatment.get("id"),
                    "treatment_notes": latest_treatment.get("treatment_notes", ""),
                    "created_at": latest_treatment.get("created_at"),
                    "updated_at": latest_treatment.get("updated_at"),
                    "diagnoses": diagnoses,
                    "prescriptions": prescriptions,
                }
            else:
                # If no treatment found, return an empty structure
                treatment_summary = {
                    "id": None,
                    "treatment_notes": "",
                    "created_at": "",
                    "updated_at": "",
                    "diagnoses": [],
                    "prescriptions": [],
                }

            # Construct response data
            response_data = {
                "patient": {
                    **patient_data,
                    "queue_data": queue_data
                },
                "preliminary_assessment": assessment_data,
                "latest_treatment": treatment_summary,
                "latest_treatment_id": treatment_summary["id"],
                "appointments": annotated_appts, 
                "laboratories": lab_results_serialized,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            # Consider logging the full traceback to help debugging:
            # logger.exception("Error in PatientInfoView")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

         
class PreliminaryAssessmentView(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request, patient_id, queue_number):
        try:
            # Fetch patient details from Supabase
            response = supabase.table("patient_patient").select(
                "patient_id, first_name, last_name, date_of_birth, phone_number"
            ).eq("patient_id", patient_id).execute()
            patient_data = response.data[0] if response.data else None

            if not patient_data:
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

            # Retrieve the most recent preliminary assessment for this patient.
            # Remove queue_number from filtering if the model doesn't support it.
            assessment_obj = PreliminaryAssessment.objects.filter(
                patient__patient_id=patient_id
            ).last()

            if assessment_obj:
                assessment_data = PreliminaryAssessmentBasicSerializer(assessment_obj).data
            else:
                assessment_data = None

            combined_data = {
                "patient": patient_data,
                "preliminary_assessment": assessment_data,
            }
            return Response(combined_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Treatment(APIView): 
    permission_classes = [isDoctor] 

    def get(self, request): 
        try:
            # 1. Fetch all treatment records from Supabase in a single query
            treatment_response = supabase.table("queueing_treatment").select(
                "id, treatment_notes, created_at, updated_at, patient_id, "
                "patient_patient(*), "
                "queueing_treatment_diagnoses(id, treatment_id, diagnosis_id, patient_diagnosis(*)), "
                "queueing_treatment_prescriptions(id, treatment_id, prescription_id, patient_prescription(*))"
            ).execute()

            if hasattr(treatment_response, 'error') and treatment_response.error:
                return Response({"error": treatment_response.error.message},
                                status=status.HTTP_400_BAD_REQUEST)

            treatment_data = treatment_response.data
            
            # 2. Fetch all queue data in a single query
            queue_response = supabase.table("queueing_temporarystoragequeue").select(
                "id, priority_level, status, created_at, queue_number, complaint, patient_id"
            ).execute()
            
            # Create a mapping of patient_id to their latest queue data
            queue_map = {}
            for queue_item in queue_response.data:
                pid = queue_item["patient_id"]
                # Keep only the most recent queue item for each patient
                if pid not in queue_map or queue_item["created_at"] > queue_map[pid]["created_at"]:
                    queue_map[pid] = queue_item
            
            # 3. Get all patient IDs from both treatments and queues
            treatment_patient_ids = {item["patient_id"] for item in treatment_data}
            queue_patient_ids = set(queue_map.keys())
            all_patient_ids = treatment_patient_ids.union(queue_patient_ids)
            
            # 4. Fetch all patient details in a single query
            patient_response = supabase.table("patient_patient").select(
                "patient_id, first_name, middle_name, last_name"
            ).in_("patient_id", list(all_patient_ids)).execute()
            
            # Create a mapping of patient_id to patient details
            patient_map = {p["patient_id"]: p for p in patient_response.data}

            # Dictionary to group treatment records by patient_id.
            patient_treatments = {}

            # Process patients with treatments
            for item in treatment_data:
                pid = item["patient_id"]
                
                # Get queue data from our pre-fetched map
                queue_data = queue_map.get(pid)
                
                # Use the queue status if available.
                status_value = queue_data["status"] if queue_data and queue_data.get("status") else None
                if status_value and status_value.lower() == "draft":
                    status_value = "Ongoing for Treatment"
                elif not status_value:
                    status_value = "Unknown"

                # Build patient info from the treatment record or patient map
                patient_info = item.get("patient_patient", {}) or patient_map.get(pid, {})
                patient_data = {
                    **patient_info,
                    "queue_data": queue_data
                }

                # Extract diagnoses and prescriptions with proper error handling
                diagnoses = []
                prescriptions = []
                
                # Handle diagnoses
                for d in item.get("queueing_treatment_diagnoses", []):
                    if isinstance(d, dict) and "patient_diagnosis" in d and isinstance(d["patient_diagnosis"], dict):
                        diagnoses.append(d["patient_diagnosis"])
                
                # Handle prescriptions
                for p in item.get("queueing_treatment_prescriptions", []):
                    if isinstance(p, dict) and "patient_prescription" in p and isinstance(p["patient_prescription"], dict):
                        prescriptions.append(p["patient_prescription"])

                # Build a treatment summary.
                treatment_summary = {
                    "id": item["id"],
                    "treatment_notes": item["treatment_notes"],
                    "created_at": item["created_at"],
                    "updated_at": item["updated_at"],
                    "diagnoses": diagnoses,
                    "prescriptions": prescriptions,
                    "status": status_value,
                }

                # If patient doesn't exist in our dictionary yet, add them.
                if pid not in patient_treatments:
                    patient_treatments[pid] = {
                        "patient": patient_data,
                        "latest_treatment": treatment_summary,
                        "latest_treatment_id": treatment_summary["id"]
                    }
                else:
                    current_latest = patient_treatments[pid]["latest_treatment"]
                    if item["created_at"] > current_latest["created_at"]:
                        patient_treatments[pid]["latest_treatment"] = treatment_summary
                        patient_treatments[pid]["latest_treatment_id"] = treatment_summary["id"]

            # 5. Add patients who have no treatment record but have queue data
            for pid in (queue_patient_ids - treatment_patient_ids):
                if pid in queue_map:
                    q_item = queue_map[pid]
                    
                    # Get patient info from our pre-fetched map
                    patient_info = patient_map.get(pid, {"patient_id": pid, "first_name": "", "middle_name": "", "last_name": ""})
                    
                    patient_data = {
                        "patient_id": pid,
                        "first_name": patient_info.get("first_name", ""),
                        "middle_name": patient_info.get("middle_name", ""),
                        "last_name": patient_info.get("last_name", ""),
                        "queue_data": q_item
                    }
                    
                    default_treatment_summary = {
                        "id": None,
                        "treatment_notes": "",
                        "created_at": "",
                        "updated_at": "",
                        "diagnoses": [],
                        "prescriptions": [],
                        "status": "Ongoing for Treatment"
                    }

                    patient_treatments[pid] = {
                        "patient": patient_data,
                        "latest_treatment": default_treatment_summary,
                        "latest_treatment_id": None
                    }

            # 6. Convert our dictionary into a list and return it.
            transformed = list(patient_treatments.values())
            return Response(transformed, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PatientTreatmentListView(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request):
        try:
            # Fetch all treatment records from Supabase
            response = supabase.table("queueing_treatment").select(
                "id, treatment_notes, created_at, updated_at, patient_id, "
                "patient_patient(*), "
                "queueing_treatment_diagnoses(id, treatment_id, diagnosis_id, patient_diagnosis(*)), "
                "queueing_treatment_prescriptions(id, treatment_id, prescription_id, patient_prescription(*))"
            ).execute()

            if hasattr(response, 'error') and response.error:
                return Response({"error": response.error.message}, status=status.HTTP_400_BAD_REQUEST)

            treatments_data = response.data  # All treatment records

            # Group treatments by patient_id
            grouped = {}
            for item in treatments_data:
                pid = item["patient_id"]

                # Fetch the latest queue data for this patient from the temporary storage queue
                queue_response = supabase.table("queueing_temporarystoragequeue").select(
                    "id, priority_level, status, created_at, queue_number, complaint"
                ).eq("patient_id", pid).order("created_at", desc=True).execute()
                queue_data = queue_response.data[0] if queue_response.data else None

                # Get patient info from the nested patient_patient object and add queue_data
                patient_info = item.get("patient_patient", {})
                patient_info["queue_data"] = queue_data

                # Group treatments by patient
                if pid not in grouped:
                    grouped[pid] = {
                        "patient": patient_info,
                        "treatments": []
                    }
                grouped[pid]["treatments"].append(item)

            # For each patient group, sort treatments by created_at descending,
            # designate the first one as latest and the remainder as old treatments.
            results = []
            for pid, group in grouped.items():
                treatments = group["treatments"]
                treatments.sort(key=lambda x: x["created_at"], reverse=True)
                latest_treatment = treatments[0]
                old_treatments = treatments[1:] if len(treatments) > 1 else []
                results.append({
                    "patient": group["patient"],
                    "latest_treatment": latest_treatment,
                    "old_treatments": old_treatments,
                    "latest_treatment_id": latest_treatment["id"]
                })

            return Response(results, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TreatmentDetailView(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request, *args, **kwargs):
        patient_id = kwargs.get('patient_id')
        
        try:
            # 1. Fetch base patient information
            patient_response = supabase.table("patient_patient").select("*").eq("patient_id", patient_id).execute()
            if not patient_response.data:
                return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)
            patient_data = patient_response.data[0]

            # 2. Fetch latest queue information
            queue_response = supabase.table("queueing_temporarystoragequeue").select(
                "id, priority_level, status, created_at, queue_number"
            ).eq("patient_id", patient_id).order("created_at", desc=True).execute()
            queue_data = queue_response.data[0] if queue_response.data else None

            # 3. Fetch treatments with related data
            treatment_response = supabase.table("queueing_treatment").select(
                """
                id, 
                treatment_notes, 
                created_at, 
                updated_at, 
                patient_id, 
                doctor_id(
                    id,
                    first_name,
                    last_name,
                    user_doctor(specialization)
                ),
                queueing_treatment_diagnoses(
                    id, 
                    treatment_id, 
                    diagnosis_id, 
                    patient_diagnosis(*)
                ), 
                queueing_treatment_prescriptions(
                    id, 
                    treatment_id, 
                    prescription_id, 
                    patient_prescription(*, medicine_medicine(id, name))
                )
                """
            ).eq("patient_id", patient_id).order("created_at", desc=True).execute()
            treatments = treatment_response.data

            # 4. Structure response data
            response_data = {
                "patient": {
                    **patient_data,
                    "queue_data": queue_data
                },
                "recent_treatment": None,
                "previous_treatments": []
            }

            if treatments:
                # Process treatments data
                transformed_treatments = []
                for item in treatments:
                    # 1. Safe doctor layer
                    raw_doc     = item.get("doctor_id") or {}
                    raw_profile = raw_doc.get("user_doctor") or {}

                    doctor_info = {
                        "id":             raw_doc.get("id"),
                        "name":           " ".join(filter(None, [raw_doc.get("first_name"), raw_doc.get("last_name")])),
                        "specialization": raw_profile.get("specialization")
                    }

                    # 2. Safe diagnoses
                    diagnoses = [
                        d["patient_diagnosis"]
                        for d in item.get("queueing_treatment_diagnoses", [])
                        if d.get("patient_diagnosis")
                    ]

                    # 3. Safe prescriptions
                    prescriptions = []
                    for p in item.get("queueing_treatment_prescriptions", []):
                        presc = p.get("patient_prescription")
                        if not presc:
                            continue
                        med = presc.pop("medicine_medicine", None)
                        prescriptions.append({ **presc, "medication": med })

                    transformed_treatments.append({
                        "id":             item.get("id"),
                        "treatment_notes":item.get("treatment_notes"),
                        "created_at":     item.get("created_at"),
                        "updated_at":     item.get("updated_at"),
                        "doctor_info":    doctor_info,
                        "diagnoses":      diagnoses,
                        "prescriptions":  prescriptions
                    })


                # Separate recent and previous treatments
                response_data["recent_treatment"] = transformed_treatments[0]
                response_data["previous_treatments"] = transformed_treatments[1:]

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PatientRegister(APIView):
    permission_classes = []

    def post(self, request):
        print("📥 Received Data:", request.data)

        def determine_priority(patient_id):
            queue_entries = TemporaryStorageQueue.objects.filter(
                patient=patient_id
            ).order_by("created_at")
            if queue_entries.exists():
                queue_entry = queue_entries.first()
                return queue_entry.priority_level
            return "Regular"

        # generate queue number with daily reset + max 50 reset
        def generate_queue_number():
            today = now().date()
            last_queue_number = TemporaryStorageQueue.objects.filter(
                created_at__date=today
            ).aggregate(Max('queue_number'))['queue_number__max']

            if last_queue_number is None:
                return 1
            elif last_queue_number >= 50:
                return 1
            else:
                return last_queue_number + 1

        # Process complaint
        raw_complaint = request.data.get("complaint", "")
        
        if raw_complaint == "Other":
            raw_complaint = request.data.get("other_complaint", "").strip()
        
        queue_number = generate_queue_number()
        print("Assigned Queue Number:", queue_number)     
        
        # Handle existing patient
        if request.data.get('patient_id'):
            try:
                patient = Patient.objects.get(patient_id=request.data['patient_id'])
                priority_level = determine_priority(patient.patient_id)
                
                # Create queue entry for existing patient
                queue_entry = TemporaryStorageQueue.objects.create(
                    patient=patient,
                    priority_level=priority_level,
                    queue_number=queue_number,
                    complaint=raw_complaint,
                    status='Waiting'
                )
                
                return Response({
                    "message": "Patient added to queue successfully.",
                    "queue_entry": {
                        "id": queue_entry.id,
                        "patient_id": patient.patient_id,
                        "patient_name": f"{patient.first_name} {patient.last_name}",
                        "priority_level": queue_entry.priority_level,
                        "status": queue_entry.status,
                        "queue_number": queue_entry.queue_number,
                        "complaint": queue_entry.complaint
                    }
                }, status=status.HTTP_201_CREATED)

            except Patient.DoesNotExist:
                return Response(
                    {"error": "Patient not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            except Exception as e:
                print(f"❌ Error processing existing patient: {str(e)}")
                return Response(
                    {"error": f"Error processing patient: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        # Handle new patient registration (unchanged)
        else:
            serializer = PatientRegistrationSerializer(data=request.data, context={"request": request})
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            validated_data = serializer.validated_data
            if UserAccount.objects.filter(email=validated_data['email']).exists():
                return Response({"error": "Email already registered."}, status=400)

            priority_level = request.data.get("priority_level", "Regular")
            
            queue_entry = TemporaryStorageQueue.objects.create(
                temp_first_name=validated_data.get('first_name', ''),
                temp_middle_name=validated_data.get('middle_name', ''),
                temp_last_name=validated_data['last_name'],
                temp_email=validated_data['email'],
                temp_phone_number=validated_data['phone_number'],
                temp_date_of_birth=validated_data['date_of_birth'],
                temp_gender=validated_data.get('gender', ''),
                temp_street_address=validated_data.get('street_address', ''),
                temp_barangay=validated_data.get('barangay', ''),
                temp_municipal_city=validated_data.get('municipal_city', ''),
            
                priority_level=priority_level,
                queue_number=queue_number,
                complaint=raw_complaint,
                status='Waiting',
                is_new_patient=True            
            )
            return Response({
                "message": "Patient registration pending acceptance.",
                "queue_entry": {
                    "id": queue_entry.id,
                    "temp_patient_name": f"{validated_data.get('first_name', '')} {validated_data['last_name']}",
                    "priority_level": queue_entry.priority_level,
                    "status": queue_entry.status,
                    "queue_number": queue_entry.queue_number,
                    "complaint": queue_entry.complaint,
                    "is_new_patient": True
                }
            }, status=status.HTTP_201_CREATED)


class SearchPatient(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request, format=None):
        query = request.GET.get('q', '')
        
        # Prefetch the related TemporaryStorageQueue objects ordered by created_at (descending)
        queue_prefetch = Prefetch(
            'temporarystoragequeue',
            queryset=TemporaryStorageQueue.objects.order_by('-created_at')
        )
        
        months = {
            'january': 1, 'february': 2, "march": 3, "april": 4, "may": 5, "june": 6,
            "july": 7, "august": 8, "september": 9, "october": 10, "november": 11, "december": 12
        }
        month_number = months.get(query, None)
        
        if query:
            patients = Patient.objects.filter(
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(email__icontains=query) |
                Q(phone_number__icontains=query) |
                (Q(date_of_birth__isnull=False) & Q(date_of_birth__month=month_number) if month_number else Q()) |
                Q(temporarystoragequeue__complaint__icontains=query)
            ).distinct().prefetch_related(queue_prefetch)
        else:
            patients = Patient.objects.all().prefetch_related(queue_prefetch)
        
        data = []
        for patient in patients:
            # This returns the most recent queue entry because of our ordering
            latest_queue = patient.temporarystoragequeue.first()
            data.append({
                'patient_id': patient.patient_id,
                'first_name': patient.first_name,
                'middle_name': patient.middle_name,
                'last_name': patient.last_name,
                'email': patient.email,
                'phone_number': patient.phone_number,
                'date_of_birth': patient.date_of_birth.strftime('%Y-%m-%d'),
                'street_address': patient.street_address,
                'barangay': patient.barangay,
                'municipal_city': patient.municipal_city,
                'complaint': latest_queue.complaint if latest_queue else None,
                'age': patient.get_age(),
            })

        return Response({'patients': data}, status=status.HTTP_200_OK)

class GetQueue(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request, format=None):
        patient_id = request.GET.get('patient_id')
        if not patient_id:
            return Response({'error': 'patient_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            queue = TemporaryStorageQueue.objects.filter(
                patient__patient_id=patient_id
            ).order_by('-created_at').first()

            data = {
                'complaint': queue.complaint or "General Illness",
            }
            return Response(data, status=status.HTTP_200_OK)
        except TemporaryStorageQueue.DoesNotExist:
            return Response({'complaint': "General Illness"}, status=status.HTTP_200_OK)
class AcceptButton(APIView):
    permission_classes = [IsMedicalStaff]
    
    def post(self, request):
        try:
            print("🔍 Raw request data:", request.data)
            
            action = request.data.get('action')
            queue_entry_id = request.data.get("queue_entry_id")
            
            if not queue_entry_id:
                print("❌ Missing queue_entry_id entirely")
                return Response({"error": "Missing queue_entry_id in request."}, status=status.HTTP_400_BAD_REQUEST)
            
            if queue_entry_id == "null" or queue_entry_id == "undefined":
                print("❌ queue_entry_id is string 'null' or 'undefined':", queue_entry_id)
                return Response({"error": "Invalid queue_entry_id format."}, status=status.HTTP_400_BAD_REQUEST)
            
            print("✅ Action:", action)
            print("✅ Queue Entry ID: " + str(queue_entry_id) + " Type: " + str(type(queue_entry_id)))

            # Try to convert to integer
            try:
                queue_entry_id_int = int(queue_entry_id)
            except (ValueError, TypeError):
                print("❌ Cannot convert queue_entry_id to integer:", queue_entry_id)
                return Response({"error": "Invalid queue_entry_id format."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Retrieve the queue entry
            queue_entry = TemporaryStorageQueue.objects.get(id=queue_entry_id_int)
            print("✅ Found queue entry:", queue_entry.id)
            
            # If this is a new patient, create the Patient record first
            if queue_entry.is_new_patient:
                print("🆕 Creating new patient record...")
                from django.db.models.signals import pre_save
                pre_save.disconnect(create_user_id, sender=UserAccount)
                
                try:
                    raw_dob = queue_entry.temp_date_of_birth
                    
                    # Generate a user ID manually since we disconnected the signal
                    from django.utils.text import slugify
                    import uuid
                    import time
                    
                    last_name_slug = slugify(queue_entry.temp_last_name) or "patient"
                    timestamp = str(int(time.time()))[-6:]
                    unique_id = uuid.uuid4().hex[:4]
                    user_id = f"{last_name_slug}-02000{unique_id}"
                    
                    # Create UserAccount with the manually generated ID
                    user = UserAccount.objects.create_user(
                        id=user_id,  # Set the ID explicitly
                        email=queue_entry.temp_email,
                        password='temp-password',
                        first_name=queue_entry.temp_first_name,
                        last_name=queue_entry.temp_last_name,
                        role='patient'               
                    )
                    
                    # Create Patient record
                    patient = Patient.objects.create(
                        first_name=queue_entry.temp_first_name,
                        middle_name=queue_entry.temp_middle_name,
                        last_name=queue_entry.temp_last_name,
                        email=queue_entry.temp_email,
                        phone_number=queue_entry.temp_phone_number,
                        date_of_birth=queue_entry.temp_date_of_birth,
                        gender=queue_entry.temp_gender,
                        street_address=queue_entry.temp_street_address,
                        barangay=queue_entry.temp_barangay,
                        municipal_city=queue_entry.temp_municipal_city,
                        user=user               
                    )
                    
                    # The patient_id should now be set automatically in the save method
                    # But let's verify and refresh if needed
                    if not patient.patient_id:
                        patient.refresh_from_db()
                    
                    # Set proper password using the actual patient_id
                    password = f"{patient.patient_id}{raw_dob.strftime('%Y%m%d')}"
                    user.set_password(password)
                    user.save()
                    
                    # Link the queue entry to the newly created patient
                    queue_entry.patient = patient
                    queue_entry.is_new_patient = False  # Mark as processed
                    queue_entry.save()
                    print("✅ New patient created: patient_id =", patient.patient_id)            
                finally:
                    pre_save.connect(create_user_id, sender=UserAccount)
                    
            # Update status based on action
            if action == 'preliminary':
                queue_entry.status = "Queued for Assessment"
            elif action == 'treatment':
                queue_entry.status = "Queued for Treatment"
            elif action == 'lab':
                queue_entry.status = "Ongoing for Laboratory"
            else:
                return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
            
            queue_entry.save()
            print("✅ Queue entry status updated to:", queue_entry.status)

            # Broadcast updated snapshot
            print("🔄 Computing queue snapshot...")
            snapshot = compute_queue_snapshot()
            print("📊 Queue snapshot computed:", snapshot)
            
            channel_layer = get_channel_layer()
            print("📡 Broadcasting WebSocket update to 'registration_queue' group...")
            
            async_to_sync(channel_layer.group_send)(
                "registration_queue",
                {
                    "type": "queue_update",
                    "data": snapshot,
                }
            )
            
            print("✅ WebSocket broadcast completed")

            return Response({
                "message": "Status updated successfully",
                "status": queue_entry.status,
                "patient_created": queue_entry.is_new_patient
            }, status=status.HTTP_200_OK)

        except TemporaryStorageQueue.DoesNotExist:
            print("❌ Queue entry not found with ID:", queue_entry_id)
            return Response({"error": "Queue entry not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("❌ Error in POST Accept:", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class SaveButton(APIView):
    permission_classes = [isDoctor]
    def post(self, request, *args, **kwargs):
        try:
            print("📥 Received Data:", request.data)
            patient_id = request.data.get("patient_id")
            print("🔍 Looking for Patient ID:", patient_id)

            # Retrieve the latest queue entry for the given patient
            queue_entry = TemporaryStorageQueue.objects.filter(
                patient__patient_id=patient_id
            ).order_by('-created_at').first()

            if not queue_entry:
                print("❌ Queue entry not found!")
                return Response(
                    {"error": "Queue entry not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

            print("Found queue entry:", queue_entry)
            # Update the status to "Ongoing Treatment"
            queue_entry.status = "Ongoing for Treatment"
            queue_entry.save()

            return Response({"message": "Status updated successfully", "status": queue_entry.status}, status=status.HTTP_200_OK)

        except Exception as e:
            print("❌ Error:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
# Lab results
class LabRequestCreateView(generics.CreateAPIView):
    queryset = LabRequest.objects.all()
    serializer_class = LabRequestSerializer
    permission_classes = [IsDoctorOrOnCallDoctor]
    
    def perform_create(self, serializer):
        serializer.save()
        

def _sanitize_object_path(raw_path: str, bucket_name: str) -> str:
    """
    Make a safe object path for storage that does NOT include the bucket name.
    Removes leading slashes and any repeated patterns like 'lab_results/' or 'lab/'.
    """
    if not raw_path:
        return ""

    p = raw_path.strip()
    # remove leading slashes
    while p.startswith("/"):
        p = p[1:]

    # Remove ANY occurrence of bucket-like names, not just at start
    patterns_to_remove = [f"{bucket_name}/", "lab_results/", "lab/"]
    for pattern in patterns_to_remove:
        if p.startswith(pattern):
            p = p[len(pattern):]

    # Also split and filter to be thorough
    segments = p.split("/")
    filtered_segments = []
    for segment in segments:
        if segment and segment.lower() not in {bucket_name.lower(), "lab_results", "lab"}:
            filtered_segments.append(segment)
    
    sanitized = "/".join(filtered_segments)
    # final guard: no double slashes
    sanitized = sanitized.replace("//", "/")
    return sanitized


class LabResultCreateView(generics.CreateAPIView):
    """
    Create a LabResult and upload the provided image to Supabase storage.
    Stores the storage object path in the model and attaches an accessible URL if possible.
    """
    queryset = LabResult.objects.all()
    serializer_class = LabResultSerializer
    permission_classes = [isSecretary]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        file_obj = self.request.FILES.get("image")
        if not file_obj:
            raise APIException("No image file provided")

        if supabase is None:
            logger.error("Supabase service client is not configured.")
            raise APIException("Server storage misconfiguration")

        ext = os.path.splitext(file_obj.name)[1] or ""
        unique_name = f"{uuid4().hex}{ext}"
        bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "lab_results")
        patient_segment = str(self.request.data.get("patient_id", "lab_result")).strip() or "lab_result"

        # Build a raw candidate path then sanitize it (ensures no duplicate bucket segments)
        candidate = f"{patient_segment}/{unique_name}"
        object_path = _sanitize_object_path(candidate, bucket)

        # Read bytes if possible (some SDKs want bytes, some file-like)
        file_bytes = None
        try:
            file_bytes = file_obj.read()
        except Exception:
            file_bytes = None

        # reset pointer to start for file-like uploads
        try:
            file_obj.seek(0)
        except Exception:
            pass

        try:
            storage_attr = getattr(supabase, "storage", None)
            if storage_attr is None:
                logger.error("supabase.storage attribute not found.")
                raise APIException("Storage client unavailable")

            storage = storage_attr() if callable(storage_attr) else storage_attr

            upload_result = None
            bucket_client = None

            # Preferred pattern: storage.from_(bucket).upload(path, data, options)
            if hasattr(storage, "from_"):
                bucket_client = storage.from_(bucket)
                if hasattr(bucket_client, "upload"):
                    try:
                        # When file_bytes is None, pass file_obj (some SDKs accept file-like)
                        data_to_send = file_bytes if file_bytes is not None else file_obj
                        upload_result = bucket_client.upload(object_path, data_to_send, {"content-type": getattr(file_obj, "content_type", None)})
                    except TypeError:
                        # fallback without metadata dict
                        data_to_send = file_bytes if file_bytes is not None else file_obj
                        upload_result = bucket_client.upload(object_path, data_to_send)
                elif hasattr(bucket_client, "put_object"):
                    data_to_send = file_bytes if file_bytes is not None else file_obj
                    upload_result = bucket_client.put_object(object_path, data_to_send)
            elif hasattr(storage, "upload"):
                try:
                    upload_result = storage.upload(bucket, object_path, file_bytes, {"content-type": getattr(file_obj, "content_type", None)})
                except TypeError:
                    upload_result = storage.upload(bucket, object_path, file_bytes)
            elif hasattr(storage, "put_object"):
                upload_result = storage.put_object(bucket, object_path, file_bytes)
            elif hasattr(storage, "upload_fileobj"):
                try:
                    upload_result = storage.upload_fileobj(bucket, object_path, file_obj)
                except TypeError:
                    upload_result = storage.upload_fileobj(file_obj, bucket, object_path)
            else:
                logger.error("No known upload method found on storage client. Methods: %s", dir(storage))
                raise APIException("Unsupported storage client")

            # Handle common error shapes
            if upload_result is None:
                logger.debug("upload_result is None (many SDKs return None on success).")
            elif isinstance(upload_result, dict) and upload_result.get("error"):
                raise APIException(f"Storage upload failed: {upload_result.get('error')}")
            elif hasattr(upload_result, "error") and getattr(upload_result, "error"):
                raise APIException(f"Storage upload failed: {getattr(upload_result, 'error')}")

            # Attempt to get a signed URL (preferred for private buckets)
            signed_url = None
            try:
                signer = bucket_client if bucket_client is not None else storage
                if hasattr(signer, "create_signed_url"):
                    signed = signer.create_signed_url(object_path, 60 * 60)
                    if isinstance(signed, dict):
                        signed_url = signed.get("signedURL") or signed.get("signed_url") or signed.get("signedUrl")
                    elif isinstance(signed, str):
                        signed_url = signed
            except Exception as exc:
                logger.warning("create_signed_url failed: %s", exc)

            # Fallback to public URL
            public_url = None
            if not signed_url:
                try:
                    pub_target = bucket_client if bucket_client is not None else storage
                    if hasattr(pub_target, "get_public_url"):
                        pub = pub_target.get_public_url(object_path)
                        if isinstance(pub, dict):
                            public_url = pub.get("publicURL") or pub.get("public_url") or pub.get("publicUrl")
                        elif isinstance(pub, str):
                            public_url = pub
                    elif hasattr(storage, "get_public_url"):
                        pub = storage.get_public_url(bucket, object_path)
                        if isinstance(pub, dict):
                            public_url = pub.get("publicURL") or pub.get("public_url") or pub.get("publicUrl")
                        elif isinstance(pub, str):
                            public_url = pub
                    else:
                        supabase_url = os.getenv("SUPABASE_URL") or getattr(settings, "SUPABASE_URL", None)
                        if supabase_url:
                            # Clean the object_path before building the URL
                            clean_object_path = _sanitize_object_path(object_path, bucket)
                            public_url = f"{supabase_url.rstrip('/')}/storage/v1/object/public/{bucket}/{clean_object_path}"
                except Exception as exc:
                    logger.warning("get_public_url failed: %s", exc)

            final_url = signed_url or public_url or ""

            # Persist model using object_path (so stored path matches URL construction)
            save_kwargs = {"submitted_by": self.request.user, "image": object_path}
            # if your model has an original filename field, save it
            if hasattr(LabResult, "original_filename"):
                save_kwargs["original_filename"] = file_obj.name

            lab_result = serializer.save(**save_kwargs)

            # Attach URL / metadata fields if present on model
            try:
                if hasattr(lab_result, "image_url"):
                    lab_result.image_url = final_url
                if hasattr(lab_result, "file_path"):
                    lab_result.file_path = object_path
                if hasattr(lab_result, "storage_bucket"):
                    lab_result.storage_bucket = bucket
                lab_result.save()
            except Exception as db_exc:
                logger.exception("Failed to save LabResult after upload; attempting cleanup: %s", db_exc)
                # attempt to remove uploaded object
                try:
                    if bucket_client is not None and hasattr(bucket_client, "remove"):
                        bucket_client.remove([object_path])
                    elif hasattr(storage, "remove"):
                        storage.remove([object_path])
                    elif hasattr(storage, "delete"):
                        storage.delete(bucket, object_path)
                except Exception as cleanup_exc:
                    logger.exception("Failed to remove uploaded object during cleanup: %s", cleanup_exc)
                raise APIException("Failed to persist lab result after upload")

            # Mark related lab_request completed if present
            try:
                if getattr(lab_result, "lab_request", None):
                    lab_req = lab_result.lab_request
                    lab_req.status = "Completed"
                    lab_req.save()
            except Exception as lr_exc:
                logger.exception("Failed updating related lab_request: %s", lr_exc)

            return lab_result

        except APIException:
            raise
        except Exception as exc:
            logger.exception("Unhandled exception in LabResult upload: %s", exc)
            raise APIException("Upload failed — see server logs")


class LabResultListView(generics.ListAPIView):
    """
    List LabResults for a patient (by patient_id URL kwarg).
    Produces consistent image_url values.
    """
    serializer_class = LabResultSerializer
    permission_classes = [IsParticipant]

    def get_queryset(self):
        patient_id = self.kwargs.get('patient_id')
        queryset = LabResult.objects.filter(
            lab_request__patient__patient_id=patient_id
        ).select_related('lab_request').order_by('-uploaded_at')

        if not queryset.exists():
            raise Http404("No Lab Results found for the given patient.")
        return queryset
    def _construct_public_url(self, bucket: str, object_path: str) -> str:
        supabase_url = os.getenv("SUPABASE_URL") or getattr(settings, "SUPABASE_URL", None)
        if supabase_url:
            print(f"DEBUG: bucket={bucket}, object_path={object_path}")  # Add this line to see what's happening
            
            # More aggressive cleaning
            segments = object_path.split("/")
            filtered_segments = []
            for segment in segments:
                if segment and segment.lower() not in {bucket.lower(), "lab_results", "lab"}:
                    filtered_segments.append(segment)
            
            clean_object_path = "/".join(filtered_segments)
            print(f"DEBUG: clean_object_path={clean_object_path}")  # Add this line
            
            result = f"{supabase_url.rstrip('/')}/storage/v1/object/public/{bucket}/{clean_object_path}"
            print(f"DEBUG: final_url={result}")  # Add this line
            return result
        return ""
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        formatted_results = []
        bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "lab_results")
        supabase_url = os.getenv("SUPABASE_URL") or getattr(settings, "SUPABASE_URL", None)

        for item in serializer.data:
            lab_result_id = item.get("id")
            try:
                lab_result = LabResult.objects.get(id=lab_result_id)
                image_path = lab_result.image.name
            except LabResult.DoesNotExist:
                image_path = item.get("image", "").split("/media/")[-1]  # Fallback
            
            # derive filename from either original filename field, file_name, or object_path
            file_name = item.get("original_filename") or item.get("file_name") or (image_path or "").split("/")[-1]

            # Always build the Supabase URL
            final_url = ""
            if image_path and supabase_url:
                final_url = f"{supabase_url.rstrip('/')}/storage/v1/object/public/{bucket}/{image_path}"

            formatted_results.append({
                "id": item.get("id"),
                "date": item.get("uploaded_at"),
                "status": "Completed",
                "image_url": final_url,
                "file_name": file_name,
                "notes": item.get("notes", "") if isinstance(item.get("notes", ""), str) else "",
                "request_date": item.get("uploaded_at"),
                "lab_request_id": item.get("lab_request")
            })

        return Response({
            "lab_results": formatted_results,
            "total_count": len(formatted_results)
        }, status=status.HTTP_200_OK)
        
class LabRequestListView(generics.ListAPIView):
    queryset = LabRequest.objects.all()
    serializer_class = LabRequestSerializer
    permission_classes = [IsMedicalStaff]
    
    def get_queryset(self):
        patient_id = self.request.query_params.get('patient_id')
        qs = LabRequest.objects.filter(status="Pending")
        if patient_id:
            qs = qs.filter(patient__patient_id=patient_id)
        return qs
    
class LabRequestDetailView(generics.RetrieveAPIView):
    queryset = LabRequest.objects.all()
    serializer_class = LabRequestSerializer
    permission_classes = [IsMedicalStaff]




## download
def download_lab_result(request, result_id):
    lab_result = get_object_or_404(LabResult, id=result_id)
    
    # Ensure there is an associated image
    if not lab_result.image:
        raise Http404("No file associated with this laboratory result.")
    
    # Open the image file and prepare the FileResponse
    response = FileResponse(lab_result.image.open(), as_attachment=True)
    # Extract the filename from the image path (optional: modify as needed)
    filename = lab_result.image.name.split('/')[-1]
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    
    return response
    
    
class PatientReportview(APIView):
    permission_classes = [IsMedicalStaff]

    def get(self, request, patient_id):
        try:
            # Fetch patient
            response = supabase.table("patient_patient").select("*").eq("patient_id", patient_id).execute()
            if hasattr(response, 'error') and response.error:
                error_msg = getattr(response.error, 'message', 'Unknown error')
                return Response({"error": error_msg}, status=status.HTTP_400_BAD_REQUEST)
            patient_info = response.data[0] if response.data else None

            # Fetch latest preliminary assessment
            assessment_obj = PreliminaryAssessment.objects.filter(
                patient__patient_id=patient_id
            ).order_by("-assessment_date").first()
            assessment_data = PreliminaryAssessmentBasicSerializer(assessment_obj).data if assessment_obj else None

            # Fetch all complaints
            complaint_resp = supabase.table("queueing_temporarystoragequeue") \
                .select("complaint") \
                .eq("patient_id", patient_id) \
                .order("created_at", desc=True) \
                .execute()
            complaints = [r.get("complaint") for r in (complaint_resp.data or [])] if not getattr(complaint_resp, 'error', False) else []

            # Fetch treatments
            treatment_response = supabase.table("queueing_treatment").select(
                """
                id, 
                treatment_notes, 
                created_at, 
                updated_at, 
                patient_id,             
                doctor_id(
                    id,
                    first_name,
                    last_name,
                    user_doctor(specialization)
                ),
                queueing_treatment_diagnoses(
                    id,
                    treatment_id,
                    diagnosis_id,
                    patient_diagnosis(*)
                ),
                queueing_treatment_prescriptions(
                    id,
                    treatment_id,
                    prescription_id,
                    patient_prescription(*, medicine_medicine(id, name))
                )
            """
            ).eq("patient_id", patient_id).order("created_at", desc=True).execute()
            treatments = treatment_response.data or []

            # Fetch laboratory results
            lab_results_qs = LabResult.objects.filter(lab_request__patient__patient_id=patient_id)
            lab_results_serialized = LabResultSerializer(lab_results_qs, many=True, context={'request': request}).data if lab_results_qs.exists() else []

            all_diagnoses = []
            all_prescriptions = []
            all_treatment_notes = []

            patient_report = {
                "patient": patient_info,
                "preliminary_assessment": assessment_data,
                "recent_treatment": None,
                "all_treatment_notes": [],
                "all_prescriptions": [],
                "all_diagnoses": [],
                "laboratories": lab_results_serialized,
                "complaint": complaints
            }

            if treatments:
                transformed_treatments = []

                for item in treatments:
                    # Doctor info
                    raw_doc = item.get("doctor_id") or {}
                    raw_profile = raw_doc.get("user_doctor") or {}
                    doctor_info = {
                        "id": raw_doc.get("id"),
                        "name": " ".join(filter(None, [raw_doc.get("first_name"), raw_doc.get("last_name")])),
                        "specialization": raw_profile.get("specialization")
                    }

                    # Diagnoses
                    diagnoses = [
                        d["patient_diagnosis"]
                        for d in item.get("queueing_treatment_diagnoses", [])
                        if d.get("patient_diagnosis")
                    ]
                    all_diagnoses.extend(diagnoses)

                    # Prescriptions
                    prescriptions = []
                    for p in item.get("queueing_treatment_prescriptions", []):
                        presc = p.get("patient_prescription")
                        if presc:
                            med = presc.pop("medicine_medicine", None)
                            prescriptions.append({**presc, "medication": med})
                    all_prescriptions.extend(prescriptions)

                    # Treatment notes
                    note = item.get("treatment_notes")
                    if note:
                        all_treatment_notes.append(note)

                    # Transform each treatment
                    transformed_treatments.append({
                        "id": item.get("id"),
                        "treatment_notes": item.get("treatment_notes"),
                        "created_at": item.get("created_at"),
                        "updated_at": item.get("updated_at"),
                        "doctor_info": doctor_info,
                        "diagnoses": diagnoses,
                        "prescriptions": prescriptions
                    })

                # Deduplicate diagnoses by 'id'
                unique_diagnoses = {d['id']: d for d in all_diagnoses}.values()
                # Deduplicate treatment notes
                unique_treatment_notes = list(dict.fromkeys(all_treatment_notes))

                patient_report.update({
                    "recent_treatment": transformed_treatments[0],
                    "all_treatment_notes": unique_treatment_notes,
                    "all_prescriptions": all_prescriptions,
                    "all_diagnoses": list(unique_diagnoses)
                })

            return Response(patient_report, status=status.HTTP_200_OK)

        except Exception as e:
            print("Exception ", e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MonthlyVisitsAPIView(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request):
        start_raw = request.query_params.get("start")
        end_raw = request.query_params.get("end")

        start_date = parse_date(str(start_raw)) if start_raw else None
        end_date = parse_date(str(end_raw)) if end_raw else None


        queryset = TemporaryStorageQueue.objects.all()

        if start_date and end_date:
            queryset = queryset.filter(created_at__date__range=(start_date, end_date))
        elif start_date:
            queryset = queryset.filter(created_at__date__gte=start_date)
        elif end_date:
            queryset = queryset.filter(created_at__date__lte=end_date)

        # Annotate with truncated month (creates a temporary alias, not a model field)
        monthly_data = (
            queryset
            .annotate(report_month=TruncMonth('created_at'))
            .values('report_month')
            .annotate(count=Count('id'))
            .order_by('report_month')
        )

        result = [
            {
                "month": entry["report_month"].strftime("%b %Y"),
                "count": entry["count"]
            }
            for entry in monthly_data if entry["report_month"]
        ]

        return Response(result)

class MonthlyPatientVisitsDetailedView(APIView):
    def get(self, request):
        # Optimize query with select_related to prevent N+1 queries
        visits = TemporaryStorageQueue.objects.select_related('patient').all().order_by("queue_date")
        
        # Get all patient IDs to fetch treatments in bulk
        patient_ids = [visit.patient.patient_id for visit in visits if visit.patient]
        
        # Fetch treatments in bulk from Supabase
        treatment_map = {}
        if patient_ids:
            treatment_response = supabase.table("queueing_treatment").select(
                "id, created_at, patient_id"
            ).in_("patient_id", patient_ids).execute()
            
            # Create a mapping of patient_id to latest treatment
            for treatment in treatment_response.data:
                patient_id = treatment['patient_id']
                if patient_id not in treatment_map or treatment['created_at'] > treatment_map[patient_id]['created_at']:
                    treatment_map[patient_id] = treatment
        
        serializer = PatientVisitSerializer(visits, many=True, context={'treatment_map': treatment_map})

        grouped_visits = defaultdict(list)
        for visit in serializer.data:
            visit_date = visit.get("visit_date")
            if visit_date:
                month = visit_date[:7]
                grouped_visits[month].append(visit)
                
        return Response(dict(grouped_visits))

    
class MonthlyLabResultAPIView(APIView):
    permission_classes = [IsMedicalStaff]
    def get(self, request):
        start_raw = request.query_params.get("start")
        end_raw = request.query_params.get("end")

        start_date = parse_date(str(start_raw)) if start_raw else None
        end_date = parse_date(str(end_raw)) if end_raw else None


        queryset = LabResult.objects.all()

        if start_date and end_date:
            queryset = queryset.filter(created_at__date__range=(start_date, end_date))
        elif start_date:
            queryset = queryset.filter(created_at__date__gte=start_date)
        elif end_date:
            queryset = queryset.filter(created_at__date__lte=end_date)

        # Annotate with truncated month (creates a temporary alias, not a model field)
        monthly_data = (
            queryset
            .annotate(report_month=TruncMonth('uploaded_at'))
            .values('report_month')
            .annotate(count=Count('id'))
            .order_by('report_month')
        )

        result = [
            {
                "month": entry["report_month"].strftime("%b %Y"),
                "count": entry["count"]
            }
            for entry in monthly_data if entry["report_month"]
        ]

        return Response(result)
    
class CommonDiseasesReportAPIView(APIView):
    permission_classes = [IsMedicalStaff]

    def get(self, request):
        common_diseases = (
            Diagnosis.objects
            .annotate(diagnosis_descriptions=Lower("diagnosis_description"))
            .values("diagnosis_descriptions")
            .annotate(count=Count("id"))
            .order_by("-count")[:10]
        )

        return Response(common_diseases)
    
class TotalPatientsAPIView(APIView):
    permission_classes = [IsMedicalStaff]

    def get(self, request):
        try:
            response = supabase.table("patient_patient").select("*").execute()

            if not hasattr(response, 'data') or not isinstance(response.data, list):
                return Response(
                    {"error": "Failed to fetch patient data"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            patients = response.data
            serializer = PatientSerializer(patients, many=True)

            return Response({
                "count": len(patients),
                "patients": serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MonthlyLabTestView(generics.ListAPIView):
    permission_classes = [IsMedicalStaff]
    serializer_class = PatientLabTestSerializer
    
    def get_queryset(self):
        queryset = LabResult.objects.all()
        if not queryset.exists():
            raise Http404("No Lab Results found for the given patient.")
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"lab_results": serializer.data})

class CommonDiseasesView(generics.ListAPIView):
    permission_classes = [IsMedicalStaff]
    serializer_class = CommonDiseasesSerializer

    def get_queryset(self):
        return TreatmentModel.objects.select_related(
            'patient', 'doctor'
        ).prefetch_related(
            'diagnoses'  
        ).all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        if not queryset.exists():
            return Response(
                {"detail": "No treatment records found."},
                status=status.HTTP_404_NOT_FOUND
            )
            
        serializer = self.get_serializer(queryset, many=True)
        return Response({'treatments': serializer.data})
    
class FrequentMedicationsView(generics.ListAPIView):
    permission_classes = [IsMedicalStaff]

    def get_queryset(self):
        return (
            Prescription.objects
            .values('medication__name')
            .annotate(prescription_count=Sum('quantity'))
            .order_by('-prescription_count')[:10]
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response({"medicines": queryset}, status=status.HTTP_200_OK)
        
class PatientTreatmentRecordsView(APIView):
    permission_classes = [IsAuthenticated, IsMe]

    def get(self, request):
        user = request.user

        # Ensure the user is a patient
        if not hasattr(user, 'patient_profile'):
            return Response(
                {"detail": "You are not authorized to access patient records."},
                status=403
            )

        patient = user.patient_profile

        # Get that patient's treatments
        treatments = TreatmentModel.objects.filter(patient=patient).order_by('-created_at')
        serializer = PatientMedicalRecordSerializer(treatments, many=True)
        return Response(serializer.data)

# patient view prescription
class PatientMyPrescriptionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Get patient_id from the logged-in user's patient profile
            patient_id = request.user.patient_profile.patient_id
            
            # Fetch treatments with prescriptions for this patient - REMOVED description
            treatment_response = supabase.table("queueing_treatment").select(
                """
                id, 
                created_at, 
                updated_at, 
                doctor_id(
                    id,
                    first_name,
                    last_name,
                    user_doctor(specialization)
                ),
                queueing_treatment_prescriptions(
                    id, 
                    treatment_id, 
                    prescription_id, 
                    patient_prescription(*, medicine_medicine(id, name))
                )
                """
            ).eq("patient_id", patient_id).order("created_at", desc=True).execute()
            
            treatments = treatment_response.data

            # Extract and flatten all prescriptions
            all_prescriptions = []
            for treatment in treatments:
                # Safe doctor info extraction
                raw_doc = treatment.get("doctor_id") or {}
                raw_profile = raw_doc.get("user_doctor") or {}
                
                doctor_info = {
                    "id": raw_doc.get("id"),
                    "name": " ".join(filter(None, [raw_doc.get("first_name"), raw_doc.get("last_name")])),
                    "specialization": raw_profile.get("specialization")
                }

                # Process prescriptions for this treatment
                for prescription_relation in treatment.get("queueing_treatment_prescriptions", []):
                    prescription_data = prescription_relation.get("patient_prescription")
                    if not prescription_data:
                        continue
                    
                    medication_data = prescription_data.pop("medicine_medicine", {})
                    
                    prescription_entry = {
                        **prescription_data,
                        "medication": medication_data,
                        "doctor_info": doctor_info,
                        "treatment_date": treatment.get("created_at"),
                        "treatment_id": treatment.get("id")
                    }
                    all_prescriptions.append(prescription_entry)

            # Sort prescriptions by date (newest first)
            all_prescriptions.sort(key=lambda x: x.get("treatment_date", ""), reverse=True)

            return Response({
                "prescriptions": all_prescriptions,
                "total_count": len(all_prescriptions),
                "patient_name": f"{request.user.first_name} {request.user.last_name}"
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PatientRecordsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            patient_id = request.user.patient_profile.patient_id
            
            # Fetch treatments with both prescriptions and diagnoses
            treatment_response = supabase.table("queueing_treatment").select(
                """
                id, 
                treatment_notes, 
                created_at, 
                updated_at, 
                doctor_id(
                    id,
                    first_name,
                    last_name,
                    user_doctor(specialization)
                ),
                queueing_treatment_diagnoses(
                    id, 
                    treatment_id, 
                    diagnosis_id, 
                    patient_diagnosis(*)
                ), 
                queueing_treatment_prescriptions(
                    id, 
                    treatment_id, 
                    prescription_id, 
                    patient_prescription(*, medicine_medicine(id, name))
                )
                """
            ).eq("patient_id", patient_id).order("created_at", desc=True).execute()
            
            treatments = treatment_response.data
            print(f"Found {len(treatments)} treatments for patient {patient_id}")

            records = []
            seen_ids = set()  # Track seen IDs to prevent duplicates
            
            for treatment in treatments:
                # Safe doctor info extraction
                raw_doc = treatment.get("doctor_id") or {}
                raw_profile = raw_doc.get("user_doctor") or {}
                
                doctor_info = {
                    "id": raw_doc.get("id"),
                    "name": " ".join(filter(None, [raw_doc.get("first_name"), raw_doc.get("last_name")])),
                    "specialization": raw_profile.get("specialization")
                }

                treatment_date = treatment.get("created_at")
                treatment_notes = treatment.get("treatment_notes", "")
                treatment_id_val = treatment.get("id")
                
                # Process diagnoses for this treatment
                for diagnosis_relation in treatment.get("queueing_treatment_diagnoses", []):
                    diagnosis_data = diagnosis_relation.get("patient_diagnosis")
                    if diagnosis_data:
                        # Create unique ID using both diagnosis ID and treatment ID
                        diagnosis_id = diagnosis_data.get('id')
                        relation_id = diagnosis_relation.get('id')
                        
                        # Use multiple components to ensure uniqueness
                        record_id = f"diagnosis_{diagnosis_id}_{treatment_id_val}_{relation_id}"
                        
                        # Skip if we've already seen this exact record
                        if record_id in seen_ids:
                            continue
                        seen_ids.add(record_id)
                        
                        # Extract diagnosis code and description
                        diagnosis_code = diagnosis_data.get("diagnosis_code") or diagnosis_data.get("code") or "UNKNOWN"
                        diagnosis_description = diagnosis_data.get("diagnosis_description") or diagnosis_data.get("description") or diagnosis_data.get("diagnosis_notes") or treatment_notes
                        
                        # Format title as "Diagnosis: LVRCNCR - Liver Cancer"
                        diagnosis_title = f"Diagnosis: {diagnosis_code} - {diagnosis_description}"
                        
                        record = {
                            "id": record_id,
                            "type": "diagnosis",
                            "date": treatment_date,
                            "doctor": doctor_info,
                            "title": diagnosis_title,
                            "description": diagnosis_description,
                            "status": "completed",
                            "treatment_id": treatment_id_val,
                            "diagnosis_details": diagnosis_data,
                            "diagnosis_code": diagnosis_code
                        }
                        records.append(record)

                # Process prescriptions for this treatment
                for prescription_relation in treatment.get("queueing_treatment_prescriptions", []):
                    prescription_data = prescription_relation.get("patient_prescription")
                    if prescription_data:
                        medication_data = prescription_data.pop("medicine_medicine", {})
                        medication_name = medication_data.get('name', 'Unknown Medication')
                        
                        # Create unique ID using prescription ID, treatment ID, and relation ID
                        prescription_id = prescription_data.get('id')
                        relation_id = prescription_relation.get('id')
                        
                        record_id = f"prescription_{prescription_id}_{treatment_id_val}_{relation_id}"
                        
                        # Skip if we've already seen this exact record
                        if record_id in seen_ids:
                            continue
                        seen_ids.add(record_id)
                        
                        record = {
                            "id": record_id,
                            "type": "prescription",
                            "date": treatment_date,
                            "doctor": doctor_info,
                            "title": f"Prescription: {medication_name}",
                            "description": f"{prescription_data.get('dosage', '')} - {prescription_data.get('frequency', '')}",
                            "status": "completed",
                            "treatment_id": treatment_id_val,
                            "medication": medication_data,
                            "prescription_details": prescription_data
                        }
                        records.append(record)

            # Sort all records by date (newest first)
            records.sort(key=lambda x: x.get("date", ""), reverse=True)

            return Response({
                "records": records,
                "total_count": len(records),
                "patient_name": f"{request.user.first_name} {request.user.last_name}"
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error in PatientRecordsView: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PatientLabResultsView(APIView):
    permission_classes = [IsAuthenticated]

    def get_supabase_public_url(self, file_path):
        """Generate direct Supabase public URL"""
        try:
            bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "lab_results")
            supabase_url = os.getenv("SUPABASE_URL") or getattr(settings, "SUPABASE_URL", None)
            
            if not supabase_url:
                return None
            
            # Use the file_path exactly as stored in the database
            # For newer records: "unknown/filename.png"
            # For older records: "unknown/Screenshot 2025-09-17 024609.png"
            public_url = f"{supabase_url.rstrip('/')}/storage/v1/object/public/{bucket}/{file_path}"
            return public_url
        except Exception as e:
            print(f"Error generating Supabase URL: {e}")
            return None

    def get(self, request, *args, **kwargs):
        try:
            patient_id = request.user.patient_profile.patient_id
            
            # Fetch lab results
            lab_results_qs = LabResult.objects.filter(
                lab_request__patient__patient_id=patient_id
            ).select_related('lab_request')
            
            processed_results = []
            
            for lab_result in lab_results_qs:
                # Get the file path from the image field - this is what we updated in the database
                file_path = lab_result.image.name if lab_result.image else ""
                
                # Generate URL using the actual file path from database
                image_url = self.get_supabase_public_url(file_path) if file_path else ""
                
                lab_request = lab_result.lab_request
                test_type = lab_request.test_name or lab_request.custom_test or 'Laboratory Test'
                
                # Extract just the filename for display (without the "unknown/" prefix)
                file_name = file_path.split("/")[-1] if "/" in file_path else file_path
                
                result = {
                    "id": lab_result.id,
                    "date": lab_result.uploaded_at.isoformat(),
                    "test_type": test_type,
                    "status": lab_request.status,
                    "image_url": image_url,
                    "file_name": file_name,
                    "notes": "",
                    "request_date": lab_request.created_at.isoformat(),
                    "lab_request_id": lab_request.id
                }
                processed_results.append(result)
            
            return Response({
                "lab_results": processed_results,
                "total_count": len(processed_results),
                "patient_name": f"{request.user.first_name} {request.user.last_name}"
            })
            
        except Exception as e:
            print(f"Error: {e}")
            return Response({"error": str(e)})

