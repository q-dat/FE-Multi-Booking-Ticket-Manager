import { IVehicle } from '../vehicle/vehicle';
export interface ISeatCatalog {
  _id: string;
  name: string;
  vehicle_id: IVehicle;
  createAt: string;
  updateAt: string;
}
