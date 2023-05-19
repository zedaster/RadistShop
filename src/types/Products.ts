import axios from "axios";
import { Product } from "@/types/Product";

export class Products {
  public static async loadProduct(id: number): Promise<Product> {
    const resp = await axios
      .get<Product>(`https://fakestoreapi.com/products/${id}`);
    return resp.data;
  }

  public static async loadAllProducts() : Promise<Array<Product>> {
    const resp = await axios
      .get<Array<Product>>('https://fakestoreapi.com/products/');
    return resp.data;
  }

  public static async loadMapOfProducts() : Promise<Map<number, Product>> {
    const productsArray = await this.loadAllProducts();
    return new Map<number, Product>(productsArray.map(product => [product.id, product]));
  }

  public static async loadCategories() : Promise<Array<string>> {
    const resp = await axios
      .get<Array<string>>(`https://fakestoreapi.com/products/categories`);
    return resp.data;
  }
}