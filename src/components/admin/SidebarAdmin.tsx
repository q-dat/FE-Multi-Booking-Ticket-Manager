import React, { useState, useEffect } from 'react';
import { Button, Menu } from 'react-daisyui';
import { FaHome } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../../assets/images';

const SidebarAdmin: React.FC<{}> = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', icon: FaHome, link: '/admin' },
    { name: 'Page2', icon: FaHome, link: '/' }
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(item => pathname === item.link);
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);

  return (
    <div className="h-screen flex-col justify-evenly bg-white xl:fixed xl:flex xl:w-64 xl:shadow-lg">
      <div className="flex items-center justify-center">
        <img width={150} src={Logo} alt="Admin" />
      </div>
      <div className="h-[300px] overflow-y-scroll scrollbar-hide">
        <Menu className="flex-grow">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Menu.Item key={item.name} className="relative">
                <NavLink
                  to={item.link}
                  className={`btn flex w-full items-center justify-start border-none shadow-white ${
                    item.name === activeItem
                      ? 'bg-base-200 font-bold text-primary'
                      : 'bg-transparent bg-white font-light text-black'
                  } relative pl-4`}
                >
                  <>
                    {item.name === activeItem && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                    )}
                    <Icon
                      className={
                        item.name === activeItem
                          ? 'ml-2 mr-2 h-5 w-5 text-primary'
                          : 'mr-2 h-5 w-5'
                      }
                    />
                    {item.name}
                  </>
                </NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-primary p-4 text-center text-white">
          <p className="w-40 text-center text-xs">
            Chọn nút bên dưới để thêm danh mục!
          </p>
          <Button className="my-4 rounded-lg bg-white text-primary">
            +Thêm Danh Mục
          </Button>
        </div>
        <div className="py-4 text-xs text-black">
          <p className="font-bold">Quản trị Qdat-Shop </p>
          <p className="font-light">© 2024 đã đăng ký bản quyền</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
