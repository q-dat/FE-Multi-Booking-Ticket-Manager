import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import NotificationPopup from '../../components/UserPage/NotificationPopup';
import SearchKey from '../../components/UserPage/SearchKey';

const User: React.FC = () => {
  return (
    <div>
      <Header />
      <SearchKey />
      <Outlet />
      <ContactForm />
      <NotificationPopup />
      <FooterFC/>
    </div>
  );
};

export default User;

