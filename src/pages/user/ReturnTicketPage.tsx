import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

const ReturnTicketPage: React.FC = () => {
  return (
    <div className="pb-[20px] xl:pt-[90px]">
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* cột dưới */}
      <div className="w-full">
        <div className="h-auto">
          <h1 className="mb-2 text-center text-4xl font-bold text-primary">
            Trả vé
          </h1>
        </div>
        {/* khung */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10">
          <p className="ml-8 p-2 text-lg">
            Trả vé chỉ áp dụng với trường hợp khách hàng đã thanh toán trực
            tuyến (qua cổng thanh toán, ví điện tử, app ngân hàng) và có điền
            mail khi mua vé.
          </p>
          <p className="ml-8 p-2 pt-0 text-lg">
            {' '}
            Nếu quý khách thanh toán bằng tiền mặt, trả sau qua ứng dụng ngân
            hàng và atm, chuyển khoản hoặc trả vé khi có sự cố bãi bỏ vé vui
            lòng thực hiện thủ tục tại các quầy bán vé.
          </p>
        </div>
        {/* form */}
        <div className="my-5">
          <div className="flex flex-col items-center justify-center px-2 md:px-0 lg:gap-5">
            <div className="flex w-full flex-col items-center justify-center gap-5 rounded-lg border border-primary bg-white p-4 dark:bg-gray-700 md:w-auto">
              <p className="m-2 mb-4 text-xl font-bold text-black dark:text-white">
                Để hiển thị vé cần trả, vui lòng điền 3 thông tin chính xác dưới
                đây:
              </p>
              <InputForm
                type="text"
                placeholder="Mã Đặt Chỗ"
                className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <InputForm
                type="text"
                placeholder="Email"
                className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <InputForm
                type="text"
                placeholder="Điện Thoại"
                className="border border-gray-300 bg-white text-black focus:border-primary dark:bg-gray-700 dark:text-white xs:w-[300px] sm:w-[350px] md:w-[650px] xl:w-[800px]"
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <Button
                className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
                size="md"
              >
                Tra Cứu
              </Button>
              <Link to={''} className="ml-4 font-bold text-blue-700">
                Quên mã đặt chỗ?
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

