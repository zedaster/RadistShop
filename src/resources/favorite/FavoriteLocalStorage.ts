import { FavoriteRepository } from "@/resources/favorite/FavoriteRepository";
import { Product } from "@/types/Product";

export class FavoriteLocalStorage implements FavoriteRepository {
  async addFavoriteProduct(product: Product): Promise<boolean> {
    const oldArray = await this.getFavoriteProducts();
    if (oldArray.includes(product.id)) {
      return false;
    }
    const newArray = [...oldArray];
    newArray.push(product.id);
    localStorage.setItem("favorite-product-ids", JSON.stringify(newArray));
    return true;
  }

  async removeFavoriteProduct(product: Product): Promise<boolean> {
    const oldArray = await this.getFavoriteProducts();
    const newArray = oldArray.filter(otherId => product.id != otherId);
    if (newArray.length == oldArray.length) {
      return false;
    }
    localStorage.setItem("favorite-product-ids", JSON.stringify(newArray));
    return true;
  }

  async getFavoriteProducts(): Promise<Array<number>> {
    const localIds = localStorage.getItem("favorite-product-ids");
    if (localIds == null) {
      return new Array<number>();
    } else {
      return JSON.parse(localIds);
    }
  }
}