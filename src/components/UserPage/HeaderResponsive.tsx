import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Button, Drawer, Input, Menu } from "react-daisyui";
// Icon
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearchOutline, IoSettingsSharp, IoTicket, IoTime } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaHome, FaPhoneAlt, FaChevronDown } from "react-icons/fa";
import { LuSearchCheck } from "react-icons/lu";
import { GiReturnArrow } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { Logo } from "../../assets/images";
import DarkMode from "../orther/darkmode/DarkMode";
import DropdownLanguage from "../orther/translation/Dropdown-Language ";

interface HeaderResponsiveProps {
  Title_NavbarMobile: ReactNode;
}
interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}
const HeaderResponsive: React.FC<HeaderResponsiveProps> = ({
  Title_NavbarMobile,
}) => {
  //leftVisible
  const [leftVisible, setLeftVisible] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleLeftVisible = useCallback(() => {
    setLeftVisible((visible) => !visible);
  }, []);
  //rightVisible
  const [rightVisible, setRightVisible] = useState(false);

  const toggleRightVisible = useCallback(() => {
    setRightVisible((visible) => !visible);
  }, []);
  const [activeItem, setActiveItem] = useState("Trang Chủ");
  const location = useLocation();
  const menuItems: MenuItem[] = [
    {
      name: "Trang Chủ",
      icon: FaHome,
      link: "/",
    },
    {
      name: "Thông tin đặt chỗ",
      link: "/",
      submenu: [
        { name: "Tìm Vé", icon: LuSearchCheck, link: "/" },
        { name: "Trả vé", icon: GiReturnArrow, link: "/" },
        { name: "Kiểm tra vé", icon: IoTicket, link: "/" },
        { name: "Giờ tàu - Giá vé", icon: IoTime, link: "/" },
      ],
    },
    { name: "Khuyến mại", link: "/" },
    { name: "Các quy định", link: "/" },
    { name: "Hướng dẫn", link: "/" },
    {
      name: "Liên hệ",
      link: "/",
      submenu: [
        { name: "Hotline:", icon: FaPhoneAlt, link: "/#" },
        { name: "Email", icon: MdEmail, link: "/#" },
      ],
    },
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(
      (item) =>
        item.link === pathname ||
        item.submenu?.some((sub) => sub.link === pathname)
    );
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);

  const handleMenuClick = (name: string) => {
    setOpenSubmenu((prev) => (prev === name ? null : name));
  };

  return (
    <div className="flex flex-col px-2 pb-6 xl:hidden xl:px-0">
      <div className="flex items-center justify-between">
        <div className="z-50">
          <Drawer
            open={leftVisible}
            onClickOverlay={toggleLeftVisible}
            side={
              <Menu className="fixed h-full w-[280px] bg-white dark:bg-gray-800">
                {/* LOGO */}
                <div className="flex justify-center items-center">
                  <img
                    className="object-cover"
                    width={120}
                    loading="lazy"
                    src={Logo}
                    alt="LOGO"
                  />
                </div>
                {/* Menu */}
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="relative">
                      <Menu.Item
                        className="relative group"
                        onClick={() =>
                          item.submenu && handleMenuClick(item.name)
                        }
                      >
                        <NavLink
                          to={item.link}
                          className={`
                            btn rounded-none flex flex-row w-full items-center justify-between border-none relative pl-4 pr-3 mt-2
                            ${
                              item.name === activeItem
                                ? "text-sm bg-primary bg-opacity-30 font-bold text-primary dark:bg-opacity-50 dark:text-white"
                                : "text-sm bg-primary bg-opacity-10 border-none shadow-headerMenu font-light text-black dark:text-white"
                            }
                          `}
                        >
                          <>
                            {item.name === activeItem && (
                              <div className="absolute left-0 bottom-0 h-[2px] w-full bg-primary dark:bg-white" />
                            )}
                            {Icon && (
                              <Icon
                                className={
                                  item.name === activeItem
                                    ? "h-5 w-5 text-primary dark:text-white"
                                    : "h-5 w-5"
                                }
                              />
                            )}
                            <span className={Icon ? "" : ""}>{item.name}</span>
                            {item.submenu && (
                              <FaChevronDown
                                className={`ml-2 h-4 w-4 ${openSubmenu === item.name ? "rotate-180" : ""}`}
                              />
                            )}
                          </>
                        </NavLink>
                      </Menu.Item>
                      {/* SubMenu */}
                      {item.submenu && openSubmenu === item.name && (
                        <div className="relative space-y-2 p-4 w-full bg-white dark:bg-gray-700 dark:bg-opacity-80 rounded-sm shadow-md">
                          {item.submenu.map((subItem, index) => (
                            <Link
                              key={index}
                              to={subItem.link}
                              className="block"
                            >
                              <Button
                                size="sm"
                                className="uppercase text-sm shadow-headerMenu flex flex-row justify-start items-center bg-primary w-full text-white dark:text-black border-none rounded-sm"
                              >
                                {subItem.icon && <subItem.icon />}
                                {subItem.name}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Menu>
            }
          >
            <div
              onClick={toggleLeftVisible}
              className="flex flex-row items-center justify-center gap-2 py-4 text-2xl text-black dark:text-white xl:hidden"
            >
              <RxHamburgerMenu className="text-[25px] bg-primary glass text-white shadow-headerMenu dark:text-white rounded-md p-1" />
            </div>
          </Drawer>
        </div>
        {/* Title */}
        <p className="uppercase text-primary text-base font-bold">
          {Title_NavbarMobile}
        </p>
        {/* RightVisible */}
        <div className="z-50">
          <Drawer
            open={rightVisible}
            onClickOverlay={toggleRightVisible}
            side={
              <Menu className="fixed h-full w-[280px] bg-white dark:bg-gray-800">
                {/* LOGO */}
                <div className="flex justify-center items-center">
                  <img
                    className="object-cover"
                    width={120}
                    loading="lazy"
                    src={Logo}
                    alt="LOGO"
                  />
                </div>
                <div className="w-full space-y-5">
                  <div className="flex flex-row justify-between items-center p-2 bg-opacity-20 bg-gray-700 rounded-md">
                    <p className="text-lg font-semibold text-black dark:text-white">
                     Giao diện
                    </p>
                    <DarkMode />
                  </div>
                  <div className="flex flex-row justify-between items-center p-2 bg-opacity-20 bg-gray-700 rounded-md">
                    <p className="text-lg font-semibold text-black dark:text-white">
                     Giao diện
                    </p>
                  <DropdownLanguage />
                  </div>
                </div>
              </Menu>
            }
          >
            <div
              onClick={toggleRightVisible}
              className="flex flex-row items-center justify-center gap-2 py-4 text-2xl text-black dark:text-white xl:hidden"
            >
              <IoSettingsSharp className="text-[25px] bg-primary glass text-white shadow-headerMenu dark:text-white rounded-md p-1"  />
            </div>
          </Drawer>
        </div>
      </div>
      {/* Input Search */}
      <div className="relative flex items-center">
        <Input
          className="w-full text-black focus:outline-none dark:border-white dark:bg-transparent dark:text-white"
          type="text"
        />
        <IoSearchOutline className="absolute right-2 h-5 w-5 cursor-pointer text-gray-50" />
      </div>
    </div>
  );
};

export default HeaderResponsive;
