import React from "react";
import { Footer } from "react-daisyui";
import { Logo } from "../../assets/images";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcApplePay } from "react-icons/fa";
import { Link } from "react-router-dom";
const FooterFC: React.FC<{}> = () => {
  return (
    <Footer className="item-center justify-between p-10 dark:bg-gray-700 bg-white border border-t-gray-50 xl:px-[100px] px-2 text-black dark:text-white">
      <div>
        <img
          width={140}
          loading="lazy"
          src={Logo}
          alt="LOGO"
        />
      </div>
      <div>
        <Footer.Title>Dịch Vụ</Footer.Title>
        <Link className="hover:text-primary" to={""}>Đặt vé</Link>
        <Link className="hover:text-primary" to={""}>Trả vé</Link>
        <Link className="hover:text-primary" to={""}>Kiểm tra vé</Link>
        <Link className="hover:text-primary" to={""}>Tư vấn khách hàng</Link>
      </div>
      <div>
        <Footer.Title>Về Chúng Tôi</Footer.Title>
        <Link className="hover:text-primary" to={""}>Giới thiệu</Link>
        <Link className="hover:text-primary" to={""}>Hotline</Link>
        <Link className="hover:text-primary" to={""}>Thông tin đặt vé</Link>
        <Link className="hover:text-primary" to={""}>Điạ điểm du lịch</Link>
      </div>
      <div>
        <Footer.Title>Phương Thanh Toán</Footer.Title>
        <div className="flex gap-2">
          <Link className="hover:text-primary text-[40px]" to={""}><FaCcVisa /></Link>
          <Link className="hover:text-primary text-[40px]" to={""}><FaCcApplePay /></Link>
        </div>
      </div>
    </Footer>
  );
};

export default FooterFC;