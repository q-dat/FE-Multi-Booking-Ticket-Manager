import React, { useState, useEffect } from 'react';
import { OrderItem } from '../../../types/type/order/orderItem';
import { useLocation } from 'react-router-dom';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import axios from '../../../config/axiosConfig';
import { Toastify } from '../../../helper/Toastify';
import { isIErrorResponse } from '../../../types/error/error';

interface Order {
  items: OrderItem[];
  payment: boolean;
}

const BillResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const order = location.state?.order as Order;

  const orderId = order ? order.items[0].ticketCode : '';
  const localStorageKey = `orderState-${orderId}`;

  const savedOrder = localStorage.getItem(localStorageKey);
  const initialOrderState = savedOrder ? JSON.parse(savedOrder) : order;

  const [orderState, setOrderState] = useState<Order>(initialOrderState);
  const [selectedTickets, setSelectedTickets] = useState<Set<number>>(
    new Set()
  );
  const [refundReason, setRefundReason] = useState<string>('');

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedTickets = new Set(selectedTickets);
    if (updatedSelectedTickets.has(index)) {
      updatedSelectedTickets.delete(index);
    } else {
      updatedSelectedTickets.add(index);
    }
    setSelectedTickets(updatedSelectedTickets);
  };

  const handleReturnTickets = async () => {
    const ticketCodes = [...selectedTickets].map(
      index => orderState.items[index].ticketCode
    );

    if (ticketCodes.length === 0 || !refundReason) {
      Toastify('Vui lòng chọn vé và nhập lý do hoàn trả.', 400);
      return;
    }

    try {
      const response = await axios.post('/api/order/refund', {
        ticketCodes,
        reason: refundReason
      });

      if (response.data.success) {
        const updatedOrder = { ...orderState };
        updatedOrder.items.forEach((item, index) => {
          if (selectedTickets.has(index)) {
            item.status = 'Đã hoàn vé';
          }
        });

        setOrderState(updatedOrder);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedOrder));

        Toastify('Hoàn trả vé thành công!', 201);
        setSelectedTickets(new Set());
        setRefundReason('');
      } else {
        Toastify(response.data.message, 400);
      }
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Vé đã được hoàn trả hoặc hết thời gian hoàn trả.';
      Toastify(`${errorMessage}`, 500);
    }
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(orderState));
  }, [orderState, localStorageKey]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(localStorageKey);
    };
  }, [localStorageKey]);

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.CheckTicket')} />
      <div className="flex flex-col items-center justify-center px-2">
        {orderState && (
          <div className="my-5 w-full max-w-2xl rounded-lg border border-gray-300 bg-white p-8 shadow-lg dark:bg-gray-800 dark:text-white">
            <h2 className="mb-6 text-center text-3xl font-bold text-primary dark:text-white">
              Thông tin vé
            </h2>
            {/* Ticket Details */}
            {orderState.items.map((item, index) => (
              <div key={index} className="mb-6 border-b border-gray-200 pb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Họ và tên:</span>
                    <span>{item.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Đối tượng:</span>
                    <span>{item.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Ngày đi:</span>
                    <span>
                      {new Date(item.departureDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Giờ đi:</span>
                    <span>{item.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Điểm đi:</span>
                    <span>{item.departurePoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Điểm đến:</span>
                    <span>{item.destinationPoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Phương tiện:</span>
                    <span>{item.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Toa/Khoang:</span>
                    <span>{item.seatCatalog}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Ghế:</span>
                    <span>{item.seat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Mã vé:</span>
                    <span>{item.ticketCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Giá vé:</span>
                    <span>
                      {(item.price * 1000).toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Trạng thái vé:</span>
                    <span>{item.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Chọn để hoàn trả vé:</span>
                    <input
                      type="checkbox"
                      checked={selectedTickets.has(index)}
                      onChange={() => handleCheckboxChange(index)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="mb-6 border-b border-gray-200 pb-4">
              <div className="mt-2 flex justify-between text-lg font-bold">
                <span>Tình trạng thanh toán:</span>
                <span>
                  {orderState.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
              </div>
            </div>

            {/* Refund Reason */}
            <div className="mb-6">
              <label htmlFor="refundReason" className="font-semibold">
                Lý do hoàn trả
              </label>
              <textarea
                id="refundReason"
                value={refundReason}
                onChange={e => setRefundReason(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded border border-gray-300 p-2"
              />
            </div>

            {/* Return Button */}
            {selectedTickets.size > 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleReturnTickets}
                  className="w-full rounded-md bg-primary py-2 text-white"
                >
                  Trả vé
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Cảm ơn quý khách đã đặt vé tại hệ thống của chúng tôi!</p>
              <p>Chúc quý khách có một chuyến đi an toàn và thuận lợi.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillResultsPage;
