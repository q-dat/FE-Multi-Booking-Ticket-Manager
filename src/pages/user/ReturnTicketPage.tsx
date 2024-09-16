import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ReturnTicketPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className='pt-[100px] xl:pt-[90px]'>
            {/* Mobile */}
            <div>
                <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
            </div>
            {/* cột dưới */}
            <div className=' w-[100%]  '>

                <div className=' h-auto'>
                    <h1 className='text-center font-bold text-4xl text-primary mb-2'>{t('UserPage.ReturnTicketPage.title')}</h1>

                </div>
                {/* khung */}
                <div className='bg-blue-200 h-auto border-2 border-blue-200  rounded-sm m-2  text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10'>
                    <p className='p-2 ml-8 text-lg'>{t('UserPage.ReturnTicketPage.NotificationTitle')}</p>
                    <p className='pt-0 p-2 ml-8 text-lg'>{t('UserPage.ReturnTicketPage.NotificationTitle2')}</p>
                </div>
                {/* form */}
                <div className=' h-auto'>
                    <div className="w-[60%] mx-auto text-center border border-blue-200  p-4 rounded-lg">
                        <p className="mb-4 text-xl font-bold m-2">{t('UserPage.ReturnTicketPage.titlefrom')}</p>
                        <InputForm
                            type="text"
                            placeholder={`${t('UserPage.ReturnTicketPage.forminput1')}`}
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full "
                        />
                        <InputForm
                            type="text"
                            placeholder={`${t('UserPage.ReturnTicketPage.forminput2')}`}
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <InputForm
                            type="text"
                            placeholder={`${t('UserPage.ReturnTicketPage.forminput3')}`}
                            className="border border-gray-300 p-2 mb-4 rounded-lg w-full"
                        />
                        <Button className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700" size="md">{t('UserPage.ReturnTicketPage.buttonform')}</Button>
                        <Link to={''} className=' ml-4  text-blue-700 font-bold'>{t('UserPage.ReturnTicketPage.linkform')}</Link>
                    </div>
                </div>
                {/* khung */}
                <div className='p-2 bg-blue-200 h-auto border-2 border-blue-200  rounded-sm m-2 text-start text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10'>
                    <p className='p-2 ml-8 text-lg'>Chú Ý:</p>
                    <p className='p-2 ml-8 text-lg'>Chính sách vé và quy định đổi trả của
                        <span className="mx-1 font-bold dark:text-gray-100">
                            Công Ty LacLacTrip
                        </span>
                        <span className="mx-1">
                            <Link to={''}>Vào Đây</Link>
                        </span>

                    </p>
                    <p className='p-2 ml-8 text-lg'>Chính sách vé và quy định đổi trả của
                        <span className="mx-1 font-bold dark:text-gray-100">
                            Công Ty LacLacTrip
                        </span>
                        <span className="mx-1">
                            <Link to={''}>Vào Đây</Link>
                        </span>

                    </p>
                </div>
            </div>
        </div>


    )
}

export default ReturnTicketPage;