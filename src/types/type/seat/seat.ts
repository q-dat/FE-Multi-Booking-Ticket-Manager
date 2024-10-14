import { ISeatCatalog } from "../seat-catalog/seat-catalog";
export interface ISeat {
  _id: string;
  seat_catalog_id: ISeatCatalog;
  name: string;
  price: number;
  status: string;
  ordinal_numbers: number;
  des?: string;
  createAt: string;
  updateAt: string;
}
