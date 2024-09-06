import React, { useEffect, useState } from "react";
import { Button, Menu } from "react-daisyui";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { MdEmail } from "react-icons/md";
import { LuSearchCheck } from "react-icons/lu";
import { GiReturnArrow } from "react-icons/gi";
import { IoTicket, IoTime } from "react-icons/io5";
import DarkMode from "../orther/darkmode/DarkMode";
import { Logo } from "../../assets/images";
import HeaderResponsive from "./HeaderResponsive";
import DropdownLanguage from "../orther/translation/Dropdown-Language ";

interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}
const Header: React.FC = () => {
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
        { name: "Hotline: 0333133050", icon: FaPhoneAlt, link: "tel:0333133050" },
        { name: "Email: fpttrain@gmail.com", icon: MdEmail, link: "mailto:fpttrain@gmail.com" },
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

  return (
    <div>
      {/* Mobile */}
      <div>
        <HeaderResponsive />
      </div>
      {/* Desktop */}
      <div className="hidden xl:flex flex-row justify-evenly items-center dark:bg-gray-700 dark:bg-opacity-50 bg-white bg-opacity-50 shadow-md fixed w-full z-[99999] uppercase">
        <div>
          <img
            className="object-cover"
            width={80}
            loading="lazy"
            src={Logo}
            alt="LOGO"
          />
        </div>
        <Menu className="flex-row">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Menu.Item key={item.name} className="relative group">
                <NavLink
                  to={item.link}
                  className={`
                    btn rounded-none flex w-full items-center justify-center border-none relative pl-4
                    ${
                      item.name === activeItem
                        ? "text-sm bg-primary bg-opacity-20 font-bold text-primary dark:bg-opacity-50 dark:text-white"
                        : "text-sm border-none shadow-none font-light text-black hover:text-primary hover:bg-opacity-30 hover:bg-gray-50 hover:border hover:border-primary  dark:text-white"
                    }`}
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
                  </>
                </NavLink>
                {/* SubMenu */}
                {item.submenu && (
                  <Menu className="hidden shadow-mainMenu absolute w-[260px] top-full p-4 m-0 glass bg-white bg-opacity-40 rounded-sm flex-col gap-2 group-hover:flex ">
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.link}
                        className="flex flex-row gap-0"
                      >
                        <Button
                          size="sm"
                          className="text-sm shadow-headerMenu flex flex-row justify-start items-center bg-primary w-full text-white dark:text-black border-none rounded-sm hover:bg-opacity-50 dark:hover:bg-opacity-70 hover:bg-primary hover:text-black dark:hover:text-white hover:h-[50px]"
                        >
                          {subItem.icon && <subItem.icon />}
                          {subItem.name}
                        </Button>
                      </Link>
                    ))}
                  </Menu>
                )}
              </Menu.Item>
            );
          })}
        </Menu>
        {/* DarkMode Button */}
        <div className="flex items-center justify-center gap-5">
          <DarkMode />
          <DropdownLanguage />
        </div>
      </div>
    </div>
  );
};

export default Header;
