import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/UserPage/Header';
import FooterFC from '../../components/UserPage/Footer';
import ContactForm from '../../components/UserPage/ContactForm';
// import NotificationPopup from '../../components/UserPage/NotificationPopup';
import ReCAPTCHA from 'react-google-recaptcha';

const User: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/checkout' && location.pathname !== '/verify') {
      localStorage.setItem('userPath', location.pathname);
    }
  }, [location]);
  // Xử lý ReCAPTCHA token
  const handleRecaptcha = (token: string | null) => {
    if (token) {
      console.log('ReCAPTCHA Token:', token);
      // Bạn có thể gửi token này đến backend để xác minh
    }
  };
  return (
    <div className="flex h-full flex-col justify-between bg-white dark:bg-[#0e3043]">
      <div className="">
        <Header />
        <Outlet />
        <ContactForm />
        {/* <NotificationPopup /> */}
        <FooterFC />
      </div>
        <div>
          <ReCAPTCHA
            sitekey="6LeCX44qAAAAAPNAde-unavcsxZVROmgr2XiTxUg"
            size="invisible"
            // badge="bottomright"
            onChange={handleRecaptcha}
          />
        </div>
    </div>
  );
};

export default User;
