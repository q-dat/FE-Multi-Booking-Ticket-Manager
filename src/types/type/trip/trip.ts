import { ILocation } from '../location/location';
import { IVehicle } from '../vehicle/vehicle';

export interface ITrip {
  _id: string;
  vehicle_id:IVehicle;
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
