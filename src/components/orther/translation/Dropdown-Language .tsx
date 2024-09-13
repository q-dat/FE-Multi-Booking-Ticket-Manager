/* eslint-disable @typescript-eslint/no-explicit-any */
import i18next from 'i18next';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Button, Dropdown } from 'react-daisyui';
import { useTranslation } from 'react-i18next';
import { lngs } from '../../../contants';

const DropdownLanguage: React.FC = ({}) => {
  const { t, i18n } = useTranslation();

  const SwitchLanguge = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = Object.values(lngs).find(
    lng => lng.key === i18next.language
  ) || { key: 'en', countryCode: 'US' };

  return (
    <div>
      <Dropdown>
        <Button
          size="md"
          className="flex cursor-pointer flex-row items-center justify-center rounded-md border-none bg-white bg-opacity-20 text-black shadow-headerMenu dark:bg-black dark:bg-opacity-20 dark:text-white"
        >
          <ReactCountryFlag countryCode={currentLanguage.countryCode} svg />
          {t(`LanguageSwitch.${currentLanguage.key}` as any)}
        </Button>
        <Dropdown.Menu className="flex w-40 items-center justify-center bg-white dark:bg-gray-700 dark:bg-opacity-50 dark:text-white">
          <Dropdown.Item
            onClick={() => SwitchLanguge(lngs.en.key)}
            tabIndex={0}
            className={
              i18next.language === lngs.en.key
                ? 'bg-white text-black dark:bg-gray-700 dark:text-white'
                : 'dark:bg-gray-700 dark:bg-opacity-0'
            }
          >
            <ReactCountryFlag countryCode={lngs.en.countryCode} svg />
            {t('LanguageSwitch.en')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => SwitchLanguge(lngs.vi.key)}
            tabIndex={0}
            className={
              i18next.language === lngs.vi.key
                ? 'bg-white text-black dark:bg-gray-700 dark:text-white'
                : 'dark:bg-gray-700 dark:bg-opacity-0'
            }
          >
            <ReactCountryFlag countryCode={lngs.vi.countryCode} svg />
            {t('LanguageSwitch.vi')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownLanguage;

