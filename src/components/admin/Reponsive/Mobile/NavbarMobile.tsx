import React, { useCallback, useState } from 'react';
import { Button, Drawer, Input, Menu } from 'react-daisyui';
//Icon
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import SidebarAdmin from '../../SidebarAdmin';
import Avatar from 'boring-avatars';
import { MdLogout } from 'react-icons/md';

const NavbarMobile: React.FC<{ Title_NavbarMobile: string }> = ({
  Title_NavbarMobile
}) => {
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  const toggleLeftVisible = useCallback(() => {
    setLeftVisible(visible => !visible);
  }, []);

  const toggleRightVisible = useCallback(() => {
    setRightVisible(visible => !visible);
  }, []);

  return (
    <div className="flex flex-col px-2 pb-6 xl:hidden xl:px-0">
      <div className="mb-6 flex items-center justify-between">
        {/* Sidebar Left */}
        <div className="z-50">
          <Drawer
            open={leftVisible}
            onClickOverlay={toggleLeftVisible}
            side={
              <Menu className="fixed h-full bg-white dark:bg-gray-800">
                <Menu.Item>
                  <div className="p-0">
                    <SidebarAdmin />
                  </div>
                </Menu.Item>
              </Menu>
            }
          >
            <div
              onClick={toggleLeftVisible}
              className="py-4 text-2xl text-black dark:text-white xl:hidden"
            >
              <RxHamburgerMenu />
            </div>
          </Drawer>
        </div>
        {/* Title_NavbarMobile */}
        <div>
          <p className="font-semibold text-black dark:text-white">
            {Title_NavbarMobile}
          </p>
        </div>
        {/* Sidebar Right */}
        <div className="z-50">
          <Drawer
            open={rightVisible}
            onClickOverlay={toggleRightVisible}
            side={
              <Menu className="fixed h-full w-[280px] bg-white">
                <Menu.Item className="space-y-2">
                  {/*  */}
                  <Button>
                    <MdLogout />
                    Đăng Xuất
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <div onClick={toggleRightVisible}>
              <Avatar
                name="Mary Edwards"
                colors={['#1b325f', '#9cc4e4', '#e9f2f9', '#3a89c9', '#f26c4f']}
                variant="beam"
                size={35}
              />{' '}
            </div>
          </Drawer>
        </div>
      </div>
      {/* Input Search */}
      <div className="relative flex items-center">
        <Input
          className="w-full text-black focus:outline-none"
          type="text"
          placeholder="Tìm Kiếm..."
        />
        <IoSearchOutline className="absolute right-2 h-5 w-5 cursor-pointer text-gray-50" />
      </div>
    </div>
  );
};

export default NavbarMobile;
