import React from "react";

//Icon
import { FaBell, FaGift } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { IoChatboxEllipses, IoSearchOutline } from "react-icons/io5";
import NavigationBtnAdmin from "./NavigationBtnAdmin";
import Avatar from "boring-avatars";
import { Input } from "react-daisyui";

const NavbarAdmin: React.FC<{}> = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="hidden w-full items-center justify-between xl:flex">
        {/* Input Search */}
        <div className="relative  mr-4 flex items-center ">
          <Input
            className="min-w-[400px] bg-white text-black focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm..."
          />
          <IoSearchOutline className="absolute right-2 h-5 w-5 cursor-pointer text-black" />
        </div>

        <div className="flex h-full items-center">
          <nav>
            <div className=" mx-5 space-x-4">
              <NavigationBtnAdmin
                badgeNumber={1}
                Icons={<FaBell />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={2}
                Icons={<IoChatboxEllipses />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={3}
                Icons={<FaGift />}
                style=" bg-[#5E6C9326] text-[#5E6C93]"
                bg_span="bg-[#5E6C93]"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={4}
                Icons={<FaGear />}
                style=" bg-[#FF5B5B26] text-[#FF5B5B]"
                bg_span="bg-[#FF5B5B]"
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </nav>
          <div className="text-black">
            Hello,
            <span className=" font-semibold text-red-500">admin </span>
          </div>
          <div className="ml-4 cursor-pointer">
            <Avatar name="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;