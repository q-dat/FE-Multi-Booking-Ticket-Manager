import React, { useState } from 'react';
import { Button, Input } from 'react-daisyui';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabelForm from '../../components/auth/LabelForm';
import ServiceForm from '../../components/auth/ServiceForm';
import { Logo } from '../../assets/images';
import HeaderAuth from '../../components/auth/HeaderAuth';
import { BannerLogin } from '../../assets/image-represent';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC<{}> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);
      toast.success('Đăng nhập thành công');
      if (user?.role === 'user') {
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="xl:flex xl:flex-row xl:items-center xl:justify-center">
      <HeaderAuth Title_NavbarMobile={t('Auth.Login')} />
      {/* Form */}
      <div className="flex w-full flex-col items-center justify-center xl:w-1/2">
        <div className="">
          <h1 className="hidden text-center text-[40px] font-[600] text-primary xl:block">
            {t('Auth.Login')}
          </h1>
          <img className="w-[180px] xl:hidden xl:w-[120px]" src={Logo} alt="" />
        </div>
        <div className="mt-10">
          <form onSubmit={handleLogin}>
            <div className="flex w-full flex-col space-y-4">
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.username')} />
                <Input
                  className="w-[350px] focus:outline-none md:w-[700px] xl:w-[500px]"
                  placeholder={t('Auth.Placeholder.username')}
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <LabelForm title={t('Auth.LabelForm.password')} />
                <Input
                  className="w-[350px] focus:outline-none md:w-[700px] xl:w-[500px]"
                  placeholder={t('Auth.Placeholder.password')}
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link
                className="self-end font-sub text-[16px] font-[400] text-primary"
                to="/auth/request-password-reset"
              >
                {t('Auth.ForgotPassword')}
              </Link>

              <Button type="submit" color="primary" className="text-white">
                {t('Auth.Login')}
              </Button>
            </div>
          </form>
          <ServiceForm />
          <p className="my-5 text-center font-sub text-base font-[400]">
            {t('Auth.CreateAccount')} &nbsp;
            <NavLink className="text-primary" to="/auth/register">
              {t('Auth.Register')}
            </NavLink>
          </p>
        </div>
      </div>
      {/* BoxImg */}
      <div className="hidden w-1/2 p-10 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <img className="w-[130px]" src={Logo} alt="" />
        <img className="w-full rounded-lg" src={BannerLogin} alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
