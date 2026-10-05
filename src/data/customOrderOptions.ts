import type { ProductBase, OptionItem } from '../types/customOrder';

export const BASES_LIST: ProductBase[] = [
  {
    id: 'pastel-artesanal',
    name: 'Pastel Festivo de Celebración',
    basePrice: 480,
    prepTime: 'Requiere 48h de anticipación',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=900&auto=format&fit=crop',
    description: 'Bizcocho denso y jugoso elaborado con mantequilla de pastoreo y huevos de granja.',
  },
  {
    id: 'hogaza-familiar',
    name: 'Hogaza Sourdough Gigante (XXL)',
    basePrice: 220,
    prepTime: 'Requiere 48h de fermentación',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=900&auto=format&fit=crop',
    description: 'Pieza de 1.5kg con alveolado abierto y greñado artístico personalizado.',
  },
  {
    id: 'focaccia-gourmet',
    name: 'Focaccia Artesanal Familiar',
    basePrice: 260,
    prepTime: 'Requiere 24h a 48h de reposo',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=900&auto=format&fit=crop',
    description: 'Plancha entera esponjosa bañada en aceite de oliva extra virgen y sal en escamas.',
  },
  {
    id: 'tarta-rustica',
    name: 'Tarta Rústica de Frutas de Huerto',
    basePrice: 420,
    prepTime: 'Requiere 48h de anticipación',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=900&auto=format&fit=crop',
    description: 'Masa quebrada crujiente a base de harina de almendras y crema pastelera de vainilla pura.',
  },
];

export const SIZE_OPTIONS: OptionItem[] = [
  { id: 'size-m', name: 'Mediano (8 a 10 porciones)', extraPrice: 0 },
  { id: 'size-l', name: 'Familiar Grande (14 a 16 porciones)', extraPrice: 150 },
  { id: 'size-xl', name: 'Banquete (20 a 24 porciones)', extraPrice: 280 },
];

export const FLAVOR_OPTIONS: OptionItem[] = [
  { id: 'flv-vainilla', name: 'Vainilla Bourbon de Papantla', extraPrice: 0 },
  { id: 'flv-chocolate', name: 'Chocolate 70% Origen México', extraPrice: 40 },
  { id: 'flv-limon-semillas', name: 'Limón Amarillo & Semillas de Amapola', extraPrice: 30 },
  { id: 'flv-zanahoria-nueces', name: 'Zanahoria Especiada & Nueces Tostadas', extraPrice: 50 },
  { id: 'flv-centeno-hierbas', name: 'Masa Madre de Centeno & Romero (Panes)', extraPrice: 0 },
];

export const FILLING_OPTIONS: OptionItem[] = [
  { id: 'fil-ninguno', name: 'Sin relleno adicional / Tradicional', extraPrice: 0 },
  { id: 'fil-cajeta', name: 'Dulce de Leche Artesanal con Nuez', extraPrice: 45 },
  { id: 'fil-frutos-rojos', name: 'Mermelada Casera de Frutos del Bosque', extraPrice: 50 },
  { id: 'fil-ganache', name: 'Ganache Cremoso de Chocolate Oscuro', extraPrice: 60 },
  { id: 'fil-olivas-tomate', name: 'Olivas Kalamata & Jitomate Deshidratado (Salado)', extraPrice: 45 },
];

export const TOPPING_OPTIONS: OptionItem[] = [
  { id: 'top-buttercream', name: 'Buttercream Suizo Sedoso de Mantequilla', extraPrice: 0 },
  { id: 'top-fruta-fresca', name: 'Corona de Higos y Frutos Frescos de Temporada', extraPrice: 65 },
  { id: 'top-flores', name: 'Flores Comestibles de Huerto Orgánico', extraPrice: 55 },
  { id: 'top-greñado', name: 'Greñado de Espiga & Sal Marina en Escamas (Panes)', extraPrice: 0 },
];