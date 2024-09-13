import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Button } from 'react-daisyui';
import DropdownLanguage from '../../components/orther/translation/Dropdown-Language ';
import { BannerC } from '../../assets/image-represent';
import DarkMode from '../../components/orther/darkmode/DarkMode';

const Auth: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col">
      <div className="hidden xl:block">
        <img className='h-[140px] object-cover w-full' src={BannerC} alt="" />
      </div>
      {/* BackHome */}
      <div className="fixed z-[99999] hidden w-full flex-row items-center justify-evenly bg-white bg-opacity-50 py-2 uppercase shadow-md dark:bg-gray-700 dark:bg-opacity-50 xl:flex">
        {/* Navbar */}
        <div className="flex flex-grow items-center justify-between px-2 py-2 xl:px-10">
          <Link to="/">
            <Button
              size="md"
              className="flex cursor-pointer flex-row items-center justify-center rounded-md border-none bg-white bg-opacity-20 text-black shadow-headerMenu"
            >
              <RiArrowGoBackFill className='className="font-bold" inline-block text-xl' />
              {t('Auth.BackToHome')}
            </Button>
          </Link>
          <div className="flex flex-row items-center justify-center gap-2">
            <DropdownLanguage />
            <DarkMode />
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
