import React, { useState } from 'react';
import { Button, Select } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import {
  Banner,
  sectionOne,
  sectionThree,
  sectionTwo
} from '../../assets/image-represent';
import { useTranslation } from 'react-i18next';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';

const Home: React.FC = () => {
  //Translation
  const { t } = useTranslation();

  const [value, setValue] = useState('default');
  return (
    <div>
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* Banner */}
      <div className="relative">
        <div className="absolute bottom-0 left-2 md:bottom-4 xl:left-[20%] xl:top-[40%]">
          <p className="text-md bg-gradient-to-r from-white to-white bg-clip-text font-bold text-transparent dark:from-[#122969] dark:to-gray-100 md:text-[40px]">
            {t('LandingPage.BannerTitle')}
          </p>
          <p className="text-md bg-gradient-to-r from-white to-white bg-clip-text font-light text-transparent dark:from-[#122969] dark:to-[#122969]">
            {t('LandingPage.BannerSubtitle')}
          </p>
        </div>
        {/* Banner IMG */}
        <div>
          <img className="w-full" src={Banner} alt="Banner" />
        </div>
      </div>
      {/* Form */}
      <div className="relative top-1 flex flex-grow items-center justify-center px-2 pb-10 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
        <div className="flex flex-col rounded-lg border border-primary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
          {/* Form Mobile 1 */}
          <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
              type={''}
              placeholder={`${t('LandingPage.DeparturePlaceholder')}`}
            />
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={'text'}
              placeholder={`${t('LandingPage.DestinationPlaceholder')}`}
            />
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
          </div>
          {/* Form Mobile 2 */}
          <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
            {' '}
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={'date'}
              placeholder={`${t('LandingPage.DepartureDatePlaceholder')}`}
            />
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={'date'}
              placeholder={`${t('LandingPage.ReturnDatePlaceholder')}`}
            />{' '}
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
          </div>
          {/* Form Mobile 3 */}
          <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
            <div>
              <Select
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-primary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                value={value}
                onChange={event => setValue(event.target.value)}
              >
                <option value={'default'} disabled>
                  {t('LandingPage.AgeSelectDefault')}
                </option>
                <option value={'Người Nhỏ'}>Người Nhỏ</option>
                <option value={'Người Vừa'}>Người Vừa</option>
                <option value={'Người Lớn'}>Người Lớn</option>
              </Select>
            </div>
            <div>
              <Button className="w-[150px] bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700 md:w-[300px] lg:w-[400px] xl:ml-3 xl:w-full">
                <IoSearch />
                {t('LandingPage.SearchButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="flex flex-col items-center justify-center px-2 md:flex-row md:gap-20 xl:px-0">
        <div className="xs:px-2 flex w-[350px] flex-col items-center justify-center sm:px-0">
          <img width={300} src={sectionOne} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('LandingPage.SectionOneTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('LandingPage.SectionOneDescription')}
          </p>
        </div>
        <div className="xs:px-2 flex w-[350px] flex-col items-center justify-center sm:px-0">
          <img width={300} src={sectionTwo} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('LandingPage.SectionTwoTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('LandingPage.SectionTwoDescription')}
          </p>
        </div>
        <div className="xs:px-2 flex w-[350px] flex-col items-center justify-center sm:px-0">
          <img width={300} src={sectionThree} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('LandingPage.SectionThreeTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('LandingPage.SectionThreeDescription')}
          </p>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Home;

