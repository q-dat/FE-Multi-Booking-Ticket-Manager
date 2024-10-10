import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import NotificationPopup from '../../components/UserPage/NotificationPopup';

const User: React.FC = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="bg-white dark:bg-[#0e3043]">
        <Header />
        <Outlet />
        <ContactForm />
        <NotificationPopup />
      </div>
      <div>
        <FooterFC />
      </div>
    </div>
  );
};

export default User;
