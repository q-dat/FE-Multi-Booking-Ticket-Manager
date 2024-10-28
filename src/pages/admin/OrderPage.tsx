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
                <p><span className='mt-3 mb-2 font-medium'>Số điện thoại: </span>{order.address.phone}</p>
              </div>
              <div>
                <p><span className='mt-3 mb-2 font-medium'>Số lượng:</span> {order.items.length}</p>
                <p><span className='mt-3 mb-2 font-medium'>PTTT:</span> {order.paymentMethod}</p>
                <p><span className='mt-3 mb-2 font-medium'>Ngày đặt:</span> {new Date(order.date).toLocaleDateString()}</p>
                <p><span className='mt-3 mb-2 font-medium'>Địa chỉ:</span> {order.address.street + ', ' + order.address.city + ', ' + order.address.country}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{(order.amount * 1000).toLocaleString('vi-VN')} VNĐ</p>
              <p><span className='mt-3 mb-2 font-medium'>Tình trạng:</span> {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default OrderPage;
