import axios from '../../config/axiosConfig';
import { IPayment, PaymentStatus } from '../../types/type/payment/payment';

export const getAllPaymentsApi = async (): Promise<IPayment[]> => {
  try {
    const response = await axios.get<{ payments: IPayment[] }>('/api/payments/all');
    return response.data.payments;
  } catch (error) {
    throw new Error('Failed to fetch payments');
  }
};

export const getPaymentByOrderIdApi = async (orderId: string): Promise<IPayment> => {
  if (!orderId) throw new Error('Order ID is required');
  try {
    const response = await axios.get<{ payment: IPayment }>(`/api/payments/order/${orderId}`);
    return response.data.payment;
  } catch (error) {
    throw new Error(`Failed to fetch payment for order ID ${orderId}`);
  }
};

export const createPaymentApi = async (payment: Partial<IPayment>): Promise<IPayment> => {
  try {
    const response = await axios.post<{ payment: IPayment }>('/api/payments', payment);
    return response.data.payment;
  } catch (error) {
    throw new Error('Failed to create payment');
  }
};

export const updatePaymentStatusApi = async (id: string, status: PaymentStatus): Promise<IPayment> => {
  if (!id) throw new Error('ID is required');
  if (!status) throw new Error('Status is required');

  try {
    const response = await axios.put<{ payment: IPayment }>(`/api/payments/${id}/status`, { status });
    return response.data.payment;
  } catch (error) {
    throw new Error(`Failed to update payment status for ID ${id}`);
  }
};

export const deletePaymentApi = async (id: string): Promise<void> => {
  if (!id) throw new Error('ID is required');

  try {
    await axios.delete(`/api/payments/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete payment with ID ${id}`);
  }
};
