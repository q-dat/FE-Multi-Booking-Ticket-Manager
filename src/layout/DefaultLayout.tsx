import React from "react";
import { Outlet } from "react-router-dom";
import ContactForm from "../components/LadingPage/ContactForm";
import NotificationPopup from "../components/LadingPage/NotificationPopup";
import Header from "../components/LadingPage/Header";
import Footer from "../components/LadingPage/Footer";

const DefaultLayout: React.FC<{}> = () => {
  return (
    <div className="bg-white dark:bg-gray-600">
      <Header />
      <Outlet />
      <ContactForm />
      <NotificationPopup />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
