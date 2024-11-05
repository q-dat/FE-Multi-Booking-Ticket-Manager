import React from 'react'
import { OrderItem } from '../../../types/type/order/orderItem';
import { useLocation } from 'react-router-dom';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';

interface Order {
  items: OrderItem[];
}

const BillResultsPage: React.FC = () => {

  const { t } = useTranslation();
  const location = useLocation();
  const order = location.state?.order as Order;

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.CheckTicket')} />
      <div className='px-2'>
        {order && (
          <div className="w-full max-w-2xl rounded-lg border border-gray-300 bg-white p-8 shadow-lg dark:bg-gray-800 dark:text-white my-5">
            <h2 className="mb-6 text-center text-3xl font-bold text-primary dark:text-white">Thông tin vé</h2>
            {/* Ticket Details */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Loại vé:</span>
                  <span>{order.items[0].ticketCatalog}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ngày đi:</span>
                  <span>{new Date(order.items[0].departureDate).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ngày về:</span>
                  <span>{new Date(order.items[0].destinationDate).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Giờ đi:</span>
                  <span>{order.items[0].departureTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Giờ về:</span>
                  <span>{order.items[0].returnTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Điểm đi:</span>
                  <span>{order.items[0].departurePoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Điểm đến:</span>
                  <span>{order.items[0].destinationPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ghế:</span>
                  <span>{order.items[0].seat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Toa/Khoang:</span>
                  <span>{order.items[0].seatCatalog}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Phương tiện:</span>
                  <span>{order.items[0].vehicle}</span>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="mb-6 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-lg font-bold mt-2">
                <span>Giá vé:</span>
                <span>{(order.items[0].price * 1000 * order.items[0].quantity).toLocaleString('vi-VN')} VNĐ</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Cảm ơn quý khách đã đặt vé tại hệ thống của chúng tôi!</p>
              <p>Chúc quý khách có một chuyến đi an toàn và thuận lợi.</p>
            </div>
          </div>
        )}
      </div>
    </div>


  )
}

export default BillResultsPage
