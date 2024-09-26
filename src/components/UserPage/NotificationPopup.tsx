import React, { useEffect, useState } from 'react';
import { Button, Hero } from 'react-daisyui';
import { FaHeadphones } from 'react-icons/fa';
import { employee } from '../../assets/image-represent';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotificationPopup: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('popupShown')) {
      setIsVisible(true);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupShown', 'true');
  };
  return (
    <div>
      {isVisible && (
        <div>
          <div
            id="popup-overlay"
            className="fixed left-0 top-0 z-50 h-full w-full cursor-pointer bg-black bg-opacity-50"
            onClick={closePopup}
          ></div>

          <div
            id="popup"
            className="fixed left-1/2 top-1/2 z-50 max-h-[90%] max-w-[90%] -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-lg bg-white shadow-lg"
          >
            <div className="flex flex-col items-end justify-center rounded-lg border border-white dark:border-opacity-50">
              {/* IMAGE BANNER */}
              <Hero>
                <Hero.Content>
                  <img
                    src={employee}
                    className="h-[240px] w-[200px] max-w-sm rounded-lg object-cover shadow-2xl md:h-[340px] md:w-[400px] xl:h-[270px] xl:w-[500px]"
                  />
                  <div>
                    <div className="rounded-xl bg-primary bg-opacity-15 p-2 shadow-headerMenu dark:bg-white dark:bg-opacity-25">
                      <h1 className="text-md text-bg-image font-bold md:text-3xl xl:text-5xl">
                        {t('NotificationPopup.title')}
                      </h1>
                    </div>
                    <p className="py-1 text-[10px] text-black md:py-6 md:text-lg">
                      {t('NotificationPopup.content')}
                    </p>
                    <Link to="#contact">
                      <Button
                        onClick={closePopup}
                        color="primary"
                        className="float-end border border-white text-white dark:border-opacity-50"
                      >
                        {t('NotificationPopup.CustomerService')}
                        <FaHeadphones />
                      </Button>
                    </Link>
                  </div>
                </Hero.Content>
              </Hero>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;

