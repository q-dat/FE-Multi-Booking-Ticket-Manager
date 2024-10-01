import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Button, Drawer, Input, Menu } from 'react-daisyui';
// Icon
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchOutline, IoSettingsSharp, IoTicket } from 'react-icons/io5';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaPhoneAlt, FaChevronDown, FaUser } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { MdEmail, MdLogout } from 'react-icons/md';
import { IconType } from 'react-icons/lib';
import DarkMode from '../orther/darkmode/DarkMode';
import DropdownLanguage from '../orther/translation/Dropdown-Language ';
import { useTranslation } from 'react-i18next';
import { Logo, LogoTitle } from '../../assets/images';
import { useAuth } from '../../context/AuthContext';

interface HeaderAuthProps {
  Title_NavbarMobile: ReactNode;
}
interface MenuItem {
  name: string;
  icon?: IconType;
  link: string;
  submenu?: { name: string; link: string; icon?: IconType }[];
}
const HeaderAuth: React.FC<HeaderAuthProps> = ({
  Title_NavbarMobile
}) => {
  // Translation
  const { t } = useTranslation();
  //leftVisible
  const [leftVisible, setLeftVisible] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  // Điều hướng
  const navigate = useNavigate();
  // Lấy data bên context
  const { user, logout } = useAuth();

  const toggleLeftVisible = useCallback(() => {
    setLeftVisible(visible => !visible);
  }, []);
  //rightVisible
  const [rightVisible, setRightVisible] = useState(false);

  const toggleRightVisible = useCallback(() => {
    setRightVisible(visible => !visible);
  }, []);
  const [activeItem, setActiveItem] = useState('Trang Chủ');
  const location = useLocation();
  const menuItems: MenuItem[] = [
    {
      name: `${t('UserPage.Navbar.Home')}`,
      icon: FaHome,
      link: '/'
    },
    {
      name: `${t('UserPage.Navbar.Trains')}`,
      link: ''
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
      link: '',
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
      link: '',
      submenu: [
        {
          name: 'Hotline: 0333133050',
          icon: FaPhoneAlt,
          link: 'tel:0333133050'
        },
        {
          name: 'laclactrip@gmail.com',
          icon: MdEmail,
          link: 'mailto:laclactrip@gmail.com'
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

  const handleMenuClick = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  // role = admin chuyển thẳng tới admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
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
                <div className="mb-5 flex items-center justify-center">
                  <img
                    className="hidden object-cover dark:block"
                    width={120}
                    loading="lazy"
                    src={LogoTitle}
                    alt="LOGO"
                  />
                  <img
                    className="block object-cover dark:hidden"
                    width={120}
                    loading="lazy"
                    src={Logo}
                    alt="LOGO"
                  />
                </div>
                {/* Menu */}
                {menuItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="relative">
                      <Menu.Item
                        className="group relative"
                        onClick={() =>
                          item.submenu && handleMenuClick(item.name)
                        }
                      >
                        <NavLink
                          to={item.link}
                          className={`btn relative mt-2 flex w-full flex-row items-center justify-between rounded-none border-none pl-4 pr-3 ${
                            item.name === activeItem
                              ? 'bg-secondary bg-opacity-30 text-sm font-bold text-primary dark:bg-opacity-50 dark:text-white'
                              : 'border-none bg-secondary bg-opacity-10 text-sm font-light text-black shadow-headerMenu dark:text-white'
                          } `}
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
                                className={`ml-2 h-4 w-4 ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                              />
                            )}
                          </>
                        </NavLink>
                      </Menu.Item>
                      {/* SubMenu */}
                      {item.submenu && openSubmenu === item.name && (
                        <div className="relative w-full space-y-2 rounded-sm bg-white p-4 shadow-md dark:bg-secondary dark:bg-opacity-50">
                          {item.submenu.map((subItem, index) => (
                            <Link
                              key={index}
                              to={subItem.link}
                              className="block"
                            >
                              <Button
                                size="sm"
                                className="flex w-full flex-row items-center justify-start rounded-sm border-none bg-primary text-sm uppercase text-white shadow-headerMenu"
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
              <RxHamburgerMenu className="glass rounded-md bg-primary p-1 text-[25px] text-white shadow-headerMenu dark:text-white" />
            </div>
          </Drawer>
        </div>
        {/* Title */}
        <p className="text-base font-bold uppercase text-primary dark:text-white">
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
                <div className="mb-5 flex items-center justify-center">
                  <img
                    className="hidden object-cover dark:block"
                    width={120}
                    loading="lazy"
                    src={LogoTitle}
                    alt="LOGO"
                  />
                  <img
                    className="block object-cover dark:hidden"
                    width={120}
                    loading="lazy"
                    src={Logo}
                    alt="LOGO"
                  />
                </div>
                <div className="w-full space-y-5">
                  {user && user.role === 'user' && (
                    <div className="flex flex-row items-center justify-between rounded-md bg-gray-700 bg-opacity-20 dark:bg-secondary dark:bg-opacity-10 p-2">
                      <p className="text-lg font-light text-black dark:text-white">
                        {t('UserPage.Navbar.LogoutBtn')}
                      </p>
                      <Button
                        onClick={handleLogout}
                        className="flex cursor-pointer flex-row items-center justify-center rounded-md border-none bg-white bg-opacity-20 text-black shadow-headerMenu dark:bg-black dark:bg-opacity-20 dark:text-white"
                      >
                        <MdLogout />
                      </Button>
                    </div>
                  )}
                  {!user && (
                    <div className="flex flex-row items-center justify-between rounded-md bg-gray-700 bg-opacity-20 dark:bg-secondary dark:bg-opacity-10 p-2">
                      <p className="text-lg font-light text-black dark:text-white">
                        {t('UserPage.Navbar.LoginBtn')}
                      </p>
                      <Link to="auth/login">
                        <Button className="flex cursor-pointer items-center justify-center rounded-md border-none bg-white bg-opacity-20 text-black shadow-headerMenu dark:bg-black dark:bg-opacity-20 dark:text-white">
                          <FaUser />
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex flex-row items-center justify-between rounded-md bg-gray-700 bg-opacity-20 dark:bg-secondary dark:bg-opacity-10 p-2">
                    <p className="text-lg font-light text-black dark:text-white">
                      {t('UserPage.Navbar.Theme')}
                    </p>
                    <DarkMode />
                  </div>
                  <div className="flex flex-row items-center justify-between rounded-md bg-gray-700 bg-opacity-20 dark:bg-secondary dark:bg-opacity-10 p-2">
                    <p className="text-lg font-light text-black dark:text-white">
                      {t('UserPage.Navbar.Translate')}
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
              <IoSettingsSharp className="glass rounded-md bg-primary p-1 text-[25px] text-white shadow-headerMenu dark:text-white" />
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

export default HeaderAuth;
