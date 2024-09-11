import React from 'react';
import { Button, Input } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Logo } from '../../assets/images';

const RequestPasswordReset: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[48px] p-[32px] sm:max-w-[504px]">
      <div className="mx-auto flex max-w-[342px] flex-col items-center gap-[16px] sm:mx-0 sm:max-w-full sm:items-start sm:gap-[28px]">
        <div className="flex items-center justify-center gap-4">
          <img width={80} src={Logo} alt="" />
          <h1 className="block text-center text-[24px] font-[600] text-primary">
        Yêu cầu đặt lại mật khẩu!
          </h1>
        </div>
        <p className="text-[16px] font-[400] dark:text-white sm:text-[20px]">
        Vui lòng nhập email của bạn để đặt lại mật khẩu.
                </p>
      </div>
      <div className="mx-0 flex w-full min-w-0 flex-col gap-[24px] sm:mx-auto sm:max-w-[388px] sm:gap-[48px]">
        <form>
          <div className="flex w-full flex-col gap-[24px]">
            <div className="flex w-full flex-col gap-[8px]">
              <label className="text-[14px] font-[600] text-gray-700">
              Email
              </label>
              <Input
                placeholder="Nhập email của bạn"
                type="email"
                name="email"
              />
            </div>
            <Button type="submit" color="primary" className="text-white">
             Yêu cầu đặt lại mật khẩu
            </Button>
          </div>
        </form>
      </div>
      <p className="text-center font-sub font-[400] md:text-[18px]">
      Bạn đã có tài khoản? &nbsp;
        <Link className="text-primary" to="/auth/login">
         Đăng Nhập
        </Link>
      </p>
    </div>
  );
};

export default RequestPasswordReset;
