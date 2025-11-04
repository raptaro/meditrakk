from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.utils.dateparse import parse_datetime

from .services import PayMayaService

from .models import HOLD_MINUTES, AppointmentReferral, AppointmentRequest, AppointmentReservation
from patient.models import Patient
from .serializers import AppointmentReferralSerializer, AppointmentReferralWriteSerializer, AppointmentRequestSerializer, AppointmentSerializer
from user.permissions import IsDoctorOrOnCallDoctor, isDoctor, isSecretary

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
    permission_classes = [IsDoctorOrOnCallDoctor]

    def post(self, request):
        payload = request.data
        print(payload)
        # check if payload is bulk or dict
        is_bulk = isinstance(payload, list)

        serializer = AppointmentReferralWriteSerializer(
            data = payload,
            many=is_bulk,
            context={'request': request}
        )
        
        serializer.is_valid(raise_exception=True)
        created = serializer.save()
        
        if is_bulk:
            output = AppointmentReferralWriteSerializer(created, many=True).data
        else:
            output = AppointmentReferralWriteSerializer(created).data
        
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

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated, IsDoctorOrOnCallDoctor]

    def get_queryset(self):
        user = self.request.user
        queryset = Appointment.objects.all()

        if user.role == 'doctor':
            # Regular doctors can see all appointments
            pass
        elif user.role == 'on-call-doctor':
            # On-call doctors can only see their direct appointments
            # AND referrals where they are assigned as receiving doctor
            queryset = queryset.filter(
                Q(doctor__user=user) |  # Direct appointments
                Q(
                    appointment_type='referral', 
                    referral__receiving_doctor=user
                )
            ).distinct()
        elif hasattr(user, 'patient_profile'):
            # Patients can only see their own appointments
            queryset = queryset.filter(patient=user.patient_profile)

        return queryset.select_related(
            'patient__user', 
            'doctor__user',
            'scheduled_by'
        ).prefetch_related('payment', 'referral').order_by('-appointment_date')

    @action(detail=True, methods=['post'])
    def complete_treatment(self, request, pk=None):
        """Mark ONLY THIS specific appointment as completed - FIXED VERSION"""
        appointment = self.get_object()
        user = request.user
        
        # Check permissions - only the treating doctor can complete
        if appointment.doctor.user != user:
            return Response(
                {'error': 'You can only complete your own appointments'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Update appointment status
        appointment.status = 'Completed'
        appointment.save()
        
        # **CRITICAL FIX**: Only update the referral linked to THIS appointment
        # Don't update other referrals for the same patient
        if (appointment.appointment_type == 'referral' and 
            hasattr(appointment, 'referral') and 
            appointment.referral):
            
            referral = appointment.referral
            referral.status = 'completed'
            referral.save()
            # **This only updates the specific referral for this doctor**
        
        serializer = self.get_serializer(appointment)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def my_appointments(self, request):
        """Get appointments with proper separation"""
        user = request.user
        appointments = self.get_queryset()
        
        if user.role == 'doctor':
            return self._get_regular_doctor_appointments(appointments, user)
        elif user.role == 'on-call-doctor':
            return self._get_oncall_doctor_appointments(appointments, user)
        else:
            return self._get_patient_appointments(appointments)

    def _get_regular_doctor_appointments(self, appointments, user):
        """For regular doctors - show ALL appointments to monitor progress"""
        # Get ALL appointments (not filtered by doctor)
        all_appointments = Appointment.objects.all()
        
        # Direct appointments where they are the treating doctor
        direct_appointments = all_appointments.filter(doctor__user=user)
        
        # Appointments where they are NOT the treating doctor (for monitoring)
        other_appointments = all_appointments.exclude(doctor__user=user)
        
        # Referrals they made to other doctors
        referrals_made = AppointmentReferral.objects.filter(
            referring_doctor=user
        ).select_related('appointment', 'receiving_doctor', 'patient')
        
        result = {
            'my_direct_appointments': {
                'scheduled': AppointmentSerializer(
                    direct_appointments.filter(status='Scheduled'), 
                    many=True
                ).data,
                'completed': AppointmentSerializer(
                    direct_appointments.filter(status='Completed'), 
                    many=True
                ).data,
                'waiting': AppointmentSerializer(
                    direct_appointments.filter(status='Waiting'), 
                    many=True
                ).data,
                'pending_payment': AppointmentSerializer(
                    direct_appointments.filter(status='PendingPayment'), 
                    many=True
                ).data,
            },
            'other_doctors_appointments': {
                'scheduled': AppointmentSerializer(
                    other_appointments.filter(status='Scheduled'), 
                    many=True
                ).data,
                'completed': AppointmentSerializer(
                    other_appointments.filter(status='Completed'), 
                    many=True
                ).data,
                'waiting': AppointmentSerializer(
                    other_appointments.filter(status='Waiting'), 
                    many=True
                ).data,
                'pending_payment': AppointmentSerializer(
                    other_appointments.filter(status='PendingPayment'), 
                    many=True
                ).data,
            },
            'referrals_i_made': AppointmentReferralSerializer(
                referrals_made, many=True, context={'request': self.request}
            ).data
        }
        
        return Response(result)

    def _get_oncall_doctor_appointments(self, appointments, user):
        """For on-call doctors - ONLY show appointments/referrals assigned to them"""
        # Get appointments where they are the treating doctor
        my_direct_appointments = appointments.filter(doctor__user=user)
        
        # Get referral appointments assigned to this doctor
        my_referral_appointments = appointments.filter(
            appointment_type='referral',
            referral__receiving_doctor=user
        )
        
        # Combine both
        all_my_appointments = (my_direct_appointments | my_referral_appointments).distinct()
        
        # Get referrals assigned to this doctor (including those without appointments yet)
        my_referrals = AppointmentReferral.objects.filter(
            receiving_doctor=user
        ).select_related('appointment', 'referring_doctor', 'patient')
        
        result = {
            'my_appointments': {
                'scheduled': AppointmentSerializer(
                    all_my_appointments.filter(status='Scheduled'), 
                    many=True
                ).data,
                'completed': AppointmentSerializer(
                    all_my_appointments.filter(status='Completed'), 
                    many=True
                ).data,
                'waiting': AppointmentSerializer(
                    all_my_appointments.filter(status='Waiting'), 
                    many=True
                ).data,
                'pending_payment': AppointmentSerializer(
                    all_my_appointments.filter(status='PendingPayment'), 
                    many=True
                ).data,
            },
            'referrals_assigned_to_me': {
                'pending': AppointmentReferralSerializer(
                    my_referrals.filter(status='pending'), 
                    many=True, 
                    context={'request': self.request}
                ).data,
                'scheduled': AppointmentReferralSerializer(
                    my_referrals.filter(status='scheduled'), 
                    many=True, 
                    context={'request': self.request}
                ).data,
                'completed': AppointmentReferralSerializer(
                    my_referrals.filter(status='completed'), 
                    many=True, 
                    context={'request': self.request}
                ).data,
                'canceled': AppointmentReferralSerializer(
                    my_referrals.filter(status='canceled'), 
                    many=True, 
                    context={'request': self.request}
                ).data,
            }
        }
        
        return Response(result)
    
    
class AppointmentReferralViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentReferralSerializer
    permission_classes = [IsAuthenticated, IsReferralParticipant]

    def get_queryset(self):
        user = self.request.user
        queryset = AppointmentReferral.objects.all()

        if hasattr(user, 'patient_profile'):
            # Patient: only referrals related to them
            queryset = queryset.filter(patient=user.patient_profile)
        elif user.role == 'doctor':
            # Regular doctor: referrals they made
            queryset = queryset.filter(referring_doctor=user)
        elif user.role == 'on-call-doctor':
            # On-call doctor: only referrals where they are receiving doctor
            queryset = queryset.filter(receiving_doctor=user)

        return queryset.select_related(
            'patient', 'appointment', 'referring_doctor', 'receiving_doctor'
        ).prefetch_related('patient__user').order_by('-created_at')

    @action(detail=True, methods=['post'])
    def schedule_from_referral(self, request, pk=None):
        """Secretary schedules an appointment from a referral"""
        referral = self.get_object()
        
        # Only secretary can schedule
        if request.user.role != 'secretary':
            return Response(
                {'error': 'Only secretary can schedule from referral'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if not referral.receiving_doctor:
            return Response(
                {'error': 'Cannot schedule appointment without assigned receiving doctor'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        appointment_date = request.data.get('appointment_date')
        if not appointment_date:
            return Response(
                {'error': 'Appointment date is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create appointment
        appointment = Appointment.objects.create(
            patient=referral.patient,
            doctor=Doctor.objects.get(user=referral.receiving_doctor),
            appointment_date=appointment_date,
            appointment_type='referral',
            status='Scheduled',
            scheduled_by=request.user,
            notes=f"Referral from {referral.referring_doctor.get_full_name()}: {referral.reason}"
        )
        
        # Link the appointment to THIS SPECIFIC referral only
        referral.appointment = appointment
        referral.status = 'scheduled'
        referral.save()
        
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def doctor_referrals(self, request):
        """Get referrals for the current doctor (both made and received)"""
        user = request.user
        
        if not hasattr(user, 'role') or user.role not in ['doctor', 'on-call-doctor']:
            return Response(
                {'error': 'Only doctors can access this endpoint'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Referrals this doctor made to others
        referrals_made = AppointmentReferral.objects.filter(
            referring_doctor=user
        ).select_related('patient', 'receiving_doctor', 'appointment')
        
        # Referrals assigned to this doctor
        referrals_received = AppointmentReferral.objects.filter(
            receiving_doctor=user
        ).select_related('patient', 'referring_doctor', 'appointment')
        
        result = {
            'referrals_i_made': {
                'pending': AppointmentReferralSerializer(
                    referrals_made.filter(status='pending'), many=True
                ).data,
                'scheduled': AppointmentReferralSerializer(
                    referrals_made.filter(status='scheduled'), many=True
                ).data,
                'completed': AppointmentReferralSerializer(
                    referrals_made.filter(status='completed'), many=True
                ).data,
                'canceled': AppointmentReferralSerializer(
                    referrals_made.filter(status='canceled'), many=True
                ).data,
            },
            'referrals_assigned_to_me': {
                'pending': AppointmentReferralSerializer(
                    referrals_received.filter(status='pending'), many=True
                ).data,
                'scheduled': AppointmentReferralSerializer(
                    referrals_received.filter(status='scheduled'), many=True
                ).data,
                'completed': AppointmentReferralSerializer(
                    referrals_received.filter(status='completed'), many=True
                ).data,
                'canceled': AppointmentReferralSerializer(
                    referrals_received.filter(status='canceled'), many=True
                ).data,
            }
        }
        
        return Response(result)
    
# upcoming appointments in registration
class UpcomingAppointments(APIView):
    permission_classes = [PatientMedicalStaff]
    
    def get(self, request):
        user = request.user
        current_time = timezone.localtime(timezone.now())  # Current local time in settings.TIME_ZONE
        date_today = current_time.date()
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
        print("Request data:", request.data)
        print("User:", request.user, "Role:", getattr(request.user, "role", None))

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
            existing_queue = already.first()
            return Response({
                "message": "Patient already in queue today",
                "queue_id": existing_queue.id,
                "queue_number": existing_queue.queue_number
            }, status=status.HTTP_200_OK)


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
            
            # validate request
            doctor_id = data.get('doctor_id')
            appointment_date_raw = data.get('appointment_date')
            notes = data.get('notes', '')
            payment_method = data.get('payment_method', 'Gcash')
            
            if not all([doctor_id, appointment_date_raw]):
                return Response({
                    'error': 'Doctor and appointment date are required'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # parse date time to match required format
            appt_dt = parse_datetime(appointment_date_raw)
            if appt_dt is None:
                return Response({'error': 'Invalid appointment_date format. Use ISO 8601.'},
                                status=status.HTTP_400_BAD_REQUEST)
            
            if timezone.is_naive(appt_dt):
                appt_dt = timezone.make_aware(appt_dt, timezone.get_default_timezone())

            try:
                doctor = Doctor.objects.get(role_id=data["doctor_id"])

            except Doctor.DoesNotExist:
                return Response({
                    'error': 'Doctor not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            
            try:
                with transaction.atomic():
                    appt_request = AppointmentRequest.objects.create(
                        patient=patient,
                        doctor=doctor,
                        requested_datetime=appt_dt,
                        reason=notes,
                        status='pending_payment'
                    )
                    
                    reservation = AppointmentReservation.create_for_request(appt_request)

                    payment = Payment.objects.create(
                        appointment_request=appt_request,
                        patient=patient,
                        payment_method=payment_method,
                        amount=500,
                        status='Pending'
                    )
            except IntegrityError:
                return Response({'error': 'This time slot was just taken. Please choose another time.'},
                                status=status.HTTP_409_CONFLICT)
            except Exception as e:
                # Unexpected errors
                return Response({'error': f'Failed to create reservation: {str(e)}'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # payment handling
            if payment_method == 'PayMaya':
                paymaya_result = PayMayaService.create_checkout(payment, patient, appt_request)
                if paymaya_result.get('success'):
                    # save
                    payment.paymaya_checkout_url = paymaya_result.get('checkout_url')
                    payment.paymaya_reference_id = paymaya_result.get('checkout_id') or payment.paymaya_reference_id
                    payment.save(update_fields=['paymaya_checkout_url', 'paymaya_reference_id', 'updated_at'])
                    return Response({
                        'appointment_request_id': appt_request.id,
                        'reservation_expires_at': reservation.expires_at,
                        'payment_id': payment.id,
                        'checkout_url': paymaya_result['checkout_url'],
                        'message': 'Reservation created. Complete payment to confirm.'
                    }, status=status.HTTP_201_CREATED)
                else:
                    # remove appointmentreq if no response under a certain time
                    appt_request.delete()
                    return Response({'error': paymaya_result.get('error', 'Payment initiation failed')},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({
                    'appointment_request_id': appt_request.id,
                    'reservation_expires_at': reservation.expires_at,
                    'payment_id': payment.id,
                    'message': 'Reservation created. Please upload GCash proof within the reservation window.'
                }, status=status.HTTP_201_CREATED)
                
        except Exception as e:
            print(f"Error in BookAppointmentAPIView: {str(e)}")
            return Response({
                'error': f'Failed to create appointment: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# appointments/views.py
class CheckPaymentStatusAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, payment_id):
        """
        Check payment status with automatic PayMaya sync
        """
        try:
            payment = Payment.objects.select_related(
                'appointment_request', 
                'appointment'
            ).get(
                id=payment_id,
                patient=request.user.patient_profile
            )

            logger.info(f"🔍 Checking payment status for {payment_id}: {payment.status}")

            # If PayMaya payment is pending, sync with PayMaya
            if (payment.payment_method == 'PayMaya' and 
                payment.status == 'Pending' and 
                payment.paymaya_reference_id):
                
                logger.info(f"🔄 Syncing with PayMaya for reference: {payment.paymaya_reference_id}")
                self._sync_with_paymaya(payment)

            response_data = {
                'payment_id': payment.id,
                'payment_status': payment.status,
                'payment_method': payment.payment_method,
                'amount': str(payment.amount),
                'paymaya_reference_id': payment.paymaya_reference_id,
            }

            # Include appointment request info
            if payment.appointment_request:
                response_data.update({
                    'appointment_request_id': payment.appointment_request.id,
                    'appointment_request_status': payment.appointment_request.status,
                    'doctor_name': f"Dr. {payment.appointment_request.doctor.user.get_full_name()}",
                    'appointment_date': payment.appointment_request.requested_datetime.isoformat(),
                })

            # Include appointment info if exists
            if payment.appointment:
                response_data.update({
                    'appointment_id': payment.appointment.id,
                    'appointment_status': payment.appointment.status,
                })

            logger.info(f"📤 Returning payment status: {response_data['payment_status']}")
            return Response(response_data)

        except Payment.DoesNotExist:
            logger.error(f"❌ Payment {payment_id} not found for user {request.user.id}")
            return Response(
                {'error': 'Payment not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"💥 Error checking payment status: {str(e)}", exc_info=True)
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _sync_with_paymaya(self, payment):
        """
        Sync payment status with PayMaya API
        """
        try:
            from .services import PayMayaService
            paymaya_status = PayMayaService.get_payment_status(payment.paymaya_reference_id)
            
            if paymaya_status and paymaya_status.get('status') in ['PAYMENT_SUCCESS', 'PAYMENT_SUCCESSFUL']:
                with transaction.atomic():
                    payment.status = 'Paid'
                    payment.save(update_fields=['status', 'updated_at'])
                    
                    if payment.appointment_request:
                        payment.appointment_request.status = 'paid'
                        payment.appointment_request.save(update_fields=['status', 'updated_at'])
                    
                    logger.info(f"✅ Payment {payment.id} synced to Paid via API")
                    
        except Exception as e:
            logger.error(f"⚠️ PayMaya sync failed: {str(e)}")

# appointments/views.py
# appointments/views.py
import json
import logging
from django.db import transaction
from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Payment, AppointmentRequest, AppointmentReservation

logger = logging.getLogger(__name__)
# views.py - Replace your PayMayaWebhookAPIView with this
class PayMayaWebhookAPIView(APIView):
    """
    PayMaya Webhook Handler - Must always return 200 to prevent retries
    """
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        webhook_data = request.data
        logger.info(f"🔔 PayMaya Webhook Received: {webhook_data}")
        
        try:
            # Extract checkout ID from webhook payload
            checkout_id = self._extract_checkout_id(webhook_data)
            if not checkout_id:
                logger.error("❌ Webhook missing checkout ID")
                return Response({"status": "missing_checkout_id"}, status=status.HTTP_200_OK)

            logger.info(f"🔍 Processing webhook for checkout: {checkout_id}")

            # Find payment by PayMaya reference
            try:
                payment = Payment.objects.get(paymaya_reference_id=checkout_id)
                logger.info(f"✅ Found payment {payment.id}, current status: {payment.status}")
            except Payment.DoesNotExist:
                logger.error(f"❌ Payment not found for checkout: {checkout_id}")
                return Response({"status": "payment_not_found"}, status=status.HTTP_200_OK)

            # Save webhook payload for debugging - USING CORRECT FIELD NAME
            payment.paymaya_response = webhook_data  # Changed from paymaya_webhook_response
            payment.save(update_fields=['paymaya_response', 'updated_at'])

            # Process based on webhook type
            event_type = webhook_data.get('type')
            payment_status = self._extract_payment_status(webhook_data)

            logger.info(f"📊 Webhook Event: {event_type}, Payment Status: {payment_status}")

            if event_type == "CHECKOUT_SUCCESS" or payment_status in ["PAYMENT_SUCCESS", "PAYMENT_SUCCESSFUL"]:
                return self._handle_successful_payment(payment)
            elif event_type in ["CHECKOUT_FAILURE", "CHECKOUT_DROPOUT"] or payment_status in ["PAYMENT_FAILED", "PAYMENT_EXPIRED"]:
                return self._handle_failed_payment(payment)
            else:
                logger.warning(f"⚠️ Unhandled webhook event: {event_type}")
                return Response({"status": "ignored"}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"💥 Webhook processing error: {str(e)}", exc_info=True)
            # Always return 200 to prevent PayMaya retries
            return Response({"status": "error_processed"}, status=status.HTTP_200_OK)

    def _extract_checkout_id(self, payload):
        """Extract checkout ID from various possible locations in payload"""
        return (
            payload.get('id') or
            payload.get('checkoutId') or
            payload.get('data', {}).get('id') or
            payload.get('data', {}).get('checkoutId')
        )

    def _extract_payment_status(self, payload):
        """Extract payment status from various possible locations in payload"""
        return (
            payload.get('status') or
            payload.get('paymentStatus') or
            payload.get('data', {}).get('status') or
            payload.get('data', {}).get('paymentStatus')
        )

    # In your PayMayaWebhookAPIView, replace the _handle_successful_payment method:
    def _handle_successful_payment(self, payment):
        """Handle successful payment with transaction safety"""
        logger.info(f"🎯 Processing successful payment for {payment.id}")
        
        # Idempotency check
        if payment.status == 'Paid':
            logger.info("✅ Payment already marked as Paid")
            return Response({"status": "already_processed"}, status=status.HTTP_200_OK)

        try:
            with transaction.atomic():
                # Update payment status ONLY - remove paid_at
                payment.status = 'Paid'
                payment.save(update_fields=['status', 'updated_at'])  # REMOVED paid_at
                logger.info(f"✅ Payment {payment.id} updated to Paid")

                # Update appointment request
                if payment.appointment_request:
                    appt_request = payment.appointment_request
                    appt_request.status = 'paid'
                    appt_request.save(update_fields=['status', 'updated_at'])
                    logger.info(f"✅ AppointmentRequest {appt_request.id} updated to paid")

            # Handle reservation extension
            self._handle_reservation_extension(payment)
            
            logger.info("🎉 Successfully processed payment webhook")
            return Response({"status": "success_processed"}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"💥 Error in payment success handling: {str(e)}", exc_info=True)
            return Response({"status": "error_in_success_handling"}, status=status.HTTP_200_OK)

    def _handle_failed_payment(self, payment):
        """Handle failed payment"""
        logger.info(f"❌ Processing failed payment for {payment.id}")
        
        try:
            with transaction.atomic():
                payment.status = 'Failed'
                payment.save(update_fields=['status', 'updated_at'])

                if payment.appointment_request:
                    appt_request = payment.appointment_request
                    appt_request.status = 'cancelled'
                    appt_request.save(update_fields=['status', 'updated_at'])

            # Delete reservation if exists
            self._handle_reservation_cleanup(payment)
            
            return Response({"status": "failed_processed"}, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"💥 Error in payment failure handling: {str(e)}")
            return Response({"status": "error_in_failure_handling"}, status=status.HTTP_200_OK)

    def _handle_reservation_extension(self, payment):
        """Extend reservation expiry for successful payments"""
        try:
            if payment.appointment_request:
                reservation = payment.appointment_request.reservation
                if reservation:
                    reservation.expires_at = timezone.now() + timedelta(minutes=60)
                    reservation.save(update_fields=['expires_at', 'updated_at'])
                    logger.info(f"✅ Reservation extended to {reservation.expires_at}")
        except AppointmentReservation.DoesNotExist:
            logger.warning("⚠️ No reservation found to extend")
        except Exception as e:
            logger.error(f"⚠️ Reservation extension failed: {str(e)}")

    def _handle_reservation_cleanup(self, payment):
        """Clean up reservation for failed payments"""
        try:
            if payment.appointment_request:
                reservation = payment.appointment_request.reservation
                if reservation:
                    reservation.delete()
                    logger.info("✅ Reservation deleted for failed payment")
        except Exception as e:
            logger.error(f"⚠️ Reservation cleanup failed: {str(e)}")
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

# appointments/views.py (cancel endpoint)
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import AppointmentRequest, AppointmentReservation, Payment

class CancelAppointmentRequestAPIView(APIView):
    """
    Cancel a pending appointment request.
    Deletes AppointmentRequest, its Reservation, and its Payment (if Payment.status is Pending/Failed).
    Refuses to cancel if Payment.status == 'Paid' or request already scheduled.

    Endpoint: POST /api/appointment-requests/<request_id>/cancel/
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        # Fetch request and check ownership
        appt_req = get_object_or_404(AppointmentRequest, id=request_id)

        # Ensure the user owns this request (patient)
        # Adjust this check to your user->patient relation attribute name
        if not hasattr(request.user, 'patient_profile') or appt_req.patient != request.user.patient_profile:
            return Response({'error': 'You are not allowed to cancel this request.'},
                            status=status.HTTP_403_FORBIDDEN)

        # Disallow cancelling already scheduled or already cancelled/expired requests
        if appt_req.status in ('scheduled',):
            return Response({'error': 'This request has already been scheduled and cannot be cancelled here.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if appt_req.status in ('cancelled', 'expired'):
            # idempotent: returning success if already cancelled/expired
            return Response({'detail': f'Request already {appt_req.status}.'}, status=status.HTTP_200_OK)

        # If there's a linked payment, inspect its status
        payment = getattr(appt_req, 'payment', None)
        if payment and payment.status == 'Paid':
            # We avoid automatically deleting records for paid requests.
            # Business decision: instruct user to contact support or trigger refund workflow.
            return Response({
                'error': 'Payment has already been completed. To cancel and request a refund, please contact support or follow the refund process.'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Perform deletion inside a transaction to avoid partial cleanup
        try:
            with transaction.atomic():
                # Delete reservation if exists
                try:
                    reservation = appt_req.reservation
                    reservation.delete()
                except AppointmentReservation.DoesNotExist:
                    pass

                # Delete or mark payment appropriately
                if payment:
                    # If payment is pending or failed, safely delete it (or mark cancelled if you prefer)
                    if payment.status in ('Pending', 'Failed'):
                        payment.delete()
                    else:
                        # defensive: should not reach here because we checked Paid above
                        payment.status = 'Failed'
                        payment.save(update_fields=['status', 'updated_at'])

                # Finally delete the appointment request
                appt_req.delete()

            return Response({'detail': 'Appointment request cancelled and temporary records removed.'},
                            status=status.HTTP_200_OK)

        except Exception as e:
            # Log the exception server-side as needed
            print(f"Error cancelling appointment request {appt_req.id}: {e}")
            return Response({'error': 'Failed to cancel appointment request. Try again later.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UploadGcashProofAPIView(APIView):
    """
    API for uploading GCash payment proof for AppointmentRequest
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, appointment_request_id):
        try:
            # Get the appointment request
            appointment_request = AppointmentRequest.objects.get(
                id=appointment_request_id,
                patient=request.user.patient_profile
            )

            # Check if reservation is still valid
            try:
                reservation = appointment_request.reservation
                if reservation.is_expired():
                    return Response({
                        'error': 'Reservation has expired. Please book a new appointment.'
                    }, status=status.HTTP_400_BAD_REQUEST)
            except AppointmentReservation.DoesNotExist:
                return Response({
                    'error': 'No reservation found for this appointment request.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Get the associated payment
            try:
                payment = appointment_request.payment
            except Payment.DoesNotExist:
                return Response({
                    'error': 'No payment found for this appointment request'
                }, status=status.HTTP_404_NOT_FOUND)

            if payment.payment_method != 'Gcash':
                return Response({
                    'error': 'This appointment request does not use GCash payment'
                }, status=status.HTTP_400_BAD_REQUEST)

            gcash_proof = request.FILES.get('gcash_proof')
            if not gcash_proof:
                return Response({
                    'error': 'GCash proof image is required'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Validate file type
            allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
            if gcash_proof.content_type not in allowed_types:
                return Response({
                    'error': 'Only JPEG, PNG, and PDF files are allowed'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Validate file size (5MB max)
            if gcash_proof.size > 5 * 1024 * 1024:
                return Response({
                    'error': 'File size must be less than 5MB'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Update payment with GCash proof and mark as Paid
            payment.gcash_proof = gcash_proof
            payment.status = 'Paid'
            payment.save()

            # Update appointment request status
            appointment_request.status = 'paid'
            appointment_request.save()

            print(f"GCash proof uploaded for payment {payment.id}, appointment request {appointment_request.id}")

            return Response({
                'success': True,
                'message': 'GCash proof uploaded successfully. Payment confirmed.',
                'payment_id': payment.id,
                'appointment_request_status': appointment_request.status,
                'reservation_expires_at': reservation.expires_at.isoformat()
            })

        except AppointmentRequest.DoesNotExist:
            return Response({
                'error': 'Appointment request not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error uploading GCash proof: {str(e)}")
            return Response({
                'error': 'Failed to upload GCash proof'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SecretaryAppointmentAPIView(APIView):
    """
    API for secretary to manage appointments
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Get all appointments for secretary dashboard
        """
        status_filter = request.GET.get('status', 'paid')
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
# appointments/views.py
class TestWebhookAPIView(APIView):
    """
    Test endpoint to simulate PayMaya webhook (for development)
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, payment_id):
        try:
            payment = Payment.objects.get(
                id=payment_id,
                patient=request.user.patient_profile
            )

            if not payment.paymaya_reference_id:
                return Response({'error': 'No PayMaya reference ID'}, status=status.HTTP_400_BAD_REQUEST)

            # Simulate PayMaya webhook payload
            webhook_payload = {
                "id": payment.paymaya_reference_id,
                "type": "CHECKOUT_SUCCESS",
                "data": {
                    "status": "PAYMENT_SUCCESS",
                    "checkoutId": payment.paymaya_reference_id,
                    "paymentId": f"pay_{payment.paymaya_reference_id}",
                    "paymentStatus": "PAYMENT_SUCCESS",
                    "amount": float(payment.amount),
                    "currency": "PHP",
                    "createdAt": timezone.now().isoformat(),
                    "updatedAt": timezone.now().isoformat()
                }
            }

            # Call webhook internally
            webhook_view = PayMayaWebhookAPIView()
            webhook_view.request = request._request
            response = webhook_view.post(request._request)
            
            # Refresh payment status
            payment.refresh_from_db()

            return Response({
                'message': 'Webhook simulation completed',
                'webhook_response': response.data,
                'current_payment_status': payment.status,
                'appointment_request_status': payment.appointment_request.status if payment.appointment_request else None
            })

        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Webhook test error: {str(e)}", exc_info=True)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.db import transaction
import logging
from .models import Payment, AppointmentRequest, AppointmentReservation

logger = logging.getLogger(__name__)

class TestWebhookAPIView(APIView):
    """
    API View to test PayMaya webhook functionality
    """
    permission_classes = []  # No authentication for testing
    
    def get(self, request, payment_id=None):
        """
        Get payment status and info
        """
        try:
            if not payment_id:
                return Response(
                    {"error": "Payment ID required in URL"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            payment = Payment.objects.get(id=payment_id)
            
            response_data = {
                "payment_id": payment.id,
                "current_status": payment.status,
                "payment_method": payment.payment_method,
                "amount": str(payment.amount),
                "paymaya_reference_id": payment.paymaya_reference_id,
                "paymaya_response": payment.paymaya_response,
                "appointment_request_id": payment.appointment_request.id if payment.appointment_request else None,
                "appointment_request_status": payment.appointment_request.status if payment.appointment_request else None,
                "created_at": payment.created_at,
                "updated_at": payment.updated_at
            }
            
            return Response(response_data)
            
        except Payment.DoesNotExist:
            return Response({"error": "Payment not found"}, status=404)
        except Exception as e:
            logger.error(f"Error in test webhook GET: {str(e)}")
            return Response({"error": str(e)}, status=500)

    def post(self, request, payment_id=None):
        """
        Test webhook for a specific payment - SIMULATES PayMaya webhook
        """
        try:
            logger.info(f"🔔 TEST WEBHOOK REQUEST for payment: {payment_id}")
            
            # If no payment_id in URL, check in request data
            if not payment_id:
                payment_id = request.data.get('payment_id')
            
            if not payment_id:
                return Response(
                    {"error": "Payment ID required. Provide in URL or request body."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Find the payment
            try:
                payment = Payment.objects.get(id=payment_id)
                logger.info(f"✅ Found payment {payment.id}, current status: {payment.status}")
            except Payment.DoesNotExist:
                logger.error(f"❌ Payment not found: {payment_id}")
                return Response(
                    {"error": f"Payment {payment_id} not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Process payment directly (simulate webhook logic)
            return self._process_test_payment(payment)
            
        except Exception as e:
            logger.error(f"💥 Test webhook error: {str(e)}", exc_info=True)
            return Response(
                {"error": f"Test webhook failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def _process_test_payment(self, payment):
        """Process test payment with transaction safety"""
        logger.info(f"🎯 Processing test payment for {payment.id}")
        
        # Idempotency check
        if payment.status == 'Paid':
            logger.info("✅ Payment already marked as Paid")
            return Response(
                {"status": "already_processed", "payment_id": payment.id}, 
                status=status.HTTP_200_OK
            )

        try:
            with transaction.atomic():
                # Update payment status
                payment.status = 'Paid'
                
                # Store test response in paymaya_response field
                payment.paymaya_response = {
                    "test_webhook": True,
                    "type": "CHECKOUT_SUCCESS", 
                    "status": "PAYMENT_SUCCESS",
                    "processed_at": timezone.now().isoformat(),
                    "simulated": True
                }
                
                payment.save(update_fields=['status', 'paymaya_response', 'updated_at'])
                logger.info(f"✅ Payment {payment.id} updated to Paid")

                # Update appointment request
                if payment.appointment_request:
                    appt_request = payment.appointment_request
                    appt_request.status = 'paid'
                    appt_request.save(update_fields=['status', 'updated_at'])
                    logger.info(f"✅ AppointmentRequest {appt_request.id} updated to paid")

            # Handle reservation extension
            self._handle_reservation_extension(payment)
            
            logger.info(f"🎉 Successfully processed test payment for {payment.id}")
            return Response(
                {
                    "status": "success_processed", 
                    "payment_id": payment.id,
                    "appointment_request_id": payment.appointment_request.id if payment.appointment_request else None,
                    "message": "Test payment completed successfully",
                    "new_payment_status": "Paid",
                    "new_appointment_request_status": payment.appointment_request.status if payment.appointment_request else None
                }, 
                status=status.HTTP_200_OK
            )

        except Exception as e:
            logger.error(f"💥 Error in test payment processing: {str(e)}", exc_info=True)
            return Response(
                {"status": "error_processed", "error": str(e)}, 
                status=status.HTTP_200_OK
            )

    def _handle_reservation_extension(self, payment):
        """Extend reservation expiry for successful payments"""
        try:
            if payment.appointment_request:
                # Try to get existing reservation or create one
                reservation, created = AppointmentReservation.objects.get_or_create(
                    appointment_request=payment.appointment_request,
                    defaults={
                        'doctor': payment.appointment_request.doctor,
                        'appointment_datetime': payment.appointment_request.requested_datetime,
                        'expires_at': timezone.now() + timedelta(minutes=60)
                    }
                )
                
                if not created:
                    reservation.expires_at = timezone.now() + timedelta(minutes=60)
                    reservation.save(update_fields=['expires_at', 'updated_at'])
                
                logger.info(f"✅ Reservation {'created' if created else 'extended'} to {reservation.expires_at}")
                
        except Exception as e:
            logger.error(f"⚠️ Reservation handling failed: {str(e)}")

class PaymentSuccessAPIView(APIView):
    """
    API endpoint for handling payment success redirects
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request, payment_id):  # Add payment_id parameter here
        """
        Handle GET request for payment success page
        """
        print(f"🔍 Received payment_id from URL path: {payment_id}")
        
        try:
            # Get the payment
            payment = Payment.objects.select_related(
                'appointment_request',
                'appointment_request__doctor',
                'appointment_request__doctor__user'
            ).get(id=payment_id)
            
            print(f"✅ Found payment: {payment.id}, status: {payment.status}")

            # Check if payment is already processed
            if payment.status == 'Paid':
                return Response({
                    'status': 'already_processed',
                    'message': 'Payment already completed',
                    'payment_id': payment.id,
                    'appointment_request_id': payment.appointment_request.id if payment.appointment_request else None
                })

            # Try to sync with PayMaya if still pending
            if payment.status == 'Pending' and payment.payment_method == 'PayMaya':
                if payment.paymaya_reference_id:
                    try:
                        from .services import PayMayaService
                        paymaya_status = PayMayaService.get_payment_status(payment.paymaya_reference_id)
                        
                        if paymaya_status and paymaya_status.get('status') in ['PAYMENT_SUCCESS', 'PAYMENT_SUCCESSFUL']:
                            payment.status = 'Paid'
                            payment.paid_at = timezone.now()
                            payment.save()
                            
                            if payment.appointment_request:
                                payment.appointment_request.status = 'paid'
                                payment.appointment_request.save()
                            
                            logger.info(f"Payment {payment.id} synced to Paid via success page")
                            
                            return Response({
                                'status': 'success',
                                'message': 'Payment completed successfully',
                                'payment_id': payment.id,
                                'appointment_request_id': payment.appointment_request.id if payment.appointment_request else None
                            })
                    except Exception as e:
                        logger.error(f"PayMaya sync failed in success page: {str(e)}")
                        # Continue to return pending status

            return Response({
                'status': 'pending',
                'message': 'Payment is being processed',
                'payment_id': payment.id,
                'current_status': payment.status
            })

        except Payment.DoesNotExist:
            logger.error(f"Payment not found: {payment_id}")
            return Response({
                'error': 'Payment not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error in payment success view: {str(e)}")
            return Response({
                'error': 'Internal server error'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AppointmentRequestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, isSecretary]
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer
    
    @action(detail=False, methods=['get'], url_path='patient-request')
    def secretary_paid(self, request):
        paid_statuses = ['paid', 'pending_payment']
        qs = self.get_queryset().filter(status__in=paid_statuses)
        
        data = []
        for req in qs:
            item = {
                'id': req.id,
                'patient_name': str(req.patient),
                'doctor_name': str(req.doctor),
                'reason': req.reason,
                'requested_datetime': req.requested_datetime,
                'status': req.status,
                'created_at': req.created_at
            }
            
            # Add payment info safely
            if hasattr(req, 'payment') and req.payment:
                item['payment'] = {
                    'id': req.payment.id,
                    'status': req.payment.status,
                    'amount': str(req.payment.amount),
                    'method': req.payment.payment_method,
                }
            else:
                item['payment'] = None
                
            data.append(item)
        
        return Response(data)
    
    @action(detail=True, methods=['post'], url_path='confirm-to-appointment')
    def confirm_to_appointment(self, request, pk=None):
        """Secretary confirms a paid appointment request and creates an actual appointment"""
        try:
            appointment_request = self.get_object()
            
            # Check if request is in a confirmable state
            if appointment_request.status not in ['paid', 'reserved']:
                return Response(
                    {'error': 'Only paid appointment requests can be confirmed'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if payment exists and is paid
            if not hasattr(appointment_request, 'payment') or appointment_request.payment.status != 'Paid':
                return Response(
                    {'error': 'Cannot confirm appointment without successful payment'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Create the appointment
            appointment = Appointment.objects.create(
                patient=appointment_request.patient,
                doctor=appointment_request.doctor,
                appointment_date=appointment_request.requested_datetime,
                status='Scheduled',
                scheduled_by=request.user,
                notes=f"Confirmed from appointment request #{appointment_request.id}"
            )
            
            # Link payment to appointment
            payment = appointment_request.payment
            payment.appointment = appointment
            payment.appointment_request = None  # Remove link to request
            payment.save()
            
            # Update appointment request status
            appointment_request.status = 'scheduled'
            appointment_request.save()
            
            return Response({
                'message': 'Appointment confirmed and scheduled successfully',
                'appointment_id': appointment.id,
                'appointment_date': appointment.appointment_date
            })
            
        except Exception as e:
            return Response(
                {'error': f'Failed to create appointment: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )