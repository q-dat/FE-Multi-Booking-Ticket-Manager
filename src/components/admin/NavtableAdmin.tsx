import React from "react";
import { Input, Select } from "react-daisyui";
//Icon
import { IoSearchOutline } from "react-icons/io5";

const NavtableAdmin: React.FC<{ Title_NavtableAdmin: string }> = ({
  Title_NavtableAdmin,
}) => {
  const [value, setValue] = React.useState("default");
  return (
    <div className="hidden items-center justify-between bg-white px-4 py-5 md:flex">
      <div>
        <h2 className="text-lg font-bold text-black ">{Title_NavtableAdmin}</h2>
        <p className="mt-1 text-sm text-primary">Đang sử dụng</p>
      </div>
      <div className="flex items-center">
        {/* Thanh Search */}
        <div className="relative  mr-4 flex items-center">
          <Input
            className="min-w-[300px] bg-white text-black focus:outline-none "
            type="text"
            placeholder="Tìm Kiếm..."
          />
          <IoSearchOutline className="absolute right-2 h-5 w-5 cursor-pointer " />
        </div>
        <div className="flex items-center gap-3 rounded-lg">
          <label className="text-sm text-gray-600">Sắp xếp theo:</label>
          <Select
            className="bg-white text-black focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <option value="default">Cũ nhất</option>
            <option value="1">Mới nhất</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default NavtableAdmin;