import React from 'react';
import { Footer } from 'react-daisyui';
import { FaCcVisa } from 'react-icons/fa6';
import { FaCcApplePay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LogoTitle } from '../../assets/images';
const FooterFC: React.FC<{}> = () => {
  return (
    <div>
      <Footer className="item-center grid grid-cols-2 justify-between bg-primary p-10 px-2 text-white md:grid-cols-5 xl:px-[100px]">
        <div>
          <img width={140} loading="lazy" src={LogoTitle} alt="LOGO" />
        </div>
        <div>
          <Footer.Title>Dịch Vụ</Footer.Title>
          <Link className="hover:text-secondary" to={''}>
            Đặt vé
          </Link>
          <Link className="hover:text-secondary" to={''}>
            Trả vé
          </Link>
          <Link className="hover:text-secondary" to={''}>
            Kiểm tra vé
          </Link>
          <Link className="hover:text-secondary" to={''}>
            Tư vấn khách hàng
          </Link>
        </div>
        <div>
          <Footer.Title>Về Chúng Tôi</Footer.Title>
          <Link className="hover:text-secondary" to={''}>
            Giới thiệu
          </Link>
          <Link className="hover:text-secondary" to={''}>
            Thông tin đặt vé
          </Link>
          <Link className="hover:text-secondary" to={''}>
            Điạ điểm du lịch
          </Link>
        </div>
        <div>
          <Footer.Title>Liên Hệ</Footer.Title>
          <Link className="hover:text-secondary" to="tel:">
            Hà Nội: 0123456789
          </Link>
          <Link className="hover:text-secondary" to="tel:">
            Sài Gòn: 0987654321
          </Link>
          <Link className="hover:text-secondary" to="tel:0333133050">
            HotLine: 0333133050
          </Link>
          <Link
            className="hover:text-secondary"
            to="mailto:laclactrip@gmail.com"
          >
            Email: laclactrip@gmail.com
          </Link>
        </div>
        <div>
          <Footer.Title>Phương Thanh Toán</Footer.Title>
          <div className="flex gap-2">
            <Link className="text-[40px] hover:text-secondary" to={''}>
              <FaCcVisa />
            </Link>
            <Link className="text-[40px] hover:text-secondary" to={''}>
              <FaCcApplePay />
            </Link>
          </div>
        </div>
      </Footer>
      <hr />
      <div className="bg-primary py-2 text-center text-white">
        © 2024 Copyright By LacLacTeam
      </div>
    </div>
  );
};

export default FooterFC;

