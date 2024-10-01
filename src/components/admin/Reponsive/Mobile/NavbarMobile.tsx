import React, { useCallback, useState } from 'react';
import { Drawer, Input, Menu } from 'react-daisyui';
//Icon
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import SidebarAdmin from '../../SidebarAdmin';

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
              <Menu className="fixed h-full w-[280px] bg-white">
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
              className="py-4 text-2xl text-black xl:hidden"
            >
              <RxHamburgerMenu />
            </div>
          </Drawer>
        </div>
        {/* Title_NavbarMobile */}
        <div>
          <p className="font-semibold text-black">{Title_NavbarMobile}</p>
        </div>
        {/* Sidebar Right */}
        <div className="z-50">
          <Drawer
            open={rightVisible}
            onClickOverlay={toggleRightVisible}
            side={
              <Menu className="fixed h-full w-[280px] bg-white">
                <Menu.Item className="space-y-2"></Menu.Item>
              </Menu>
            }
          >
            <div onClick={toggleRightVisible}>
              <svg
                className="rounded-full"
                viewBox="0 0 36 36"
                fill="none"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
              >
                <mask
                  id=":rlr:"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="36"
                  height="36"
                >
                  <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
                </mask>
                <g mask="url(#:rlr:)">
                  <rect width="36" height="36" fill="#0a5483"></rect>
                  <rect
                    x="0"
                    y="0"
                    width="36"
                    height="36"
                    transform="translate(4 4) rotate(340 18 18) scale(1.1)"
                    fill="#f8f8ec"
                    rx="36"
                  ></rect>
                  <g transform="translate(-4 -1) rotate(0 18 18)">
                    <path
                      d="M15 20c2 1 4 1 6 0"
                      stroke="#000000"
                      fill="none"
                      strokeLinecap="round"
                    ></path>
                    <rect
                      x="14"
                      y="14"
                      width="1.5"
                      height="2"
                      rx="1"
                      stroke="none"
                      fill="#000000"
                    ></rect>
                    <rect
                      x="20"
                      y="14"
                      width="1.5"
                      height="2"
                      rx="1"
                      stroke="none"
                      fill="#000000"
                    ></rect>
                  </g>
                </g>
              </svg>
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
