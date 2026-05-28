import JsonData from "../../../data/data.json";

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  isReservedPerDuration?: boolean;
  pricePerDuration?: number;
  [key: string]: any;
}

export function getAllProducts(): Product[] {
  const data: Product[] = JsonData.Products;
  return data;
}
