import { IUser } from "../user/user";

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
}

export interface IOrder {
  _id: string;
  userId: IUser;
  vehicleType: string;
  vehicleId: string;
  route: {
    startLocation: string;
    endLocation: string;
  };
  travelDate: string;
  seatNumber: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createAt: string;
  updateAt: string;
}

export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return Object.values(OrderStatus).includes(status as OrderStatus);
};
