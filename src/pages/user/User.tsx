import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/LadingPage/Header";
import Footer from "../../components/LadingPage/Footer";
import ContactForm from "../../components/LadingPage/ContactForm";
import NotificationPopup from "../../components/LadingPage/NotificationPopup";

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
