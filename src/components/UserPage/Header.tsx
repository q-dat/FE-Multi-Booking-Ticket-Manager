import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'react-daisyui';
import { FaChevronDown, FaHome } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import { GiReturnArrow } from 'react-icons/gi';
import { IoTicket } from 'react-icons/io5';
import DarkMode from '../orther/darkmode/DarkMode';
import { Logo, LogoTitle } from '../../assets/images';
import DropdownLanguage from '../orther/translation/Dropdown-Language ';
import { useTranslation } from 'react-i18next';

interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}
const Header: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const handleMouseEnter = (name: string) => {
    setOpenSubmenu(name);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };
  // Naviga Active
  const [activeItem, setActiveItem] = useState(`${t('UserPage.Navbar.Home')}`);
  const location = useLocation();
  const menuItems: MenuItem[] = [
    {
      name: `${t('UserPage.Navbar.Home')}`,
      icon: FaHome,
      link: '/'
    },
    {
      name: `${t('UserPage.Navbar.Trains')}`,
      link: '/trains'
    },
    {
      name: `${t('UserPage.Navbar.Buses')}`,
      link: '/buses'
    },
    {
      name: `${t('UserPage.Navbar.Flights')}`,
      link: '/flights'
    },

    {
      name: `${t('UserPage.Navbar.BookingInfo')}`,
      link: '/check-ticket',
      submenu: [
        {
          name: `${t('UserPage.Navbar.ReturnTicket')}`,
          icon: GiReturnArrow,
          link: '/return-ticket'
        },
        {
          name: `${t('UserPage.Navbar.CheckTicket')}`,
          icon: IoTicket,
          link: '/check-ticket'
        }
      ]
    },
    {
      name: `${t('UserPage.Navbar.Contact')}`,
      link: '/contact'
    }
  ];
  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(
      item =>
        item.link === pathname ||
        item.submenu?.some(sub => sub.link === pathname)
    );
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);

  return (
    <div>
      {/* Desktop */}
      <div className="fixed z-[99999] hidden h-[80px] w-full flex-row items-center justify-evenly bg-white bg-opacity-90 py-2 uppercase shadow-md dark:bg-primary dark:bg-opacity-90 xl:flex">
        <Menu className="flex flex-row items-center justify-center">
          <Link to="/">
            <img
              className="mr-[200px] block object-cover dark:hidden"
              width={60}
              loading="lazy"
              src={Logo}
              alt="LOGO"
            />
            <img
              className="mr-[200px] hidden object-cover dark:block"
              width={60}
              loading="lazy"
              src={LogoTitle}
              alt="LOGO"
            />
          </Link>
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Menu.Item
                key={item.name}
                className="group relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={item.link}
                  className={`btn relative flex w-full items-center justify-center rounded-none border-none pl-4 ${
                    item.name === activeItem
                      ? 'bg-primary bg-opacity-20 text-sm font-bold text-primary dark:bg-secondary dark:bg-opacity-40 dark:text-white'
                      : 'border-none bg-transparent text-sm font-light text-black shadow-none hover:border hover:border-primary hover:bg-gray-50 hover:bg-opacity-30 hover:text-primary dark:text-white'
                  }`}
                >
                  <>
                    {item.name === activeItem && (
                      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary dark:bg-white" />
                    )}
                    {Icon && (
                      <Icon
                        className={
                          item.name === activeItem
                            ? 'h-5 w-5 text-primary dark:text-white'
                            : 'h-5 w-5'
                        }
                      />
                    )}
                    <span className={Icon ? '' : ''}>{item.name}</span>
                    {item.submenu && (
                      <FaChevronDown
                        className={`m-0 h-4 w-4 p-0 ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                      />
                    )}
                  </>
                </NavLink>
                {/* SubMenu */}
                {item.submenu && (
                  <Menu className="glass absolute top-full m-0 hidden w-[260px] flex-col gap-2 rounded-sm bg-white bg-opacity-40 p-4 shadow-mainMenu group-hover:flex">
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.link}
                        className="flex flex-row gap-0"
                      >
                        <Button
                          size="sm"
                          className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm text-white shadow-headerMenu hover:h-[50px] hover:bg-primary hover:bg-opacity-50 dark:hover:bg-opacity-70"
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
        <div className="flex items-center justify-center gap-5">
          {/* DarkMode Button */}
          <DropdownLanguage />
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Header;
