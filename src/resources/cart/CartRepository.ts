import { Product } from "@/types/Product";

export interface CartRepository {
  setProductCount(product: Product, count: number) : Promise<void>;
  getProductCounts() : Promise<Map<number, number>>;
}