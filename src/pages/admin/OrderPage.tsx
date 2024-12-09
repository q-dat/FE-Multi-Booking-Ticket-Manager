import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Toastify } from '../../helper/Toastify';
import { LogoOrder } from '../../assets/image-represent';
import { Address, OrderItem } from '../../types/type/order/orderItem';

interface Order {
  _id: string;
  items: OrderItem[];
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
        <NavtitleAdmin Title_NavtitleAdmin="Quản Lý Đơn Vé" Btn_Create={''} />
        {orders.map(order => (
          <div
            className="my-3 grid grid-cols-1 items-start gap-3 border-2 border-gray-200 p-5 text-xs text-gray-700 sm:grid-cols-[0.5fr_2fr_1fr] sm:text-sm md:my-4 md:p-8 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]"
            key={order._id}
          >
            <img src={LogoOrder} className="w-12" alt="" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p>
                      {item.seat} x {item.vehicle} x {item.quantity}
                    </p>
                    <p>
                      <strong>Họ và tên:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Đối tượng:</strong> {item.discount}
                    </p>
                    <p>
                      <strong>Loại vé:</strong> {item.ticketCatalog}
                    </p>
                    <p>
                      <strong>Mã vé: </strong>
                      {item.ticketCode}
                    </p>
                    <p>
                      <strong>Trạng thái vé: </strong>
                      {item.status}
                    </p>
                    {index < order.items.length - 1 && ','}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>
                <strong>Số lượng:</strong> {order.items.length}
              </p>
              <p>
                <strong>PTTT:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Ngày đặt:</strong>{' '}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Họ và tên:</strong> {order.address.fullName}
              </p>
              <p>
                <strong>Số điện thoại: </strong>
                {order.address.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong>{' '}
                {order.address.street +
                  ', ' +
                  order.address.city +
                  ', ' +
                  order.address.country}
              </p>
            </div>
            <p className="text-sm text-red-600 sm:text-[15px]">
              {(order.amount * 1000).toLocaleString('vi-VN')} VNĐ
            </p>
            <p>
              <strong>Tình trạng:</strong>{' '}
              {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
