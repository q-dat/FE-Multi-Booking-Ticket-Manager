import React, { useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from '../../config/axiosConfig';
import { Toastify } from '../../helper/Toastify';
import { isIErrorResponse } from '../../types/error/error';

const ReturnTicketPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [ticketCode, setTicketCode] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ticketCodes = [ticketCode];

    try {
      const response = await axios.post('/api/order/refund', {
        ticketCodes,
        reason
      });

      if (response.data.success) {
        Toastify('Hoàn vé thành công', 201);
        navigate('/');
      } else {
        Toastify(response.data.message || 'Lỗi không xác định', 500);
      }
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Vé đã được trả hoặc sai mã vé';
      Toastify(`${errorMessage}`, 500);
    }
  };

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <HeaderResponsive
        Title_NavbarMobile={t('UserPage.ReturnTicketPage.title')}
      />
      {/*  */}
      <div className="w-full">
        <div className="my-4 text-center">
          <h1 className="text-2xl font-bold uppercase text-black dark:text-white">
            {t('UserPage.ReturnTicketPage.title')}
          </h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <div className="flex flex-col items-center justify-center px-2 md:px-0 lg:gap-5">
              <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg border border-primary bg-white p-4 md:w-auto">
                <p className="m-2 mb-4 text-xl font-light text-black">
                  {t('UserPage.ReturnTicketPage.titlefrom')}
                </p>
                <InputForm
                  type="text"
                  value={ticketCode}
                  onChange={e => setTicketCode(e.target.value)}
                  placeholder={`${t('UserPage.ReturnTicketPage.forminput1')}`}
                  className="border border-gray-300 bg-white text-black focus:border-primary xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                  classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                />
                <InputForm
                  type="text"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder={t('UserPage.ReturnTicketPage.forminput4')}
                  className="border border-gray-300 bg-white text-black focus:border-primary xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                  classNameLabel="bg-white dark:peer-placeholder-shown:text-black dark:peer-focus:text-black"
                />
                <Button
                  className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
                  size="md"
                >
                  {t('UserPage.ReturnTicketPage.buttonform')}
                </Button>
                {/*  */}
                <div className="w-full text-end">
                  <Link
                    to=""
                    className="font-bold text-blue-700 underline dark:text-white"
                  >
                    {t('UserPage.ReturnTicketPage.linkform')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* Notification */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 xl:px-10">
          <p className="ml-8 p-2 text-lg">
            {t('UserPage.ReturnTicketPage.notification1')}
          </p>
          <p className="ml-8 p-2 pt-0 text-lg">
            {' '}
            {t('UserPage.ReturnTicketPage.notification2')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnTicketPage;
