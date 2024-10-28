import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../config/axiosConfig';
import LogoAdmin from '../../assets/image-represent/payment/parcel_icon.svg';

interface Item {
  departureDate: Date;
  time: string;
  departurePoint: string;
  destinationPoint: string;
  seat: string;
  vehicle: string;
  seatCatalog: string;
  price: number;
  quantity: number;
}

interface Address {
  fullName: string;
  email: string;
  street: string;
  city: string;
  cccd: number;
  country: string;
  phone: string;
}

interface Order {
  _id: string;
  items: Item[];
  amount: number;
  address: Address;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post('/api/order/list', {});
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch orders');
    }
  };

  const statusHandler = async (event: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    try {
      const response = await axios.post('/api/order/status', { orderId, status: event.target.value });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <div>
        {
          orders.map((order) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={order._id}>
              <img src={LogoAdmin} className='w-12' alt='' />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <p className='py-0.5' key={index}>
                      {item.seat} x {item.seatCatalog} x {item.vehicle} x {item.quantity}
                      {index < order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.fullName}</p>
                <div>
                  <p>{order.address.street + ', ' + order.address.city + ', ' + order.address.country}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Số lượng: {order.items.length}</p>
                <p className='mt-3'>PTTT: {order.paymentMethod}</p>
                <p>Tình trạng: {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                <p>Ngày đặt: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{(order.amount * 1000).toLocaleString('vi-VN')} VNĐ</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.payment ? 'Đã nhận vé' : order.status}
                className='p-2 font-semibold'
                disabled={order.payment}
              >
                {!order.payment && (
                  <>
                    <option value='Đã đặt'>Đã đặt</option>
                    <option value='Đã nhận vé'>Đã nhận vé</option>
                  </>
                )}
                {order.payment && <option value='Đã nhận vé'>Đã nhận vé</option>}
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default OrderPage;
