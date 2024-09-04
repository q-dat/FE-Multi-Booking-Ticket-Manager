import React, { useEffect, useState } from "react";
import { Button, Menu } from "react-daisyui";
import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { MdEmail } from "react-icons/md";
import { LuSearchCheck } from "react-icons/lu";
import { GiReturnArrow } from "react-icons/gi";
import { IoTicket, IoTime } from "react-icons/io5";

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
        { name: "Tìm Vé",icon:LuSearchCheck, link: "/" },
        { name: "Trả vé",icon: GiReturnArrow, link: "/" },
        { name: "Kiểm tra vé",icon:IoTicket, link: "/" },
        { name: "Giờ tàu - Giá vé",icon:IoTime, link: "/" },
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

  return (
    <div className="hidden xl:flex flex-row justify-center items-center bg-white bg-opacity-50 shadow-md fixed w-full z-[99999] uppercase">
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
                        ? "text-sm bg-primary bg-opacity-20 font-bold text-primary"
                        : "text-sm border-none shadow-none font-light text-black hover:text-primary hover:bg-opacity-30 hover:bg-gray-50 hover:border hover:border-primary"
                    }`}
              >
                <>
                  {item.name === activeItem && (
                    <div className="absolute left-0 bottom-0 h-[2px] w-full bg-primary" />
                  )}
                  {Icon && (
                    <Icon
                      className={
                        item.name === activeItem
                          ? "h-5 w-5 text-primary"
                          : "h-5 w-5"
                      }
                    />
                  )}
                  <span className={Icon ? "" : ""}>{item.name}</span>
                </>
              </NavLink>
              {item.submenu && (
                <Menu className="hidden shadow-mainMenu absolute w-[300px] top-full p-4 m-0 bg-white rounded-sm flex-col gap-2 group-hover:flex ">
                  {item.submenu.map((subItem) => (
                    <Link to={subItem.link} className="flex flex-row gap-0">
                      <Button
                        size="sm"
                        className="text-sm uppercase  shadow-headerMenu flex flex-row justify-start items-center bg-primary w-full text-white border-none rounded-sm hover:bg-opacity-50 hover:bg-primary hover:text-black hover:h-[50px]"
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
    </div>
  );
};

export default Header;
