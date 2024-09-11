import React from 'react';
import { Button, Input } from 'react-daisyui';
import { Link, NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import LabelForm from '../../components/auth/LabelForm';
import ServiceForm from '../../components/auth/ServiceForm';
import { Logo } from '../../assets/images';

const LoginPage: React.FC<{}> = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img width={80} src={Logo} alt="" />
        <h1 className="block text-center text-2xl font-[600] text-primary">
          Đăng Nhập
        </h1>
      </div>
      <div className="mt-10">
        <form>
          <div className="flex w-full flex-col space-y-4">
            <div className="flex w-full flex-col gap-1">
              <LabelForm title="Tên taif khoản" />
              <Input
                className="w-[350px] focus:outline-none xl:w-[500px]"
                placeholder="Tên tài khoản"
                type="text"
                name="username"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <LabelForm title="Mật Khẩu"/>
              <Input
                className="w-[350px] focus:outline-none xl:w-[500px]"
                placeholder="Mật Khẩu"
                type="password"
                name="password"
              />
            </div>

            <Link
              className="self-end font-sub text-[16px] font-[400] text-primary"
              to="/auth/request-password-reset"
            >
            Quên Mật Khẩu?
            </Link>

            <Button type="submit" color="primary" className="text-white">
            Đăng Nhập
            </Button>
          </div>
        </form>
        <ServiceForm />
        <p className="my-5 text-center font-sub text-base font-[400] dark:text-white">
         Bạn chưa có tài khoản? &nbsp;
          <NavLink className="text-primary" to="/auth/register">
           Đăng Ký
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
