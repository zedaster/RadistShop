import { Product } from "@/types/Product";
import { CartRepository } from "@/resources/cart/CartRepository";
import { CartLocalStorage } from "@/resources/cart/CartLocalStorage";

export class Cart {
  private static repository: CartRepository = new CartLocalStorage();

  public static async loadFromRepository() : Promise<Cart> {
    const itemMap = await Cart.repository.getProductCounts();
    return new Cart(itemMap);
  }

  private items = new Map<number, number>();

  private constructor(itemMap: Map<number, number>) {
    this.items = itemMap;
  }

  get count(): number {
    let count = 0;
    for (const itemCount of this.items.values()) {
      count += itemCount;
    }
    return count;
  }

  setProductCount(product: Product, count: number): void {
    if (count == 0 && this.items.has(product.id)) {
      this.items.delete(product.id);
    }
    this.items.set(product.id, count);
    Cart.repository.setProductCount(product, count);
  }

  incrementProductCount(product: Product) : void {
    if (!this.hasProduct(product)) {
      this.setProductCount(product, 1);
    } else {
      this.setProductCount(product, this.items.get(product.id)! + 1)
    }
  }

  decrementProductCount(product: Product) : void {
    if (this.hasProduct(product)) {
      const currentCount = this.items.get(product.id)!;
      this.setProductCount(product, currentCount - 1);
    }
  }

  getProductCount(product: Product) : number {
    if (!this.items.has(product.id)) return 0;
    return this.items.get(product.id)!;
  }

  hasProduct(product: Product): boolean {
    return this.items.has(product.id);
  }
}
