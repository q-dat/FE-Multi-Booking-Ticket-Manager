import React from 'react';
import { Button, Input } from 'react-daisyui';
import { Link, NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import LabelForm from '../../components/auth/LabelForm';
import ServiceForm from '../../components/auth/ServiceForm';
import { Logo } from '../../assets/images';

const LoginPage: React.FC<{}> = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-[390px] flex-col gap-[48px] p-[32px] sm:max-w-[504px]">
      <div className="mx-auto flex max-w-[342px] flex-col items-center gap-[16px] sm:mx-0 sm:max-w-full sm:items-start sm:gap-[28px]">
        <div className="flex items-center justify-center gap-4">
          <img width={80} src={Logo} alt="Reski." />
          <h1 className="hidden text-[36px] font-[600] leading-[36px] text-primary sm:block">
            {t('Auth.hi')}
          </h1>
        </div>
        <h1 className="block text-center text-[24px] font-[600] leading-[24px] text-primary sm:hidden">
          {t('Auth.loginLink')}
        </h1>
        <p className="text-[16px] font-[400] leading-[25.6px] dark:text-white sm:text-[20px] sm:leading-[32px]">
          {t('Auth.beforeLogin')}
        </p>
      </div>
      <div className="mx-0 flex w-full min-w-0 flex-col gap-[24px] sm:mx-auto sm:max-w-[388px] sm:gap-[48px]">
        <form>
          <div className="flex w-full flex-col gap-[24px]">
            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.userTitle')} />
              <Input
                placeholder={t('Auth.plsUser')}
                type="text"
                name="username"
              />
            </div>
            <div className="flex w-full flex-col gap-[8px]">
              <LabelForm title={t('Auth.passwordTitle')} />
              <Input
                placeholder={t('Auth.plsPass')}
                type="password"
                name="password"
              />
            </div>
            <div className="flex w-full flex-col gap-[8px]">
            </div>

            <Link
              className="self-end font-sub text-[16px] font-[400] leading-[16px] text-primary"
              to="/auth/request-password-reset"
            >
              {t('Auth.fgPassword')} ?
            </Link>
            <Button
              type="submit"
              color="primary"
              className="text-white"
            >
            </Button>
          </div>
        </form>
        <ServiceForm />
        <p className="text-center font-sub text-[18px] font-[400] leading-[28.8px] dark:text-white">
          {t('Auth.notAccount')}{' '}
          <NavLink className="text-primary" to="/auth/register">
            {t('Auth.submitButton')}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
