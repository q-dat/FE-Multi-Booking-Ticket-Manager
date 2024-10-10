import { IVehicle } from '../vehicle/vehicle';

export interface ISeatCatalog {
  _id: string;
  vehicle_id: IVehicle;
  name: string;
  createAt: string;
  updateAt: string;
}
