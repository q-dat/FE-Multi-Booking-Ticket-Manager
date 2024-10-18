import axios from '../../config/axiosConfig';
import { IBill } from '../../types/type/bill/bill';

export const getAllBillsApi = async (): Promise<IBill[]> => {
  try {
    const response = await axios.get<{ bills: IBill[] }>('/api/bills/all');
    return response.data.bills;
  } catch (error) {
    throw new Error('Lấy hóa đơn thất bại');
  }
};

export const getBillByOrderIdApi = async (orderId: string): Promise<IBill> => {
  if (!orderId) throw new Error('Thiếu Order ID');
  try {
    const response = await axios.get<{ bill: IBill }>(`/api/bills/order/${orderId}`);
    return response.data.bill;
  } catch (error) {
    throw new Error(`Lấy hóa đơn theo Order ID ${orderId} thất bại`);
  }
};

export const getBillByIdApi = async (id: string): Promise<IBill> => {
  if (!id) throw new Error('Thiếu ID hóa đơn');
  try {
    const response = await axios.get<{ bill: IBill }>(`/api/bills/${id}`);
    return response.data.bill;
  } catch (error) {
    throw new Error(`Lấy hóa đơn với ID ${id} thất bại`);
  }
};

export const createBillApi = async (bill: Partial<IBill>): Promise<IBill> => {
  try {
    const response = await axios.post<{ bill: IBill }>('/api/bills', bill);
    return response.data.bill;
  } catch (error) {
    throw new Error('Tạo hóa đơn thất bại');
  }
};

export const updateBillApi = async (id: string, bill: Partial<IBill>): Promise<IBill> => {
  if (!id) throw new Error('Thiếu ID hóa đơn');

  try {
    const response = await axios.put<{ bill: IBill }>(`/api/bills/${id}`, bill);
    return response.data.bill;
  } catch (error) {
    throw new Error(`Cập nhật hóa đơn với ID ${id} thất bại`);
  }
};

export const deleteBillApi = async (id: string): Promise<void> => {
  if (!id) throw new Error('Thiếu ID hóa đơn');

  try {
    await axios.delete(`/api/bills/${id}`);
  } catch (error) {
    throw new Error(`Xóa hóa đơn với ID ${id} thất bại`);
  }
};
