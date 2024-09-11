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
          {t('Auth.Login')}
        </h1>
      </div>
      <div className="mt-10">
        <form>
          <div className="flex w-full flex-col space-y-4">
            <div className="flex w-full flex-col gap-1">
              <LabelForm title={t('Auth.LabelForm.username')} />
              <Input
                className="w-[350px] focus:outline-none xl:w-[500px]"
                placeholder={t('Auth.Placeholder.username')}
                type="text"
                name="username"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <LabelForm title={t('Auth.LabelForm.password')} />
              <Input
                className="w-[350px] focus:outline-none xl:w-[500px]"
                placeholder={t('Auth.Placeholder.password')}
                type="password"
                name="password"
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
        <p className="my-5 text-center font-sub text-base font-[400] dark:text-white">
          {t('Auth.CreateAccount')} &nbsp;
          <NavLink className="text-primary" to="/auth/register">
            {t('Auth.Register')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
