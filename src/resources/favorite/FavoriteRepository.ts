import { Product } from "@/types/Product";

export interface FavoriteRepository {
  addFavoriteProduct(product: Product) : Promise<boolean>;
  removeFavoriteProduct(product: Product) : Promise<boolean>;
  isFavoriteProduct(product: Product) : Promise<boolean>;
}