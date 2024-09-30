import React from 'react';
import { Footer } from 'react-daisyui';
import { FaCcVisa } from 'react-icons/fa6';
import { FaCcApplePay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LogoTitle } from '../../assets/images';
import { useTranslation } from 'react-i18next';
const FooterFC: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  return (
    <div>
      <Footer className="item-center grid grid-cols-2 justify-between bg-primary p-10 px-2 text-white md:grid-cols-5 xl:px-[100px]">
        <div>
          <img width={140} loading="lazy" src={LogoTitle} alt="LOGO" />
        </div>
        <div>
          <Footer.Title>{t('UserPage.Footer.Services')}</Footer.Title>
          <Link className="hover:text-secondary" to={''}>
            {t('UserPage.Footer.BookTickets')}
          </Link>
          <Link className="hover:text-secondary" to={''}>
            {t('UserPage.Footer.ReturnTicket')}
          </Link>
          <Link className="hover:text-secondary" to={''}>
            {t('UserPage.Footer.CheckTicket')}
          </Link>
        </div>
        <div>
          <Footer.Title> {t('UserPage.Footer.AboutUs')}</Footer.Title>
          <Link className="hover:text-secondary" to={''}>
            {t('UserPage.Footer.About')}{' '}
          </Link>
          <Link className="hover:text-secondary" to={''}>
            {t('UserPage.Footer.BookingInfo')}
          </Link>
        </div>
        <div>
          <Footer.Title>{t('UserPage.Footer.Contact')}</Footer.Title>
          <Link className="hover:text-secondary" to="tel:">
            {t('UserPage.Location.HaNoi')}: 0123456789
          </Link>
          <Link className="hover:text-secondary" to="tel:">
            {t('UserPage.Location.SaiGon')}: 0987654321
          </Link>
          <Link className="hover:text-secondary" to="tel:0333133050">
            HotLine: 0333133050
          </Link>
          <Link
            className="hover:text-secondary"
            to="mailto:laclactrip@gmail.com"
          >
            Email: laclactrip@gmail.com
          </Link>
        </div>
        <div>
          <Footer.Title>{t('UserPage.Footer.PaymentMethod')}</Footer.Title>
          <div className="flex gap-2">
            <Link className="text-[40px] hover:text-secondary" to={''}>
              <FaCcVisa />
            </Link>
            <Link className="text-[40px] hover:text-secondary" to={''}>
              <FaCcApplePay />
            </Link>
          </div>
        </div>
      </Footer>
      <hr />
      <div className="bg-primary py-2 text-center text-white">
        © 2024 Copyright By LacLacTeam
      </div>
    </div>
  );
};

export default FooterFC;
