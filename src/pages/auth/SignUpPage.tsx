import React from 'react';
import { Button, Input, Select } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LabelForm from '../../components/auth/LabelForm';
import { Logo } from '../../assets/images';
import ServiceForm from '../../components/auth/ServiceForm';

const SignUpPage: React.FC = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img width={80} src={Logo} alt="" />
        <h1 className="block text-center text-2xl font-[600] text-primary">
          Đăng Ký
        </h1>
      </div>
      <div className="mt-10">
        <form>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <div className="flex flex-col space-y-4">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Tài Khoản" />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder="Tên Tài Khoản"
                  name="username"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Họ và Tên" />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder="Họ và Tên"
                  name="full_name"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Email" />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="email"
                  placeholder="Email"
                  name="email"
                />
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Số điện thoại" />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="text"
                  placeholder="Số điện thoại"
                  name="phone"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Mật khẩu" />
                <Input
                  className="w-[350px] focus:outline-none xl:w-[300px]"
                  type="password"
                  placeholder="Mật Khẩu"
                  name="password"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Giới tính" />
                <Select className="w-[350px] focus:outline-none xl:w-[300px]">
                  <option hidden defaultValue={1} value="">
                    Chọn giới tính
                  </option>

                  <option>...</option>
                </Select>
              </div>

              <div className="flex w-full flex-col gap-1">
                <LabelForm title="Ảnh đại diện" />
                <Input
                  className="w-[350px] p-[7px] focus:outline-none xl:w-[300px]"
                  type="file"
                  name="image"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <Button
                  type="submit"
                  color="primary"
                  className="mt-[27px] text-white"
                >
                  Đăng Ký
                </Button>
              </div>
            </div>
          </div>
        </form>
        <ServiceForm />
        <p className="my-5 text-center font-sub text-base font-[400] dark:text-white">
          Bạn chưa có tài khoản? &nbsp;{' '}
          <NavLink className="text-primary" to="/auth/login">
            Đăng Nhập
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
