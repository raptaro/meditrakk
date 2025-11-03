# serializers.py
from rest_framework import serializers

from patient.serializers import PatientSerializer
from patient.models import Patient
from .models import Appointment, AppointmentReferral, AppointmentRequest, Payment
from user.models import Doctor, UserAccount
from queueing.models import TemporaryStorageQueue


class BulkReferralListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        user = self.context['request'].user
        instances = []
        for item in validated_data:
            # receiving_doctor is a UserAccount instance
            receiving_doctor = item.pop('receiving_doctor')
            instances.append(
                AppointmentReferral(
                    referring_doctor=user,
                    receiving_doctor=receiving_doctor,
                    **item
                )
            )
        return AppointmentReferral.objects.bulk_create(instances)
class UserAccountSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='get_full_name', read_only=True)

    class Meta:
        model = UserAccount
        fields = ['id', 'full_name', 'email', 'role']


class AppointmentReferralWriteSerializer(serializers.ModelSerializer):
    referring_doctor = UserAccountSerializer(read_only=True)
    receiving_doctor = serializers.SlugRelatedField(
        slug_field='id',  # UserAccount ID
        queryset=UserAccount.objects.filter(role__in=['doctor', 'on-call-doctor'])
    )
    patient = serializers.SlugRelatedField(
        slug_field='patient_id',
        queryset=Patient.objects.all()
    )
    appointment_date = serializers.DateTimeField(
        source='appointment.appointment_date',
        read_only=True,
        format='%Y-%m-%dT%H:%M:%S'
    )

    class Meta:
        model = AppointmentReferral
        fields = [
            'id', 'patient', 'receiving_doctor', 'reason', 'notes',
            'referring_doctor', 'status', 'created_at', 'appointment_date'
        ]
        read_only_fields = ['id', 'referring_doctor']
        list_serializer_class = BulkReferralListSerializer

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        # Handling receiving_doctor
        if instance.receiving_doctor:
            try:
                doctor_profile = instance.receiving_doctor.doctor_profile
                ret['receiving_doctor'] = {
                    "id": doctor_profile.user.id,
                    "full_name": doctor_profile.user.get_full_name(),
                    "email": doctor_profile.user.email,
                    "role": doctor_profile.user.role,
                    "specialization": doctor_profile.specialization
                }
            except Doctor.DoesNotExist:
                ret['receiving_doctor'] = UserAccountSerializer(instance.receiving_doctor).data
        else:
            ret['receiving_doctor'] = None

        # Handling referring_doctor
        if instance.referring_doctor:
            try:
                doctor_profile = instance.referring_doctor.doctor_profile
                ret['referring_doctor'] = {
                    "id": doctor_profile.user.id,
                    "full_name": doctor_profile.user.get_full_name(),
                    "email": doctor_profile.user.email,
                    "role": doctor_profile.user.role,
                    "specialization": doctor_profile.specialization
                }
            except Doctor.DoesNotExist:
                ret['referring_doctor'] = UserAccountSerializer(instance.referring_doctor).data
        else:
            ret['referring_doctor'] = None

        return ret
class AppointmentReferralSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    referring_doctor_name = serializers.CharField(source='referring_doctor.get_full_name', read_only=True)
    receiving_doctor_name = serializers.CharField(source='receiving_doctor.get_full_name', read_only=True)
    
    class Meta:
        model = AppointmentReferral
        fields = [
            'id', 'referring_doctor', 'referring_doctor_name', 'patient', 'patient_name',
            'receiving_doctor', 'receiving_doctor_name', 'reason', 'notes', 'status',
            'appointment', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
        list_serializer_class = BulkReferralListSerializer

    def to_representation(self, instance):
        ret = super().to_representation(instance)

        # Handling receiving_doctor
        if instance.receiving_doctor:
            try:
                doctor_profile = instance.receiving_doctor.doctor_profile
                ret['receiving_doctor'] = {
                    "id": doctor_profile.user.id,
                    "full_name": doctor_profile.user.get_full_name(),
                    "email": doctor_profile.user.email,
                    "role": doctor_profile.user.role,
                    "specialization": doctor_profile.specialization
                }
            except Doctor.DoesNotExist:
                ret['receiving_doctor'] = UserAccountSerializer(instance.receiving_doctor).data
        else:
            ret['receiving_doctor'] = None

        # Handling referring_doctor
        if instance.referring_doctor:
            try:
                doctor_profile = instance.referring_doctor.doctor_profile
                ret['referring_doctor'] = {
                    "id": doctor_profile.user.id,
                    "full_name": doctor_profile.user.get_full_name(),
                    "email": doctor_profile.user.email,
                    "role": doctor_profile.user.role,
                    "specialization": doctor_profile.specialization
                }
            except Doctor.DoesNotExist:
                ret['referring_doctor'] = UserAccountSerializer(instance.referring_doctor).data
        else:
            ret['referring_doctor'] = None

        return ret



class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.user.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    scheduled_by_name = serializers.CharField(source='scheduled_by.get_full_name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_name', 'doctor', 'doctor_name', 
            'appointment_date', 'status', 'appointment_type', 'notes',
            'scheduled_by', 'scheduled_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_patient_name(self, obj):
        patient = getattr(obj, "patient", None)
        if not patient:
            return ""
        # try common methods/attributes safely
        if callable(getattr(patient, "get_full_name", None)):
            try:
                return patient.get_full_name()
            except Exception:
                pass
        for attr in ("full_name", "name", "first_name", "display_name"):
            val = getattr(patient, attr, None)
            if val:
                return val
        return str(patient)


class QueueSerializer(serializers.ModelSerializer):
    # represent patient as a scalar PK (safe) OR nest PatientSerializer if you need more fields
    patient = serializers.PrimaryKeyRelatedField(read_only=True)
    # robustly compute a display name for the patient
    patient_name = serializers.SerializerMethodField()
    # include position for ordering/visibility
    position = serializers.IntegerField(read_only=True)

    class Meta:
        model = TemporaryStorageQueue
        fields = [
            "id", "patient", "patient_name", "priority_level",
            "queue_number", "status", "queue_date", "position"
        ]

    def get_patient_name(self, obj):
        patient = getattr(obj, "patient", None)
        if not patient:
            return ""
        # prefer a full-name method if present
        if callable(getattr(patient, "get_full_name", None)):
            try:
                return patient.get_full_name()
            except Exception:
                pass
        for attr in ("full_name", "name", "first_name", "display_name"):
            val = getattr(patient, attr, None)
            if val:
                return val
        return str(patient)


class AppointmentBookingSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    doctor_id = serializers.IntegerField(write_only=True)
    payment_method = serializers.ChoiceField(
        choices=Payment.PAYMENT_METHODS, 
        write_only=True
    )
    
    class Meta:
        model = Appointment
        fields = [
            'patient', 'doctor_id', 'appointment_date', 
            'notes', 'payment_method'
        ]
    
    def create(self, validated_data):
        patient_data = validated_data.pop('patient')
        doctor_id = validated_data.pop('doctor_id')
        payment_method = validated_data.pop('payment_method')
        request = self.context.get('request')
        
        # Get or create patient
        patient, created = Patient.objects.get_or_create(
            phone_number=patient_data['phone_number'],
            defaults=patient_data
        )
        
        if not created:
            # Update patient info if exists
            for attr, value in patient_data.items():
                setattr(patient, attr, value)
            patient.save()
        
        # Get doctor
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            raise serializers.ValidationError("Doctor not found")
        
        # Create appointment
        appointment = Appointment.objects.create(
            patient=patient,
            doctor=doctor,
            scheduled_by=request.user if request.user.is_authenticated else None,
            **validated_data
        )
        
        # Create payment record
        Payment.objects.create(
            appointment=appointment,
            patient=patient,
            payment_method=payment_method,
            amount=500.00,  # Fixed consultation fee
            status='Pending'
        )
        
        return appointment
class AppointmentDetailSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    payment = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'doctor', 'doctor_name',
            'appointment_date', 'status', 'notes', 'created_at',
            'payment'
        ]

    def get_payment(self, obj):
        try:
            # Use filter().first() instead of direct access to avoid RelatedObjectDoesNotExist
            payment = Payment.objects.filter(appointment=obj).first()
            if payment:
                return PaymentSerializer(payment).data
            return None
        except Exception:
            return None
import logging

logger = logging.getLogger(__name__)

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'payment_method', 'amount', 'status',
            'paymaya_reference_id', 'paymaya_checkout_url',
            'gcash_proof', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'paymaya_reference_id', 
                          'paymaya_checkout_url', 'created_at']

class DoctorSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.get_full_name')
    email = serializers.CharField(source='user.email')
    id = serializers.CharField(source='user.id')
    role = serializers.CharField(source='user.role')   
    
    class Meta:
        model = Doctor
        fields = ['id', 'full_name', 'specialization', 'role','email']

class AppointmentRequestSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    payment = serializers.SerializerMethodField()
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)

    class Meta:
        model = AppointmentRequest
        fields = [
            'id',
            'patient',
            'doctor',
            'patient_name',
            'doctor_name',
            'requested_datetime',
            'reason',
            'status',
            'payment',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'patient',
            'doctor',
            'patient_name',
            'doctor_name',
            'payment',
            'created_at',
            'updated_at',
        ]

    def get_payment(self, obj):
        """Safe method to get payment data"""
        if hasattr(obj, 'payment') and obj.payment:
            return {
                'id': obj.payment.id,
                'payment_method': obj.payment.payment_method,
                'amount': str(obj.payment.amount),
                'status': obj.payment.status,
                'paymaya_reference_id': obj.payment.paymaya_reference_id,
                'paymaya_checkout_url': obj.payment.paymaya_checkout_url,
                'created_at': obj.payment.created_at,
            }
        return None
class DoctorAvailabilitySerializer(serializers.Serializer):
    date = serializers.DateField()
    day_of_week = serializers.CharField()
    start_time = serializers.TimeField()
    end_time = serializers.TimeField()
    is_available = serializers.BooleanField()
    datetime = serializers.CharField()
