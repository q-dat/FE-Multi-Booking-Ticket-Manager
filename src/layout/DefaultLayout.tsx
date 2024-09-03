import React from 'react';
import { Outlet } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import NotificationPopup from '../components/NotificationPopup';

const DefaultLayout: React.FC<{}> = () => {
  return (
    <div className="">
      <Outlet />
      <ContactForm/>
      <NotificationPopup/>
    </div>
  );
};

export default DefaultLayout;
