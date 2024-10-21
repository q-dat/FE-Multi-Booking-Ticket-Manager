import axios from '../../config/axiosConfig';
import { IOrder, OrderStatus } from '../../types/type/order/order';

export const getAllOrdersApi = async (): Promise<IOrder[]> => {
  try {
    const response = await axios.get<{ orders: IOrder[] }>('/api/orders/all');
    return response.data.orders;
  } catch (error) {
    throw new Error('Failed to fetch orders');
  }
};

export const getOrderByIdApi = async (id: string): Promise<IOrder> => {
  if (!id) throw new Error('ID is required');
  try {
    const response = await axios.get<{ order: IOrder }>(`/api/orders/${id}`);
    return response.data.order;
  } catch (error) {
    throw new Error(`Failed to fetch order with ID ${id}`);
  }
};

export const createOrderApi = async (
  order: Partial<IOrder>
): Promise<IOrder> => {
  try {
    const response = await axios.post<{ order: IOrder }>('/api/orders', order);
    return response.data.order;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

export const updateOrderStatusApi = async (
  id: string,
  status: OrderStatus
): Promise<IOrder> => {
  if (!id) throw new Error('ID is required');
  if (!status) throw new Error('Status is required');

  try {
    const response = await axios.put<{ order: IOrder }>(
      `/api/orders/${id}/status`,
      { status }
    );
    return response.data.order;
  } catch (error) {
    throw new Error(`Failed to update order status for ID ${id}`);
  }
};

export const deleteOrderApi = async (id: string): Promise<void> => {
  if (!id) throw new Error('ID is required');

  try {
    await axios.delete(`/api/orders/${id}`);
  } catch (error) {
    throw new Error(`Failed to delete order with ID ${id}`);
  }
};
