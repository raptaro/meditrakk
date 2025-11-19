export interface CustomHelpProps {
  title: string;
  content: string;
}

export interface CustomSelectProps {
  title: string;
  items: string[];
}

export interface Secretary {
  id: string;
  name: string;
}

export interface Doctor {
  id: string;
  name: string;
  field: string;
}

interface QueueData {
  id: number;
  priority_level: string;
  status: string;
  created_at: string;
  complaint: string;
  queue_number: string;
}

interface Patient {
  patient_id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  age: number;
  email: string;
  phone_number: string;
  date_of_birth: string;
  street_address: string;
  barangay: string;
  municipal_city: string;
  queue_data?: QueueData;
}

interface Diagnosis {
  diagnosis_code: string;
  diagnosis_description: string;
  diagnosis_date: string;
}

interface Prescription {
  medication: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
}


export interface Treatment {
  id: number;
  treatment_notes: string;
  created_at: string;
  updated_at: string;
  patient: Patient;
  diagnoses: Diagnosis[];
  prescriptions: Prescription[];
}

export interface Service {
  id: string;
  name: string;
  type: string;
};