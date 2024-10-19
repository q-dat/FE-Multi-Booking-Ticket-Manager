import { IOrder } from '../order/order';
import { IPayment } from '../payment/payment';
import { IUser } from '../user/user';

export interface IBill {
  _id: string;
  orderId: IOrder;
  userId: IUser;
  paymentId: IPayment;
  amount: number;
  billingDate: string;
  createAt: string;
  updateAt: string;
}
