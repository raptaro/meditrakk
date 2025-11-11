export interface Secretary {
  id: string;
  name: string;
}

export interface Doctor {
  id: string;
  name: string;
  field: string;
}

export interface CustomHelpProps {
  title: string;
  content: string;
}

export interface CustomSelectProps {
  title: string;
  items: string[];
}