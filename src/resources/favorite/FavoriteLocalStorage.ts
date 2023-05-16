import { FavoriteRepository } from "@/resources/favorite/FavoriteRepository";
import { Product } from "@/types/Product";

export class FavoriteLocalStorage implements FavoriteRepository {
  private favoriteProductIds = FavoriteLocalStorage.loadFavoriteProductIds();

  private static loadFavoriteProductIds(): Array<number> {
    const localIds = localStorage.getItem("favorite-product-ids");
    if (localIds == null) {
      return new Array<number>();
    } else {
      return JSON.parse(localIds);
    }
  }

  async addFavoriteProduct(product: Product): Promise<boolean> {
    if (await this.isFavoriteProduct(product)) {
      return false;
    }
    this.favoriteProductIds.push(product.id);
    localStorage.setItem("favorite-product-ids", JSON.stringify(this.favoriteProductIds));
    return true;
  }

  async removeFavoriteProduct(product: Product): Promise<boolean> {
    const newArray = this.favoriteProductIds.filter(otherId => product.id != otherId);
    if (newArray.length == this.favoriteProductIds.length) {
      return false;
    }
    this.favoriteProductIds = newArray;
    localStorage.setItem("favorite-product-ids", JSON.stringify(newArray));
    return true;
  }

  async isFavoriteProduct(product: Product): Promise<boolean> {
    return this.favoriteProductIds.includes(product.id);
  }
}