import type { ProcessStep, PolicyInfo } from '../types/howItWorks';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Selección de Ingredientes Honestos',
    badge: 'Materia Prima Noble',
    description: 'Creemos que no se puede hacer pan extraordinario con ingredientes ordinarios. Cada receta inicia eligiendo lo mejor del campo.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop',
    details: [
      'Harinas limpias no blanqueadas ni enriquecidas artificialmente.',
      'Mantequilla de vaca pura 82% grasa de libre pastoreo.',
      'Agua doblemente filtrada y sal marina mineral sin refinar.',
    ],
  },
  {
    stepNumber: 2,
    title: 'Fermentación Lenta y Paciente',
    badge: '24 a 48 Horas en Frío',
    description: 'No usamos levaduras industriales aceleradas. Confiamos en nuestro cultivo biológico de masa madre viva alimentada a diario.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=900&auto=format&fit=crop',
    details: [
      'Degradación natural de los azúcares y proteínas del gluten.',
      'Desarrollo de aromas lácticos y acidez perfectamente equilibrada.',
      'Pan con índice glucémico más bajo y digestión excepcionalmente ligera.',
    ],
  },
  {
    stepNumber: 3,
    title: 'Formado a Mano y Reposo en Banneton',
    badge: 'Oficio Manual',
    description: 'Cada masa se pesa, bolea y tensiona a mano. Las hogazas reposan en canastos tradicionales de mimbre natural (bannetons).',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=900&auto=format&fit=crop',
    details: [
      'Tensión superficial precisa para lograr una greña abierta al hornear.',
      'Bloqueo de fermentación en cámara fría para fijar sabores.',
      'Sin maquinaria invasiva que rompa la estructura del alveolado.',
    ],
  },
  {
    stepNumber: 4,
    title: 'Horneado de Alta Precisión sobre Piedra',
    badge: 'Golpe de Vapor & Suela',
    description: 'Cocinamos sobre placa refractaria a 240°C inyectando vapor inicial para permitir la expansión máxima antes de caramelizar la corteza.',
    image: 'https://images.unsplash.com/photo-1597079910443-60c43fc4f749?q=80&w=900&auto=format&fit=crop',
    details: [
      'Corte de greña manual con navaja de panadero al momento de entrar.',
      'Corteza dorada y crujiente con notas tostadas de cereal.',
      'Enfriamiento en rejilla para que la humedad interna se asiente.',
    ],
  },
  {
    stepNumber: 5,
    title: 'Empaque Sostenible y Entrega Fresca',
    badge: 'Listo para la Mesa',
    description: 'El pan recién enfriado se resguarda en empaques que dejan respirar la costra, listos para tu recogida o envío el mismo día de horneado.',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=900&auto=format&fit=crop',
    details: [
      'Bolsas de papel kraft microperforado 100% compostables.',
      'Cajas selladas a mano con indicación de fecha y lote de horneado.',
      'Recomendaciones impresas de regeneración y corte en casa.',
    ],
  },
];

export const POLICIES_DATA: PolicyInfo[] = [
  {
    icon: 'clock',
    title: 'Anticipación de 24h a 48h',
    text: 'Como respetamos fermentaciones biológicas de hasta 2 días, los pedidos deben reservarse con al menos 24 a 48 horas de anticipación a la fecha deseada.',
    highlight: 'Cierre de pedidos diarios: 8:00 PM',
  },
  {
    icon: 'calendar',
    title: 'Días de Horneado Activo',
    text: 'Prendemos los hornos exclusivamente de Miércoles a Sábado para entregarte piezas que salieron del calor esa misma mañana.',
    highlight: 'Miércoles a Sábado (10:00 am - 5:00 pm)',
  },
  {
    icon: 'bread',
    title: 'Conservación en el Hogar',
    text: 'Nunca guardes pan de masa madre en bolsas plásticas ni en refrigerador. Mantenlo cortado hacia abajo en tabla de madera o en su bolsa de papel kraft.',
    highlight: 'Dura 4-6 días fresco | Apto para congelar en rebanadas',
  },
];