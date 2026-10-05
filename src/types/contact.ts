export type SubjectType = 'pedido-especial' | 'duda-general' | 'evento' | 'taller';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: SubjectType;
  message: string;
}

export interface ScheduleItem {
  days: string;
  hours: string;
  status: string;
}

export interface ContactDetails {
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  neighborhood: string;
  city: string;
  pickupNotes: string;
  googleMapsUrl: string;
}