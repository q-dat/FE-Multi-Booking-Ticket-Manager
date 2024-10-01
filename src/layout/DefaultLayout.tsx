import React from 'react';
import { Outlet } from 'react-router-dom';
const DefaultLayout: React.FC<{}> = () => {
  return (
    <div className="bg-white dark:bg-[#0e3043]">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
