import { CartRepository } from "@/resources/cart/CartRepository";
import { Product } from "@/types/Product";

export class CartLocalStorage implements CartRepository {
  async getProductCounts(): Promise<Map<number, number>> {
    const json = localStorage.getItem('cart');
    if (json == null) {
      return new Map<number, number>();
    } else {
      return new Map<number, number>(JSON.parse(json));
    }
  }

  async setProductCount(product: Product, count: number): Promise<void> {
    const productCounts = await this.getProductCounts();
    if (count == 0) {
      if (productCounts.has(product.id)) {
        productCounts.delete(product.id);
      }
    } else {
      productCounts.set(product.id, count);
    }
    localStorage.setItem('cart', JSON.stringify(Array.from(productCounts.entries())));
  }

}