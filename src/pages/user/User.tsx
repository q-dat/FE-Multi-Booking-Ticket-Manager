import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import ScrollToTopButton from '../../components/orther/scrollToTop/ScrollToTopButton';
// import NotificationPopup from '../../components/UserPage/NotificationPopup';g

const User: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/checkout' && location.pathname !== '/verify') {
      localStorage.setItem('userPath', location.pathname);
    }
  }, [location]);
  return (
    <div className="flex h-full flex-col justify-between bg-white dark:bg-[#0e3043]">
      <div className="">
        <Header />
        <Outlet />
        <ScrollToTopButton />
        <ContactForm />
        {/* <NotificationPopup /> */}
        <FooterFC />
      </div>
    </div>
  );
};

export default User;
