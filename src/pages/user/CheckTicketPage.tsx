import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { Link } from 'react-router-dom';

const CheckTicketPage: React.FC = () => {
  return (
    <div className="xl:pt-[90px]">
      <HeaderResponsive Title_NavbarMobile="Kiểm Tra Vé" />
      <div className="">
        {/* Marquee */}
        <div className="box-border w-full overflow-hidden whitespace-nowrap">
          <p className="marquee inline-block pl-[100%]">
            Do diễn biến phức tạp của mưa lũ, kể từ ngày 12/9 giảm tần suất chạy
            tàu trên tuyến Hà Nội - Hải Phòng.
          </p>
        </div>

        {/* Heading */}
        <div className="my-4 text-center">
          <h1 className="text-2xl font-bold uppercase">Kiểm tra vé</h1>
        </div>

        {/* Khung */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 xl:px-10">
          <p className="mb-4 text-lg">
            Theo quy định của Tổng công ty Đường sắt Việt Nam, hành khách có
            thông tin giấy tờ tùy thân trùng với thông tin trên vé điện tử mới{' '}
            <br />
            đủ điều kiện vào ga lên tàu.
          </p>
          <p className="text-lg">
            Để đảm bảo quyền lợi cho hành khách, tránh mua phải vé giả, hoặc vé
            không đúng với quy định, quý khách có thể kiểm tra lại vé điện tử
            của mình bằng cách điền đầy đủ các thông tin dưới đây.
          </p>
        </div>

        {/* Form */}
        <div className="my-5 flex w-full flex-col items-center justify-center px-2">
          <div className="flex w-full flex-col items-center justify-center rounded-lg border border-primary p-4 md:w-auto">
            <div className="flex flex-col lg:flex-row lg:gap-5">
              <div className="mb-4 flex flex-col gap-4">
                <InputForm
                  type="text"
                  placeholder="Mã vé"
                  className="xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                />
                <InputForm
                  type="text"
                  placeholder="Mã tàu"
                  className="xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                />
              </div>
              <div className="mb-4 flex flex-col gap-4">
                <InputForm
                  type="text"
                  placeholder="Ga đi"
                  className="xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                />
                <InputForm
                  type="text"
                  placeholder="Ga đến"
                  className="xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                />
              </div>
              <div className="mb-4 flex flex-col gap-4">
                <InputForm
                  type="text"
                  placeholder="Ngày đi "
                  className="xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                />
                <InputForm
                  type="text"
                  placeholder="Số giấy tờ"
                  className="xs:w-[300px] sm:w-[350px] md:w-[650px] lg:w-[250px]"
                />
              </div>
            </div>

            <Button
              className="w-32 bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700"
              size="md"
            >
              Kiểm tra vé
            </Button>
          </div>
        </div>
        {/* Khung */}
        <div className="mx-2 rounded-lg border border-blue-200 bg-blue-100 p-4 px-2 text-start text-blue-700 xl:px-10">
          <p className="mb-4 text-lg">
            - Chính sách giá vé và quy định đổi trả của
            <span className="mx-1 font-bold">Công ty CPVTĐS Sài Gòn</span>
            vui lòng bấm
            <span className="mx-1">
              <Link to="">Vào đây</Link>
            </span>
          </p>
          <p className="text-lg">
            - Chính sách giá vé và quy định đổi trả của
            <span className="mx-1 font-bold">Công ty CPVTĐS Hà Nội</span>
            vui lòng bấm
            <span className="mx-1">
              <Link to="">Vào đây</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckTicketPage;

