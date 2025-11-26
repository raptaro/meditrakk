
from datetime import datetime, date
import os
from django.conf import settings
from rest_framework import serializers

from .models import HealthTips, Patient, Diagnosis, Prescription, LabRequest, LabResult, HealthTips

from datetime import datetime, date
from rest_framework import serializers
from .models import Patient  # Your Patient model

from datetime import datetime, date
from rest_framework import serializers
from .models import Patient  # Adjust as needed
from medicine.serializers import MedicineSerializer

from queueing.models import TemporaryStorageQueue, Treatment
from appointment.models import Appointment
from urllib.parse import quote


class PatientSerializer(serializers.Serializer):
    patient_id = serializers.CharField(max_length=8)
    first_name = serializers.CharField(max_length=200, allow_blank=True, required=False)
    middle_name = serializers.CharField(max_length=100, allow_blank=True, required=False)
    last_name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=11)
    date_of_birth = serializers.DateField(allow_null=True, required=False)
    street_address = serializers.CharField(max_length=100, allow_blank=True, required=False)
    barangay = serializers.CharField(max_length=100, allow_blank=True, required=False)
    municipal_city = serializers.CharField(max_length=100, allow_blank=True, required=False)
    age = serializers.SerializerMethodField()
    queue_data = serializers.SerializerMethodField()  # full list of queue entries
    latest_queue = serializers.SerializerMethodField()  # only the most recent queue entry
    complaint = serializers.ChoiceField(
        choices=[
            ('General Illness', 'General Illness'),
            ('Injury', 'Injury'),
            ('Check-up', 'Check-up'),
            ('Other', 'Other'),
        ],
        allow_blank=True,
        required=False
    )
    
    def get_age(self, obj):
        # Support both dicts and model instances
        dob = obj.get('date_of_birth') if isinstance(obj, dict) else getattr(obj, 'date_of_birth', None)
        if not dob:
            return None
        if isinstance(dob, str):
            try:
                dob = datetime.strptime(dob, "%Y-%m-%d").date()
            except ValueError:
                return None
        today = date.today()
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))


    def get_queue_data(self, obj):
        # Handle RelatedManager properly
        if isinstance(obj, dict):
            queue_info = obj.get('queueing_temporarystoragequeue') or obj.get('temporarystoragequeue')
        else:
            queue_info = getattr(obj, 'queueing_temporarystoragequeue', None) or getattr(obj, 'temporarystoragequeue', None)
        
        # If it's a RelatedManager, convert to list of dictionaries
        if queue_info and hasattr(queue_info, 'all'):
            try:
                queue_queryset = queue_info.all()
                # Convert to list of simple dictionaries
                queue_list = []
                for item in queue_queryset:
                    queue_list.append({
                        'id': getattr(item, 'id', None),
                        'created_at': getattr(item, 'created_at', None),
                        # Add other queue fields you need
                    })
                return queue_list
            except Exception as e:
                print(f"Error processing queue data: {e}")
                return None
        
        if queue_info:
            if isinstance(queue_info, dict):
                return [queue_info]
            return queue_info
        return None

    def get_latest_queue(self, obj):
        # Get queue data first
        queue_data = self.get_queue_data(obj)
        
        if queue_data and isinstance(queue_data, list) and len(queue_data) > 0:
            # Sort by created_at
            sorted_queue = sorted(
                queue_data,
                key=lambda q: q.get('created_at') if isinstance(q, dict) else getattr(q, 'created_at', None),
                reverse=True
            )
            return sorted_queue[0]
        elif isinstance(queue_data, dict):
            return queue_data
        return None
    
    def update(self, instance, validated_data):
        # Only update allowed fields (up to municipal_city)
        allowed_fields = [
            'first_name', 'middle_name', 'last_name', 
            'phone_number', 'date_of_birth', 'street_address', 
            'barangay', 'municipal_city',
        ]
        
        for field in allowed_fields:
            if field in validated_data:
                setattr(instance, field, validated_data[field])
        
        instance.save()
        return instance

class PatientRegistrationSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    middle_name = serializers.CharField(max_length=100, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=15)
    date_of_birth = serializers.DateField()
    gender = serializers.CharField()
    street_address = serializers.CharField(max_length=255)
    barangay = serializers.CharField(max_length=100)
    municipal_city = serializers.CharField(max_length=100)
    agree_terms = serializers.BooleanField(write_only=True, required=True)
    complaint = serializers.ChoiceField(
        choices=[
            ('General Illness', 'General Illness'),
            ('Injury', 'Injury'),
            ('Check-up', 'Check-up'),
            ('Other', 'Other'),
        ],
        required=False
    )
    priority_level = serializers.ChoiceField(
        choices=[('Regular', 'Regular'), ('Priority', 'Priority')],
        default='Regular'
    )
    queue_data = serializers.SerializerMethodField()


    def validate_email(self, value):
        from user.models import UserAccount
        if UserAccount.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value
    def validate(self, data):
        if data.get("complaint") == "Other":
            request = self.context.get("request")
            other_complaint = request.data.get("other_complaint") if request else None
            if not other_complaint:
                raise serializers.ValidationError({
                    "other_complaint": "This field is required if complaint is 'Other'."
                })
        return data


    def get_queue_data(self, obj):
        if hasattr(obj, "temporarystoragequeue"):
            queue_info = obj.temporarystoragequeue.filter(status='Waiting').first()
            if queue_info:
                return {
                    "id": queue_info.id,
                    "priority_level": queue_info.priority_level,
                    "status": queue_info.status,
                    "created_at": queue_info.created_at,
                    "complaint": queue_info.complaint,
                }
        return None

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['diagnosis_code', 'diagnosis_description', 'diagnosis_date']

class PrescriptionSerializer(serializers.ModelSerializer):
    medication = MedicineSerializer(read_only=True)

    class Meta:
        model = Prescription
        fields = [
            'id',
            'medication',
            'dosage',
            'frequency',
            'quantity',
            'start_date',
            'end_date',
        ]
        read_only_fields = fields

class UserAccountReadSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    # Display the role's label (e.g., "Doctor") rather than the raw value
    role = serializers.CharField(source="get_role_display", read_only=True)

class LabRequestSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    # Nested info for the user who requested (read-only)
    requested_by = UserAccountReadSerializer(read_only=True)
    
    # Write-only field for patient input (e.g., the patient identifier)
    patient = serializers.CharField(write_only=True)
    
    # Nested patient info for output (read-only)
    patient_id = serializers.CharField(source="patient.patient_id", read_only=True)
    first_name = serializers.CharField(source="patient.first_name", read_only=True)
    middle_name = serializers.CharField(source="patient.middle_name", read_only=True)
    last_name = serializers.CharField(source="patient.last_name", read_only=True)
    
    test_name = serializers.CharField()
    custom_test = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    status = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    result = serializers.SerializerMethodField()

    
    def create(self, validated_data):
        # Get the current user from context (set automatically by the view)
        requested_by = self.context.get('request').user
        
        # Pop the patient identifier from the validated data
        patient_identifier = validated_data.pop('patient', None)
        if not patient_identifier:
            raise serializers.ValidationError({"patient": "This field is required."})
        
        # Look up the patient instance using your Patient model (adjust lookup field if needed)
        try:
            patient_instance = Patient.objects.get(patient_id=patient_identifier)
        except Patient.DoesNotExist:
            raise serializers.ValidationError({"patient": "Invalid patient identifier."})
        
        # Create the LabRequest with the patient and requested_by info
        lab_request = LabRequest.objects.create(
            requested_by=requested_by,
            patient=patient_instance,
            **validated_data
        )
        return lab_request
    
    def get_result(self, obj):
        # Attempt to fetch a lab result related to this lab request.
        # Adjust this lookup according to your model relationship.
        try:
            # For one-to-one relationship, if defined as lab_request.labresult:
            lab_result = obj.result  
        except LabResult.DoesNotExist:
            lab_result = None
        # If a lab result is found, return its serialized data; otherwise, return None.
        if lab_result:
            return LabResultSerializer(lab_result, context=self.context).data
        return None

class LabResultSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    submitted_by = UserAccountReadSerializer(read_only=True)

    def get_image_url(self, obj):
        if obj.image:
            bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "lab_results")
            supabase_url = os.getenv("SUPABASE_URL") or getattr(settings, "SUPABASE_URL", None)
            if supabase_url:
                return f"{supabase_url.rstrip('/')}/storage/v1/object/public/{bucket}/{obj.image.name}"
        return None
    class Meta:
        model = LabResult
        fields = ['id', 'lab_request', 'image', 'image_url', 'uploaded_at', 'submitted_by']
    
class PatientVisitSerializer(serializers.ModelSerializer):
    visit_date = serializers.DateField(source='queue_date')
    patient_name = serializers.SerializerMethodField()
    visit_created_at = serializers.DateTimeField(source='created_at')
    treatment_created_at = serializers.SerializerMethodField()

    class Meta:
        model = TemporaryStorageQueue
        fields = [
            'id', 'patient_name', 'priority_level', 'status',
            'complaint', 'queue_number', 'visit_date',
            'visit_created_at', 'treatment_created_at', 
        ]

    def get_treatment_created_at(self, obj):
        # Get treatment data from the context (pre-fetched in bulk)
        treatment_map = self.context.get('treatment_map', {})
        if obj.patient and obj.patient.patient_id in treatment_map:
            return treatment_map[obj.patient.patient_id]['created_at']
        return None
        
    def get_patient_name(self, obj):
        patient = getattr(obj, "patient", None)
        if not patient:
            return None
        return patient.get_full_name() if hasattr(patient, "get_full_name") else f"{patient.first_name} {patient.last_name}"
    
class PatientLabTestSerializer(serializers.ModelSerializer):
    requested_by = serializers.SerializerMethodField()
    submitted_by = serializers.SerializerMethodField()
    class Meta:
        model = LabResult
        fields = [
            'id', 'requested_by', 'uploaded_at', 'submitted_by'
        ]
        
    def get_requested_by(self, obj):
        if obj.lab_request and obj.lab_request.requested_by:
            return obj.lab_request.requested_by.get_full_name() or obj.lab_request.requested_by.username
        return None
    
    def get_submitted_by(self, obj):
        if obj.submitted_by:
            return obj.submitted_by.get_full_name() or obj.submitted_by.username
        return None

class CommonDiseasesSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    doctor_name = serializers.SerializerMethodField()
    diagnoses = DiagnosisSerializer(many=True, read_only=True)  # Use your custom serializer
    
    class Meta:
        model = Treatment
        fields = [
            'patient_name', 
            'doctor_name', 
            'diagnoses', 
            'created_at', 
            'updated_at'
        ]
        
    def get_patient_name(self, obj):
        # Format patient name
        names = [obj.patient.first_name, obj.patient.middle_name, obj.patient.last_name]
        return " ".join(filter(None, names))  # Handles missing middle name
    
    def get_doctor_name(self, obj):
        # Handle case where doctor might be null
        if obj.doctor:
            return f"{obj.doctor.first_name} {obj.doctor.last_name}"
        return "Unassigned"


# patient client side

class PatientMedicalRecordSerializer(serializers.ModelSerializer):
    patient = serializers.SlugRelatedField(
        slug_field='patient_id',
        queryset=Patient.objects.all()
    )
    diagnoses = DiagnosisSerializer(many=True, read_only=True) 
    doctor_name = serializers.CharField(source="doctor.user.get_full_name", read_only=True)
    complaint = serializers.SerializerMethodField()
        
    class Meta:
        model = Treatment
        fields = [
            'patient', 
            'doctor_name', 
            'diagnoses', 
            'created_at', 
            'treatment_notes',
            'complaint'
        ]
    def get_complaint(self, obj):
        # Fetch the latest queue entry (if any) for the patient
        queue = TemporaryStorageQueue.objects.filter(
            patient=obj.patient
        ).order_by('-created_at').first()

        return queue.complaint if queue else None

class PatientTreatmentsSerializer(serializers.ModelSerializer):
    patient_info = serializers.SerializerMethodField()    
    diagnoses = DiagnosisSerializer(many=True, read_only=True)  
    doctor = serializers.SerializerMethodField()    
    latest_queue = serializers.SerializerMethodField()
    class Meta:
        model = Treatment
        fields = [ 
            'id',
            'patient_info',
            'diagnoses', 
            'doctor',
            'treatment_notes',
            'latest_queue'           
        ]
    def get_doctor(self, obj):
        # Handle case where doctor might be null
        if obj.doctor:
            return f"{obj.doctor.first_name} {obj.doctor.last_name}"
        return "Unassigned"
    def get_patient_info(self, obj):
        
        if obj.patient:
            return{
                'patient_id': obj.patient.patient_id,
                'full_name': f"{obj.patient.first_name} {obj.patient.last_name}",
                'age': obj.patient.get_age(),
                'gender': obj.patient.gender,
                'contact_number': obj.patient.phone_number,
                'email': obj.patient.email, 
            }    
            
    def get_latest_queue(self, obj):
        # Get the patient from the treatment
        patient = obj.patient
        
        # Get the latest completed queue entry for this patient
        if patient and hasattr(patient, "temporarystoragequeue"):
            latest_queue = patient.temporarystoragequeue.filter(
                status='Completed'
            ).order_by('-created_at').first()
            
            if latest_queue:
                return {
                    "id": latest_queue.id,
                    "priority_level": latest_queue.priority_level,
                    "status": latest_queue.status,
                    "created_at": latest_queue.created_at,
                    "complaint": latest_queue.complaint,
                    "queue_number": latest_queue.queue_number,
                    "queue_date": latest_queue.queue_date,
                }
        return None
# Health tips serializer
class GeneratedTipSerializer(serializers.Serializer):
    """Serializer for generated tips before saving"""
    diagnosis_id = serializers.IntegerField()
    diagnosis_code = serializers.CharField()
    diagnosis_description = serializers.CharField()
    tip_text = serializers.CharField()
    source = serializers.CharField()

# serializers.py
class HealthTipsSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.get_full_name', read_only=True)
    diagnosis_description = serializers.CharField(source='diagnosis.diagnosis_description', read_only=True)
    doctor_name = serializers.CharField(source='doctor.user.get_full_name', read_only=True)
    
    class Meta:
        model = HealthTips
        fields = [
            'id', 'patient', 'patient_name', 'diagnosis', 'diagnosis_description',
            'doctor_name', 'tip_text', 'source', 'is_for_patient',
            'is_auto_generated', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'patient_name', 'diagnosis_description', 'doctor_name',
            'created_at', 'updated_at', 'is_auto_generated'
        ]

class GenerateTipsRequestSerializer(serializers.Serializer):
    patient_id = serializers.CharField()
    # doctor_id = serializers.CharField(required=False)

class SaveTipsRequestSerializer(serializers.Serializer):
    tips = serializers.ListField(
        child=serializers.DictField(
            child=serializers.CharField()
        )
    )
class PatientDiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['id', 'diagnosis_code', 'diagnosis_description', 'diagnosis_date']
