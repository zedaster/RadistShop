import { Product } from "@/types/Product";
import { FavoriteRepository } from "@/resources/favorite/FavoriteRepository";

export class Favorites {
  private items: Array<number>;
  private readonly allProducts: Map<number, Product>;
  private readonly repository: FavoriteRepository;

  static async create(repository: FavoriteRepository, allProducts: Map<number, Product>) {
    const items = await repository.getFavoriteProducts();
    return new Favorites(items, allProducts, repository);
  }
  private constructor(items: Array<number>, allProducts: Map<number, Product>, repository: FavoriteRepository) {
    this.items = items;
    this.allProducts = allProducts;
    this.repository = repository;
  }

  async addFavoriteProduct(product: Product): Promise<void> {
    if (this.items.includes(product.id)) {
      throw new FavoriteProductExistsError(product);
    }
    const success = await this.repository.addFavoriteProduct(product);
    if (!success) {
      throw new FavoriteProductExistsError(product);
    }
    this.items.push(product.id);
  }

  async removeFavoriteProduct(product: Product): Promise<void> {
    if (!this.items.includes(product.id)) {
      throw new FavoriteProductDoesntExistError(product);
    }
    const success = await this.repository.removeFavoriteProduct(product);
    if (!success) {
      throw new FavoriteProductDoesntExistError(product);
    }
    this.items = this.items.filter((id) => id != product.id);
  }

  isFavoriteProduct(product: Product): boolean {
    console.log('fav items: ' + this.items);
    return this.items.includes(product.id);
  }

  getFavoriteProducts() : Array<Product> {
    return this.items.map((id) => this.allProducts.get(id)!);
  }
}

export abstract class FavoriteProductError extends Error {
  private readonly product: Product;

  protected constructor(message: string, product: Product) {
    super(message);
    this.product = product;
  }
}

export class FavoriteProductExistsError extends FavoriteProductError {
  constructor(product: Product) {
    super("The product already exists", product);
  }
}

export class FavoriteProductDoesntExistError extends FavoriteProductError {
  constructor(product: Product) {
    super("The product doesn't exist", product);
  }
}