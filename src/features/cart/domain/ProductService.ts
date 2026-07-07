import { Product } from "./Product";
import { ICart } from "./Cart";
import JsonData from "../../../data/data.json";

export interface PurchaseResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export interface ProductService {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  completePurchase(cart: ICart): Promise<PurchaseResult>;
}

/**
 * Reads products from the local data.json. Default until a real
 * payment platform (e.g. Stripe) implements ProductService instead.
 */
export class LocalProductService implements ProductService {
  async getProducts(): Promise<Product[]> {
    return JsonData.Products as Product[];
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  async completePurchase(_cart: ICart): Promise<PurchaseResult> {
    return { success: false, error: "Checkout is not available yet." };
  }
}

export const productService: ProductService = new LocalProductService();
