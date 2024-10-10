import React from 'react';
import { Button } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { LogoFacebook, LogoGoogle } from '../../assets/images';

const ServiceForm: React.FC = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative flex h-9 w-full flex-row items-center gap-4">
        <span className="block h-[1px] w-full bg-[#CFDFE2]"></span>
        <p className="text-center font-sub text-sm font-light text-black dark:text-white sm:text-lg">
          {t('Auth.Or')}
        </p>
        <span className="block h-[1px] w-full bg-[#CFDFE2]"></span>
      </div>
      <div className="flex w-full flex-row justify-center gap-4 text-black dark:text-white sm:flex-col">
        <Button>
          <img className="max-w-7" src={LogoGoogle} alt="" />
          <span className="hidden text-black dark:text-black sm:block">
            {t('Auth.LoginBy')} Google
          </span>
          <span className="block text-black dark:text-black sm:hidden">
            Google
          </span>
        </Button>
        <Button className="">
          <img className="max-w-7" src={LogoFacebook} alt="" />
          <span className="hidden text-black dark:text-black sm:block">
            {t('Auth.LoginBy')} FaceBook
          </span>
          <span className="block text-black dark:text-black sm:hidden">
            Facebook
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ServiceForm;
