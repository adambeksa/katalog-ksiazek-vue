import axios, { type AxiosInstance } from "axios";
import { Product } from "../../domain/Product";
import type { IProductDto } from "../interfaces/IProductDto.interface";
import type { IProductListDto } from "../interfaces/IProductListDto.interface";
import { mapListToProduct } from "../adapters/ProductListAdapter";
import { mapDetailToProduct } from "../adapters/ProductDetailAdapter";

export class ProductApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://wolnelektury.pl/api",
    });
  }

  async getAll(): Promise<Product[]> {
    try {
      const res = await this.client.get<IProductListDto[]>("/books");
      return res.data.map((item: IProductListDto) => mapListToProduct(item));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getById(id: string): Promise<Product | null> {
    try {
      const res = await this.client.get<IProductDto>(`/books/${id}`);
      return mapDetailToProduct(res.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }
}
