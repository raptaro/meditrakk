from .models import TemporaryStorageQueue
from django.utils.timezone import localdate
from datetime import date

def compute_queue_snapshot():
    today = localdate()
    
    # Get ALL waiting patients for today, not just first 3
    priority = TemporaryStorageQueue.objects.filter(
        status="Waiting",
        priority_level="Priority",
        created_at__date=today
    ).order_by("position", "queue_number")
    
    regular = TemporaryStorageQueue.objects.filter(
        status="Waiting",
        priority_level="Regular", 
        created_at__date=today
    ).order_by("position", "queue_number")

    def fmt(q):
        if not q:
            return None
            
        # Check if this is an existing patient (has patient field)
        if q.patient:
            # Existing patient - get data from Patient model
            patient = q.patient
            first_name = patient.first_name
            last_name = patient.last_name
            phone = patient.phone_number
            dob = patient.date_of_birth
            pid = patient.patient_id
            is_new_patient = False
        else:
            # New patient - get data from temporary fields
            first_name = q.temp_first_name
            last_name = q.temp_last_name
            phone = q.temp_phone_number
            dob = q.temp_date_of_birth
            pid = None
            is_new_patient = True

        # compute age
        if dob:
            try:
                # Handle both string and date objects
                if isinstance(dob, str):
                    dob_date = date.fromisoformat(dob)
                else:
                    dob_date = dob
                    
                today0 = date.today()
                age = today0.year - dob_date.year - (
                    (today0.month, today0.day) < (dob_date.month, dob_date.day)
                )
            except Exception as e:
                print(f"Error calculating age: {e}")
                age = None
        else:
            age = None

        return {
            "id": q.id,
            "patient_id": pid,
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone,
            "date_of_birth": dob,
            "age": age,
            "priority_level": q.priority_level,
            "complaint": q.complaint,
            "status": q.status,
            "queue_number": q.queue_number,
            "position": q.position,
            "created_at": q.created_at,
            "is_new_patient": is_new_patient,
        }

    # Return ALL patients, not just first 3
    priority_list = [fmt(p) for p in priority]
    regular_list = [fmt(r) for r in regular]

    return {
        "priority_queue": priority_list,  # All priority patients
        "regular_queue": regular_list,    # All regular patients
        # Keep the original structure for backward compatibility
        "priority_current": priority_list[0] if len(priority_list) > 0 else None,
        "priority_next1": priority_list[1] if len(priority_list) > 1 else None,
        "priority_next2": priority_list[2] if len(priority_list) > 2 else None,
        "regular_current": regular_list[0] if len(regular_list) > 0 else None,
        "regular_next1": regular_list[1] if len(regular_list) > 1 else None,
        "regular_next2": regular_list[2] if len(regular_list) > 2 else None,
    }