import axios, { type AxiosInstance } from "axios";
import { Product } from "../../domain/Product";
import type { IProductDto } from "../interfaces/IProductDto.interface";
import type { IProductListDto } from "../interfaces/IProductListDto.interface";
import { mapListToProduct } from "../adapters/ProductListAdapter";
import { mapDetailToProduct } from "../adapters/ProductDetailAdapter";
import {
  extractLicenseData,
  type LicenseData,
} from "../utils/productAdapterUtils";

// Pliki XML Wolnych Lektur nie mają nagłówków CORS, więc w przeglądarce
// pobieramy je przez proxy z tej samej domeny (vite.config.ts w dev, vercel.json na produkcji)
const WL_XML_URL = "https://wolnelektury.pl/media/book/xml/";
const XML_PROXY_PATH = "/wl-xml/";

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
      const licenseData = await this.getLicenseData(res.data.xml);
      return mapDetailToProduct(res.data, licenseData);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  // Pobiera tylko początek pliku XML - nagłówek z licencją mieści się w kilku KB
  private async getLicenseData(xmlUrl?: string): Promise<LicenseData | undefined> {
    if (!xmlUrl) return undefined;

    try {
      const res = await axios.get<string>(xmlUrl.replace(WL_XML_URL, XML_PROXY_PATH), {
        headers: { Range: "bytes=0-16383" },
        responseType: "text",
      });
      return extractLicenseData(res.data);
    } catch (error) {
      console.error(`Error fetching license from ${xmlUrl}:`, error);
      return undefined;
    }
  }
}
