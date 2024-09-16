import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReturnTicketPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="pb-[20px] xl:pt-[90px]">
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile={t('UserPage.ReturnTicketPage.title')}/>
      </div>
      {/* cột dưới */}
      <div className="w-full">
        <div className="h-auto">
          <h1 className="mb-2 text-center text-4xl font-bold text-primary">
          {t('UserPage.ReturnTicketPage.title')}
          </h1>
        </div>
        {/* khung */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10">
          <p className="ml-8 p-2 text-lg">
          {t('UserPage.ReturnTicketPage.notification1')}
          </p>
          <p className="ml-8 p-2 pt-0 text-lg">
            {' '}
            {t('UserPage.ReturnTicketPage.notification2')}
          </p>
        </div>
        {/* form */}
        <div className="my-5">
          <div className="flex flex-col items-center justify-center px-2 md:px-0 lg:gap-5">
            <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg border border-primary bg-white p-4 dark:bg-gray-700 md:w-auto">
              <p className="m-2 mb-4 text-xl font-bold text-black dark:text-white">
              {t('UserPage.ReturnTicketPage.titlefrom')}
              </p>
              <InputForm
                type="text"
                placeholder={`${t('UserPage.ReturnTicketPage.forminput1')}`}
                className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <InputForm
                type="text"
                placeholder={`${t('UserPage.ReturnTicketPage.forminput2')}`}
                className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <InputForm
                type="text"
                placeholder={`${t('UserPage.ReturnTicketPage.forminput3')}`}
                className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <Button
                className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
                size="md"
              >
                {t('UserPage.ReturnTicketPage.buttonform')}
              </Button>
              <Link to={''} className="ml-4 font-bold text-blue-700">
              {t('UserPage.ReturnTicketPage.linkform')}
              </Link>
            </div>
          </div>
        </div>
        {/* khung */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10">
          <p className="ml-8 p-2 text-lg">Chú Ý:</p>
          <p className="ml-8 p-2 text-lg">
            Chính sách vé và quy định đổi trả của
            <span className="mx-1 font-bold dark:text-gray-100">Công Ty</span>
            <span className="mx-1">
              <Link to={''}>Vào Đây</Link>
            </span>
          </p>
          <p className="ml-8 p-2 text-lg">
            Chính sách vé và quy định đổi trả của
            <span className="mx-1 font-bold dark:text-gray-100">Công Ty</span>
            <span className="mx-1">
              <Link to={''}>Vào Đây</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnTicketPage;

