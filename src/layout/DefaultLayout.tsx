import React from 'react';
import { Outlet } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import NotificationPopup from '../components/NotificationPopup';

const DefaultLayout: React.FC<{}> = () => {
  return (
    <div className="bg-white dark:bg-gray-600">
      <Outlet />
      <ContactForm/>
      <NotificationPopup/>
    </div>
  );
};

export default DefaultLayout;
