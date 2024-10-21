import { IUser } from '../user/user';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface IPayment {
  _id: string;
  orderId: string;
  userId: IUser;
  amount: number;
  method: string;
  paymentDate: string;
  status: PaymentStatus;
  createAt: string;
  updateAt: string;
}

export const isValidPaymentStatus = (
  status: string
): status is PaymentStatus => {
  return Object.values(PaymentStatus).includes(status as PaymentStatus);
};
