import { Product } from "@/types/Product";
import { CartRepository } from "@/resources/cart/CartRepository";

export class Cart {
  private readonly items: Map<number, number>;
  private readonly allProducts: Map<number, Product>;
  private readonly repository: CartRepository;
  private amount: number;

  static async create(repository: CartRepository, allProducts: Map<number, Product>): Promise<Cart> {
    const items = await repository.getProductCounts();
    return new Cart(items, allProducts, repository);
  }

  private constructor(itemMap: Map<number, number>, allProducts: Map<number, Product>, repository: CartRepository) {
    this.items = itemMap;
    this.allProducts = allProducts;
    this.repository = repository;
    this.amount = 0;
    for (const [product, count] of this.getAllProducts()) {
      this.amount = Math.round((this.amount + product.price * count) * 100) / 100;
    }
  }

  get count(): number {
    let count = 0;
    for (const itemCount of this.items.values()) {
      count += itemCount;
    }
    return count;
  }

  get totalAmount(): number {
    return this.amount;
  }

  async setProductCount(product: Product, count: number): Promise<void> {
    const currentCount = this.items.get(product.id) ?? 0;
    this.amount = Math.round((this.amount + product.price * (count - currentCount)) * 100) / 100;
    if (count == 0) {
      this.items.delete(product.id);
    } else {
      this.items.set(product.id, count);
    }

    await this.repository.setProductCount(product, count);
  }

  async incrementProductCount(product: Product): Promise<void> {
    if (!this.hasProduct(product)) {
      await this.setProductCount(product, 1);
    } else {
      await this.setProductCount(product, this.items.get(product.id)! + 1);
    }
  }

  async decrementProductCount(product: Product): Promise<void> {
    if (this.hasProduct(product)) {
      const currentCount = this.items.get(product.id)!;
      await this.setProductCount(product, currentCount - 1);
    }
  }

  getProductCount(product: Product): number {
    if (!this.items.has(product.id)) return 0;
    return this.items.get(product.id)!;
  }

  hasProduct(product: Product): boolean {
    return this.items.has(product.id);
  }

  getAllProducts(): Map<Product, number> {
    const resultMap = new Map<Product, number>();
    const allProducts = this.allProducts;
    console.log(this.items);
    for (const [id, count] of this.items) {
      console.log(`id ${id} count ${count}`);
      resultMap.set(this.allProducts.get(id)!, count);
    }
    console.log(resultMap);
    return resultMap;
  }
}
