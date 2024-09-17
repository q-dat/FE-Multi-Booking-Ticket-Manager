import React from 'react';
import { Footer } from 'react-daisyui';
import { Logo } from '../../assets/images';
import { FaCcVisa } from 'react-icons/fa6';
import { FaCcApplePay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const FooterFC: React.FC<{}> = () => {
  return (
    <div>
      <Footer className="item-center justify-between bg-white p-10 px-2 text-black dark:bg-gray-700 dark:text-white xl:px-[100px]">
        <div>
          <img width={140} loading="lazy" src={Logo} alt="LOGO" />
        </div>
        <div>
          <Footer.Title>Dịch Vụ</Footer.Title>
          <Link className="hover:text-primary" to={''}>
            Đặt vé
          </Link>
          <Link className="hover:text-primary" to={''}>
            Trả vé
          </Link>
          <Link className="hover:text-primary" to={''}>
            Kiểm tra vé
          </Link>
          <Link className="hover:text-primary" to={''}>
            Tư vấn khách hàng
          </Link>
        </div>
        <div>
          <Footer.Title>Về Chúng Tôi</Footer.Title>
          <Link className="hover:text-primary" to={''}>
            Giới thiệu
          </Link>
          <Link className="hover:text-primary" to={''}>
            Hotline
          </Link>
          <Link className="hover:text-primary" to={''}>
            Thông tin đặt vé
          </Link>
          <Link className="hover:text-primary" to={''}>
            Điạ điểm du lịch
          </Link>
        </div>
        <div>
          <Footer.Title>Phương Thanh Toán</Footer.Title>
          <div className="flex gap-2">
            <Link className="text-[40px] hover:text-primary" to={''}>
              <FaCcVisa />
            </Link>
            <Link className="text-[40px] hover:text-primary" to={''}>
              <FaCcApplePay />
            </Link>
          </div>
        </div>
      </Footer>
      <hr />
      <div className="bg-white text-center py-2 text-black dark:bg-gray-700 dark:text-white">
        © 2024 Copyright By LacLacTeam
      </div>
    </div>
  );
};

export default FooterFC;