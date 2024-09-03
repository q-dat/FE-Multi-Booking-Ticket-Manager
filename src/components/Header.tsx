import React, { useEffect, useState } from "react";
import { Button, Menu } from "react-daisyui";
import { FaHome } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link, NavLink, useLocation } from "react-router-dom";

interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string }[];
}
const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Trang Chủ");
  const location = useLocation();
  const menuItems: MenuItem[] = [
    { name: "Trang Chủ", icon: FaHome, link: "/" },
    {
      name: "Tìm Vé",

      link: "/",
      submenu: [
        { name: "Sub Item 1", link: "/#" },
        { name: "Sub Item 2", link: "/#" },
      ],
    },
    { name: "Thông tin đặt chỗ", link: "/" },
    { name: "Trả vé", link: "/" },
    { name: "Kiểm tra vé", link: "/" },
    { name: "Giờ tàu - Giá vé", link: "/" },
    { name: "Khuyến mại", link: "/" },
    { name: "Các quy định", link: "/" },
    { name: "Hướng dẫn", link: "/" },
    { name: "Liên hệ", link: "/" },
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
    <div className="flex flex-row justify-center items-center uppercase ">
      <Menu className="flex-row">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Menu.Item key={item.name} className="relative group">
              <NavLink
                to={item.link}
                className={`
                    btn rounded-none flex w-full items-center justify-start border-none shadow-white
                    ${
                      item.name === activeItem
                        ? "bg-gray-50 bg-opacity-20 font-bold text-primary"
                        : "bg-transparent bg-white font-light text-black"
                    }
                    relative pl-4
                  `}
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
                <Menu className="absolute top-full p-4  hidden flex-col gap-2 group-hover:flex shadow-headerMenu">
                  {item.submenu.map((subItem) => (
                    <Link to={subItem.link}>
                      <Button
                        size="sm"
                        className="bg-primary shadow-mainMenu text-white border-none rounded-sm hover:bg-opacity-50 hover:bg-primary"
                      >
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
