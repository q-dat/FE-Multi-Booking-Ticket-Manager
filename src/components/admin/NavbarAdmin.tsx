import React, { useState } from 'react';

//Icon
import { FaBell, FaGift } from 'react-icons/fa6';
import { FaGear } from 'react-icons/fa6';
import {
  IoChatboxEllipses,
  IoSearchOutline,
  IoSettings
} from 'react-icons/io5';
import NavigationBtnAdmin from './NavigationBtnAdmin';
import Avatar from 'boring-avatars';
import { Button, Input } from 'react-daisyui';
import { useAuth } from '../../context/auth/AuthContext';
import { RiUserUnfollowFill } from 'react-icons/ri';
import { BiSolidUserRectangle } from 'react-icons/bi';
import { Toastify } from '../../helper/Toastify';
import { ILogoutError } from '../../types/auth/auth';

const NavbarAdmin: React.FC<{}> = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { user, logout } = useAuth();

  const handleAvatarClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      Toastify('Đăng xuất thành công', 200);
    } catch (error) {
      const err = error as ILogoutError;
      if (err.response?.data?.message === 'Không tìm thấy session để xóa') {
        Toastify('Không tìm thấy session để xóa', 400);
      } else {
        Toastify('Đăng xuất thất bại', 400);
      }
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="hidden w-full items-center justify-between xl:flex">
        {/* Input Search */}
        <div className="relative mr-4 flex items-center">
          <Input
            className="min-w-[400px] bg-white text-black focus:outline-none"
            type="text"
            placeholder="Tìm Kiếm..."
          />
          <IoSearchOutline className="absolute right-2 h-5 w-5 cursor-pointer text-black" />
        </div>

        <div className="flex h-full items-center">
          <nav>
            <div className="mx-5 space-x-4">
              <NavigationBtnAdmin
                badgeNumber={1}
                Icons={<FaBell />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={2}
                Icons={<IoChatboxEllipses />}
                style=" bg-[#2D9CDB26] text-[#2D9CDB]"
                bg_span="bg-[#2D9CDB]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={3}
                Icons={<FaGift />}
                style=" bg-[#5E6C9326] text-[#5E6C93]"
                bg_span="bg-[#5E6C93]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <NavigationBtnAdmin
                badgeNumber={4}
                Icons={<FaGear />}
                style=" bg-[#FF5B5B26] text-[#FF5B5B]"
                bg_span="bg-[#FF5B5B]"
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </nav>
          <div className="text-black dark:text-white">
            Hello,
            <span className="font-semibold text-red-500">
              {user?.username || 'admin'}{' '}
            </span>
          </div>
          <div className="ml-4 cursor-pointer" onClick={handleAvatarClick}>
            <Avatar name={user?.username || ''} />
            {dropdownVisible && (
              <div className="absolute right-6 z-50 mt-1 flex flex-col gap-[1px] bg-white font-light shadow">
                <Button
                  size="md"
                  className="text-md flex w-full items-center justify-start rounded-none border-b-[0.5px] border-b-gray-50"
                >
                  <BiSolidUserRectangle className="mr-2 text-base" />
                  Profile
                </Button>
                <Button
                  size="md"
                  className="text-md flex w-full items-center justify-start rounded-none border-b-[0.5px] border-b-gray-50"
                >
                  <IoSettings className="mr-2 text-base" />
                  Settings
                </Button>
                <Button
                  size="md"
                  className="text-md flex w-full items-center justify-start rounded-none text-primary"
                  onClick={handleLogout}
                >
                  <RiUserUnfollowFill className="mr-2 text-base" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
