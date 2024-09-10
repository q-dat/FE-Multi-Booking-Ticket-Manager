import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import Footer from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
import NotificationPopup from '../../components/UserPage/NotificationPopup';

const User: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <ContactForm />
      <NotificationPopup />
      <Footer />
    </div>
  );
};

export default User;

