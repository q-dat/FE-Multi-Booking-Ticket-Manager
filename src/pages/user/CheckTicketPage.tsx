import React from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';

const CheckTicketPage: React.FC = () => {
  return <div pt-10>
    <HeaderResponsive Title_NavbarMobile="Kiểm Tra Vé" />
    <div className="p-4">
      {/* Marquee */}
      <div className="w-full overflow-hidden whitespace-nowrap box-border">
        <p className="inline-block pl-[100%] animate-marquee">
          Do diễn biến phức tạp của mưa lũ, kể từ ngày 12/9 giảm tần suất chạy tàu trên tuyến Hà Nội - Hải Phòng.
        </p>
      </div>

      {/* Heading */}
      <div className="text-center my-4">
        <h1 className="text-2xl font-bold">Kiểm tra vé</h1>
      </div>

      {/* Khung */}
      <div className="bg-blue-100 text-blue-700 border border-blue-200 p-4 rounded-lg">
        <p className="text-lg mb-4">
          Theo quy định của Tổng công ty Đường sắt Việt Nam, hành khách có thông tin giấy tờ tùy thân trùng với thông tin trên vé điện tử mới <br />
          đủ điều kiện vào ga lên tàu.
        </p>
        <p className="text-lg">
          Để đảm bảo quyền lợi cho hành khách, tránh mua phải vé giả, hoặc vé không đúng với quy định, quý khách có thể kiểm tra lại vé điện tử của mình bằng cách điền đầy đủ các thông tin dưới đây.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-8">
        <div className="flex mb-4 gap-4">
          <label htmlFor="ticket-code" className="flex-1">Mã vé</label>
          <input type="text" id="ticket-code" name="ticket-code" className="flex-1 p-2 border border-gray-300 rounded-lg" />
          <label htmlFor="train-code" className="flex-1">Mã tàu</label>
          <input type="text" id="train-code" name="train-code" className="flex-1 p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="departure-station" className="flex-1">Ga đi</label>
          <input type="text" id="departure-station" name="departure-station" className="flex-1 p-2 border border-gray-300 rounded-lg" />
          <label htmlFor="arrival-station" className="flex-1">Ga đến</label>
          <input type="text" id="arrival-station" name="arrival-station" className="flex-1 p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex mb-4 gap-4">
          <label htmlFor="departure-date" className="flex-1">Ngày đi</label>
          <input type="date" id="departure-date" name="departure-date" className="flex-1 p-2 border border-gray-300 rounded-lg" />
          <label htmlFor="document-number" className="flex-1">Số giấy tờ</label>
          <input type="text" id="document-number" name="document-number" className="flex-1 p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="text-center">
    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
      Kiểm tra vé
    </button>
  </div>
      </div>
      <div className="bg-blue-100 text-blue-700 border border-blue-200 p-6 rounded-lg shadow-md">
    <p className="text-lg mb-4">
      - Chính sách giá vé và quy định đổi trả của 
      <strong className="font-semibold">Công ty CPVTĐS Sài Gòn</strong>
      vui lòng bấm 
      <a href="#" className="text-blue-500 hover:underline">vào đây</a>
    </p>
    <p className="text-lg">
      - Chính sách giá vé và quy định đổi trả của 
      <strong className="font-semibold">Công ty CPVTĐS Hà Nội</strong>
      vui lòng bấm 
      <a href="#" className="text-blue-500 hover:underline">vào đây</a>
    </p>
  </div>
    </div>
  </div>;
};

export default CheckTicketPage;

