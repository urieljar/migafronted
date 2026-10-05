export interface ProductBase {
  id: string;
  name: string;
  basePrice: number;
  prepTime: string;
  image: string;
  description: string;
}

export interface OptionItem {
  id: string;
  name: string;
  extraPrice: number;
  description?: string;
}

export interface CustomOrderState {
  selectedBase: ProductBase | null;
  sizeOrPortions: string;
  sizeExtraPrice: number;
  flavorOrFlour: string;
  flavorExtraPrice: number;
  fillingOrAddon: string;
  fillingExtraPrice: number;
  toppingOrFrosting: string;
  toppingExtraPrice: number;
  dedicationText: string;
  deliveryDate: string;
  totalPrice: number;
}