import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Toastify } from '../../helper/Toastify';
import { LogoOrder } from '../../assets/image-represent';

interface Item {
  departureDate: Date;
  destinationDate: Date;
  ticketCatalog: string;
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
  console.log(orders);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post('/api/order/list', {});
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        Toastify(response.data.message, 500);
      }
    } catch (error) {
      console.error(error);
      Toastify('Failed to fetch orders', 500);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Đơn vé" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Đơn Vé"
          Btn_Create={
            ""
          }
        />
        {
          orders.map((order) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={order._id}>
              <img src={LogoOrder} className='w-12' alt='' />
              <div>
                <div>
                  {order.items.map((item, index) => (
                    <div className='py-0.5' key={index}>
                      <p>{item.seat} x {item.vehicle} x {item.quantity}</p>
                      <p><span className='mt-3 mb-2 font-medium'>Loại vé:</span> {item.ticketCatalog}</p>
                      {index < order.items.length - 1 && ','}
                    </div>
                  ))}
                </div>
                <p><span className='mt-3 mb-2 font-medium'>Họ và tên:</span> {order.address.fullName}</p>
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
