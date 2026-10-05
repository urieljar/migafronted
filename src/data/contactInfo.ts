import type { ContactDetails, ScheduleItem } from '../types/contact';

export const CONTACT_DETAILS: ContactDetails = {
  phone: '+525512345678',
  phoneDisplay: '+52 (55) 1234-5678',
  whatsappNumber: '5215512345678',
  whatsappDisplay: '+52 (55) 1234-5678',
  email: 'pedidos@migapanaderia.com',
  address: 'Calle Colima 142, Taller Int. 3',
  neighborhood: 'Col. Roma Norte',
  city: 'Ciudad de México, CP 06700',
  pickupNotes: 'Entrada por cancel negro de madera. Tocar timbre 3B para entregas programadas.',
  googleMapsUrl: 'https://maps.google.com/?q=Colima+142+Roma+Norte+CDMX',
};

export const WORKSHOP_SCHEDULE: ScheduleItem[] = [
  {
    days: 'Miércoles a Viernes',
    hours: '09:00 - 18:00',
    status: 'Horneado y entregas en taller',
  },
  {
    days: 'Sábados',
    hours: '08:30 - 15:00',
    status: 'Solo entregas de pedidos con reserva',
  },
  {
    days: 'Domingo a Martes',
    hours: 'Cerrado',
    status: 'Fermentación en frío y descanso',
  },
];