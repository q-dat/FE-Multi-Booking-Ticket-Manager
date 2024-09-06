import React from "react";
import { Outlet } from "react-router-dom";
const DefaultLayout: React.FC<{}> = () => {
  return (
    <div className="bg-white dark:bg-gray-600">
      <Outlet />
    
    </div>
  );
};

export default DefaultLayout;
