import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import NotificationPopup from '../../components/UserPage/NotificationPopup';

const User: React.FC = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <div>
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
