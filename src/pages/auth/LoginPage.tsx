import React from 'react';
import { Button, Input } from 'react-daisyui';
import { Link, NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import LabelForm from '../../components/auth/LabelForm';
import ServiceForm from '../../components/auth/ServiceForm';
import { Logo } from '../../assets/images';
import { RiArrowGoBackFill } from 'react-icons/ri';

const LoginPage: React.FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* BackHome */}
      <div className="mt-0 inline-block w-full text-start text-primary md:mt-10">
        <Link to="/">
          <div className="flex items-center justify-start">
            <p className="mx-2 inline-block text-xl font-bold">
              <RiArrowGoBackFill />
            </p>
            <p className="inline-block text-xl font-bold">Về Trang Chủ</p>
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img width={80} src={Logo} alt="" />
        <h1 className="block text-center text-2xl font-[600] text-primary">
          {t('Auth.loginBtn')}
        </h1>
      </div>
      <div className="mt-10">
        <form>
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full flex-col gap-1">
              <LabelForm title={t('Auth.userTitle')} />
              <Input
                className="w-[350px] focus:outline-none xl:w-[500px]"
                placeholder={t('Auth.plsUser')}
                type="text"
                name="username"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <LabelForm title={t('Auth.passwordTitle')} />
              <Input
                className="w-[350px] focus:outline-none xl:w-[500px]"
                placeholder={t('Auth.plsPass')}
                type="password"
                name="password"
              />
            </div>

            <Link
              className="font-[400]text-primary self-end font-sub text-[16px]"
              to="/auth/request-password-reset"
            >
              {t('Auth.fgPassword')} ?
            </Link>
            <Button type="submit" color="primary" className="text-white">
              {t('Auth.loginBtn')}
            </Button>
          </div>
        </form>
        <ServiceForm />
        <p className="my-5 text-center font-sub text-base font-[400] dark:text-white">
          {t('Auth.notAccount')}
          <NavLink className="text-primary" to="/auth/register">
            {t('Auth.submitButton')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
