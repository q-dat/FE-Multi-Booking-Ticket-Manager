import React from 'react';
import { Outlet } from 'react-router-dom';
import BoxImage from '../../components/auth/BoxImage';

const Auth: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid h-full w-full grid-cols-[repeat(1,1fr)] items-center gap-[24px] bg-white dark:bg-black sm:grid-cols-[repeat(2,1fr)] sm:gap-[]">
        <div className="order-2 w-full overflow-x-hidden pb-[24px] sm:order-1 sm:p-0">
          <Outlet />
        </div>
        <BoxImage />
      </div>
    </div>
  );
};

export default Auth;
