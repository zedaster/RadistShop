import { Product } from "@/types/Product";

export class Cart {
  private items = new Map<number, number>();

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
  }

  incrementProductCount(product: Product) : void {
    if (!this.hasProduct(product)) {
      console.log('no product')
      this.items.set(product.id, 1);
    } else {
      console.log('there is product')
      this.items.set(product.id, this.items.get(product.id)! + 1)
    }
    console.log('increment Current total count: ' + this.count);
  }

  decrementProductCount(product: Product) : void {
    if (this.hasProduct(product)) {
      const currentCount = this.items.get(product.id)!;
      if (currentCount != 1) {
        this.items.set(product.id, currentCount - 1)
      } else {
        this.items.delete(product.id);
      }
    }
    console.log(' decrement Current total count: ' + this.count);
  }

  getProductCount(product: Product) : number {
    if (!this.items.has(product.id)) return 0;
    return this.items.get(product.id)!;
  }

  hasProduct(product: Product): boolean {
    return this.items.has(product.id);
  }
}
