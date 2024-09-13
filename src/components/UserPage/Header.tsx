import React, { useEffect, useState } from 'react';
import { Button, Menu } from 'react-daisyui';
import { FaChevronDown, FaHome, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import { MdEmail } from 'react-icons/md';
import { GiReturnArrow } from 'react-icons/gi';
import { IoTicket, IoTime } from 'react-icons/io5';
import DarkMode from '../orther/darkmode/DarkMode';
import { Logo } from '../../assets/images';
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
  //
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const handleMouseEnter = (name: string) => {
    setOpenSubmenu(name);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  const [activeItem, setActiveItem] = useState(
    `${t('LandingPage.Navbar.Home')}`
  );
  const location = useLocation();
  const menuItems: MenuItem[] = [
    {
      name: `${t('LandingPage.Navbar.Home')}`,
      icon: FaHome,
      link: ''
    },
    {
      name: `${t('LandingPage.Navbar.Trains')}`,
      link: ''
    },
    {
      name: `${t('LandingPage.Navbar.Buses')}`,
      link: ''
    },
    {
      name: `${t('LandingPage.Navbar.Flights')}`,
      link: ''
    },

    {
      name: `${t('LandingPage.Navbar.BookingInfo')}`,
      link: '',
      submenu: [
        {
          name: `${t('LandingPage.Navbar.ReturnTicket')}`,
          icon: GiReturnArrow,
          link: ''
        },
        {
          name: `${t('LandingPage.Navbar.CheckTicket')}`,
          icon: IoTicket,
          link: 'check-ticket'
        },
        {
          name: `${t('LandingPage.Navbar.TrainTimePrice')}`,
          icon: IoTime,
          link: ''
        }
      ]
    },
    {
      name: `${t('LandingPage.Navbar.Contact')}`,
      link: '',
      submenu: [
        {
          name: `${t('LandingPage.Navbar.Hotline')}`,
          icon: FaPhoneAlt,
          link: 'tel:0333133050'
        },
        {
          name: `${t('LandingPage.Navbar.Email')}`,
          icon: MdEmail,
          link: 'mailto:fpttrain@gmail.com'
        }
      ]
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
      <div className="fixed z-[99999] hidden w-full flex-row items-center justify-evenly bg-white bg-opacity-50 py-2 uppercase shadow-md dark:bg-gray-700 dark:bg-opacity-50 xl:flex">
        <Menu className="flex flex-row items-center justify-center">
          <Link to="/">
            <img
              className="mr-[200px] object-cover"
              width={60}
              loading="lazy"
              src={Logo}
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
                      ? 'bg-primary bg-opacity-20 text-sm font-bold text-primary dark:bg-opacity-50 dark:text-white'
                      : 'border-none text-sm font-light text-black shadow-none hover:border hover:border-primary hover:bg-gray-50 hover:bg-opacity-30 hover:text-primary dark:text-white'
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
                          className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm text-white shadow-headerMenu hover:h-[50px] hover:bg-primary hover:bg-opacity-50 hover:text-black dark:text-black dark:hover:bg-opacity-70 dark:hover:text-white"
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
          {/* Account */}
          <div className="flex flex-row items-center justify-center space-x-2 text-xs font-light text-black dark:text-white">
            <Link to="auth/login" className="rounded-sm">
              <Button className="flex cursor-pointer flex-row items-center justify-center rounded-md border-none bg-white bg-opacity-20 text-black shadow-headerMenu dark:bg-black dark:bg-opacity-20 dark:text-white">
                <FaUser /> {t('LoginBtn')}
              </Button>
            </Link>
          </div>
          {/* DarkMode Button */}
          <DropdownLanguage />
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Header;

