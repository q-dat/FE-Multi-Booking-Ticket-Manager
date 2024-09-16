import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import InputForm from '../../components/UserPage/InputForm';
import { Button } from 'react-daisyui';
import { Link } from 'react-router-dom';

const ReturnTicketPage: React.FC = () => {
  return (
    <div className="pt-[100px] xl:pt-[90px]">
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* cột dưới */}
      <div className="w-[100%]">
        <div className="h-auto">
          <h1 className="mb-2 text-center text-4xl font-bold text-primary">
            Trả vé
          </h1>
        </div>
        {/* khung */}
        <div className="m-2 h-auto rounded-sm border-2 border-blue-200 bg-blue-200 text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10">
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
        <div className=" my-5">
          <div className="mx-auto w-[60%] rounded-lg border border-primary p-4 text-center bg-gray-700">
            <p className="m-2 mb-4 text-black dark:text-white text-xl font-bold">
              Để hiển thị vé cần trả, vui lòng điền 3 thông tin chính xác dưới
              đây:
            </p>
            <InputForm
              type="text"
              placeholder="Mã Đặt Chỗ"
              className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 focus:border-white dark:bg-gray-700"
              classNameLabel="bg-white dark:bg-gray-700"
            />
            <InputForm
              type="text"
              placeholder="Email"
              className="dark:border-whitebg-white mb-4 w-full rounded-lg border border-gray-300 p-2 focus:border-white dark:bg-gray-700"
              classNameLabel="bg-white dark:bg-gray-700"
            />
            <InputForm
              type="text"
              placeholder="Điện Thoại"
              className="dark:border-whitebg-white mb-4 w-full rounded-lg border border-gray-300 p-2 focus:border-white dark:bg-gray-700"
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
        {/* khung */}
        <div className="m-2 h-auto rounded-sm border-2 border-blue-200 bg-blue-200 p-2 text-start text-blue-700 dark:bg-gray-700 dark:text-primary xl:px-10">
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

