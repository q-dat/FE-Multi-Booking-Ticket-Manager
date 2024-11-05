import React, { useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { useTranslation } from 'react-i18next';
import axios from '../../config/axiosConfig';
import { OrderItem } from '../../types/type/order/orderItem';
import { useNavigate } from 'react-router-dom';

interface Order {
  items: OrderItem[];
}

const CheckTicketPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ticketCode, setTicketCode] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCccd] = useState('');
  const [, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const handleCheckTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get('api/order/ticket/:ticketCode', {
        params: {
          ticketCode,
          phone,
          cccd
        }
      });
      setOrder(response.data.order);
      navigate('/bill-results', { state: { order: response.data.order } });
      setError('');
    } catch (err) {
      setOrder(null);
      setError('Vui lòng nhập đúng thông tin!!!');
    }
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.CheckTicket')} />
      <div className="w-full">
        {/*  */}
        <div className="my-4 text-center">
          <h1 className="text-2xl font-bold uppercase text-black dark:text-white">
            {t('UserPage.CheckTicketPage.NotificationTitle')}
          </h1>
        </div>
        {/* Form */}
        <form onSubmit={handleCheckTicket}>
          <div className="my-5">
            <div className="flex flex-col items-center justify-center px-2 md:px-0 lg:gap-5">
              <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg border border-primary bg-white p-4 dark:bg-gray-700 md:w-auto">
                <p className="m-2 mb-4 text-xl font-light text-black dark:text-white">
                  {t('UserPage.CheckTicketPage.title')}
                </p>
                <InputForm
                  type="text"
                  placeholder={`${t('UserPage.CheckTicketPage.SearchTicketCode')}`}
                  value={ticketCode}
                  onChange={e => setTicketCode(e.target.value)}
                  className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                  classNameLabel="bg-white dark:bg-gray-700"
                />
                <InputForm
                  type="text"
                  placeholder={`${t('UserPage.CheckTicketPage.SearchPhone')}`}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                  classNameLabel="bg-white dark:bg-gray-700"
                />
                <InputForm
                  type="text"
                  placeholder={`${t('UserPage.CheckTicketPage.SearchCCCD')}`}
                  value={cccd}
                  onChange={e => setCccd(e.target.value)}
                  className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                  classNameLabel="bg-white dark:bg-gray-700"
                />
                {/* Hiển thị thông báo lỗi nếu có */}
                {error && (
                  <div className="text-red-600">
                    <p>{error}</p>
                  </div>
                )}
                <Button
                  className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
                  size="md"
                >
                  {t('UserPage.ReturnTicketPage.buttonform')}
                </Button>
              </div>
            </div>
          </div>
        </form>
        {/* Notification */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 dark:bg-gray-700 dark:text-white xl:px-10">
          <p className="mb-4 text-lg">
            {t('UserPage.CheckTicketPage.NotificationOne')}
          </p>
          <p className="text-lg">
            {t('UserPage.CheckTicketPage.NotificationTwo')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckTicketPage;
