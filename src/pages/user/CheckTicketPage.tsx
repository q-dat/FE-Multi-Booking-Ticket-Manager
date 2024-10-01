import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { useTranslation } from 'react-i18next';

const CheckTicketPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <HeaderResponsive Title_NavbarMobile="Kiểm Tra Vé" />
      <div className="w-full">
        {/*  */}
        <div className="my-4 text-center">
          <h1 className="text-2xl font-bold uppercase text-black dark:text-white">
            {t('UserPage.CheckTicketPage.NotificationTitle')}
          </h1>
        </div>
        {/* Form */}
        <form>
          <div className="my-5 flex w-full flex-col items-center justify-center px-2">
            <div className="flex w-full flex-col items-center justify-center rounded-lg border border-primary bg-white p-4 dark:bg-gray-700 md:w-auto">
              <div className="flex flex-col lg:flex-row lg:gap-5">
                <div className="mb-4 flex flex-col gap-4">
                  <InputForm
                    type="text"
                    placeholder={`${t('UserPage.CheckTicketPage.SearchTicketCode')}`}
                    className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                    classNameLabel="bg-white dark:bg-gray-700"
                  />
                  <InputForm
                    type="text"
                    placeholder={`${t('UserPage.CheckTicketPage.SearchTrainCode')}`}
                    className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                    classNameLabel="bg-white dark:bg-gray-700"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-4">
                  <InputForm
                    type="text"
                    placeholder={`${t('UserPage.CheckTicketPage.SearchDepartureStation')}`}
                    className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                    classNameLabel="bg-white dark:bg-gray-700"
                  />
                  <InputForm
                    type="text"
                    placeholder={`${t('UserPage.CheckTicketPage.SearchArrivalStation')}`}
                    className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                    classNameLabel="bg-white dark:bg-gray-700"
                  />
                </div>
                <div className="mb-4 flex flex-col gap-4">
                  <InputForm
                    type="text"
                    placeholder={`${t('UserPage.CheckTicketPage.SearchDepartureDate')}`}
                    className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                    classNameLabel="bg-white dark:bg-gray-700"
                  />
                  <InputForm
                    type="text"
                    placeholder={`${t('UserPage.CheckTicketPage.SearchDocumentNumber')}`}
                    className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                    classNameLabel="bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <Button
                className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
                size="md"
              >
                {t('UserPage.CheckTicketPage.SearchCheck')}
              </Button>
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
