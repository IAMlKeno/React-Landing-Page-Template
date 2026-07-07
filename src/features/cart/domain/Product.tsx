export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  isReservedPerDuration?: boolean;
  pricePerDuration?: number;
  [key: string]: any;
}
