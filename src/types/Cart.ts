import { CartItem } from "@/types/CartItem";

export class Cart {
  items: CartItem[];

  constructor(items: CartItem[]) {
    this.items = items;
  }
}
