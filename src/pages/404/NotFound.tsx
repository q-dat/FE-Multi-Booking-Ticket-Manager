import React from 'react';
import { Button, Hero } from 'react-daisyui';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotFounds } from '../../assets/image-represent';

const NotFound: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Hero
        className="h-screen w-full"
        style={{
          backgroundImage: `url(${NotFounds})`
        }}
      >
        <Hero.Overlay />
        <Hero.Content className="text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">
              {t('NotFoundPage.title')}
            </h1>
            <p className="py-6 text-white">{t('NotFoundPage.message')}</p>

            <div className="flex items-center justify-center gap-4">
              <Link to="/">
                <Button color="primary" className="text-white">
                  {t('NotFoundPage.homeButton')}
                </Button>
              </Link>

              <Link to="/auth/login">
                <Button color="secondary" className="text-white">
                  {t('NotFoundPage.loginButton')}
                </Button>
              </Link>
            </div>
          </div>
        </Hero.Content>
      </Hero>
    </div>
  );
};

export default NotFound;
