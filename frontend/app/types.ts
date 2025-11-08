export interface CustomHelpProps {
  title: string;
  content: string;
}

export interface CustomSelectProps {
  title: string;
  items: string[];
}

export interface MedicineType {
    id: string;
    name: string;
    form: string;
    strength: string;
}

export interface MedicineBatch {
  id: string;
  batchNumber: string;
  quantity: number;
  expiryDate:  Date;
}

export interface Doctor {
  id: string;
  name: string;
    field: string;
}
