export type CategoryType =
  | 'todos'
  | 'panaderia'
  | 'pasteles'
  | 'galletas'
  | 'postres'
  | 'boxes'
  | 'temporada';

export type DietaryTag =
  | 'vegano'
  | 'sin-gluten'
  | 'masa-madre'
  | 'sin-azucar';

export type SortOption =
  | 'relevancia'
  | 'precio-asc'
  | 'precio-desc'
  | 'nombre-asc';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  prepTime: string;
  packInfo?: string;
  description: string;
  image: string;
  dietaryTags?: DietaryTag[];
  isSeasonal?: boolean;
}

export interface FilterState {
  category: CategoryType;
  maxPrice: number;
  dietary: DietaryTag[];
  searchQuery: string;
  sortBy: SortOption;
}