import React from 'react';
import { Button } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { LogoFacebook, LogoGoogle } from '../../assets/images';

const ServiceForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-[24px]">
      <div className="relative flex h-[36px] w-full flex-row items-center gap-[16px]">
        <span className="block h-[1px] w-full bg-[#CFDFE2]"></span>
        <p className="text-center font-sub text-[14px] font-[400]  dark:text-white sm:text-[16px]">
          {t('Auth.or')}
        </p>
        <span className="block h-[1px] w-full  bg-[#CFDFE2]"></span>
      </div>
      <div className="flex w-full flex-row justify-center gap-4 sm:flex-col">
        <Button>
          <img
            className="max-w-[24px] sm:max-w-[28px]"
            src={LogoGoogle}
            alt=""
          />
          <span className="hidden text-black dark:text-white sm:block">
            {t('Auth.loginBy')} Google
          </span>
          <span className="block text-black dark:text-white sm:hidden">
            Google
          </span>
        </Button>
        <Button className="">
          <img
            className="max-w-[24px] sm:max-w-[28px]"
            src={LogoFacebook}
            alt=""
          />
          <span className="hidden text-black dark:text-white sm:block">
            {t('Auth.loginBy')} Facebook
          </span>
          <span className="block text-black dark:text-white sm:hidden">
            Facebook
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
