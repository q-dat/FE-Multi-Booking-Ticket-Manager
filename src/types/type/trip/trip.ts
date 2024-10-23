import { ILocation } from '../location/location';
import { IVehicleCatalog } from '../vehicle-catalog/vehicle-catalog';

export interface ITrip {
  _id: string;
  vehicle_catalog_id: IVehicleCatalog;
  departure_point: ILocation;
  destination_point: ILocation;
  price: number;
  departure_date: string;
  departure_time: string;
  return_date: string;
  return_time: string;
  createAt: string;
  updateAt: string;
}
