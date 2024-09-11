import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { Button } from 'react-daisyui';
import DarkMode from '../../components/orther/darkmode/DarkMode';
import DropdownLanguage from '../../components/orther/translation/Dropdown-Language ';
import { BannerTop } from '../../assets/image-represent';

const Auth: React.FC = () => {
  return (
    <div className="flex flex-col pb-[300px]">
      {/* BackHome */}
      <div className="inline-block w-full text-start text-primary">
        <div className="flex flex-grow items-center justify-between px-2 xl:px-10 py-2">
          <Link to="/">
            <Button size="md">
              <RiArrowGoBackFill className='className="font-bold" inline-block text-xl' />
              Về Trang Chủ
            </Button>
          </Link>
          <div className="flex flex-row items-center justify-center gap-2">
            <DropdownLanguage />
            <DarkMode />
          </div>
        </div>
      <div className='block xl:hidden'>
        <img className='w-full' src={BannerTop} alt="" />
      </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center md:flex-row md:px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
