import React from 'react';

//Icon
import { FiCalendar } from 'react-icons/fi';

interface NavtitleAdminProps {
  Title_NavtitleAdmin: string;
  Btn_Create: React.ReactNode;
}
const NavtitleAdmin: React.FC<NavtitleAdminProps> = ({
  Title_NavtitleAdmin,
  Btn_Create
}) => {
  const [value, setValue] = React.useState('default');

  return (
    <div className="mt-5 justify-between px-2 py-5 md:flex xl:px-0">
      <div className="hidden flex-col md:flex">
        <h1 className="text-[25px] font-bold text-black">
          {Title_NavtitleAdmin}
        </h1>
        <p className="text-xs text-gray-500">
          Xin Chào, đây là trang {Title_NavtitleAdmin}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between">
        {/* Create Modal */}
        <div className="mr-3"> {Btn_Create}</div>
        <div className="flex items-center justify-center space-x-2 rounded-md bg-white">
          <p className="m-2 rounded bg-[#2D9CDB26] p-2 text-[#2D9CDB]">
            <FiCalendar />
          </p>
          <div className="">
            <p className="w-28 text-start text-xs font-semibold text-black outline-none">
              Lọc Theo Năm
            </p>
            <select
              value={value}
              onChange={e => setValue(e.target.value)}
              className="bg-white text-xs text-gray-500 focus:outline-none"
            >
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavtitleAdmin;
