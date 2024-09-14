import React, { useState } from 'react';
import { Button, Select } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { IoLocationOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import {
  Hue,
  Vinh,
  HaNoi,
  Banner,
  DaNang,
  ThanhHoa,
  NinhBinh,
  sectionOne,
  sectionTwo,
  sectionThree
} from '../../assets/image-represent';
import { useTranslation } from 'react-i18next';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link } from 'react-router-dom';

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
            {t('UserPage.BannerTitle')}
          </p>
          <p className="text-md bg-gradient-to-r from-white to-white bg-clip-text font-light text-transparent dark:from-[#122969] dark:to-[#122969]">
            {t('UserPage.BannerSubtitle')}
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
              type={'text'}
              placeholder={`${t('UserPage.DeparturePlaceholder')}`}
            />
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={'text'}
              placeholder={`${t('UserPage.DestinationPlaceholder')}`}
            />
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
          </div>
          {/* Form Mobile 2 */}
          <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
            {' '}
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={'date'}
              placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
            />
            <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            <InputForm
              className="w-[150px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
              type={'date'}
              placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
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
                  {t('UserPage.AgeSelectDefault')}
                </option>
                <option value={'Người Nhỏ'}>Người Nhỏ</option>
                <option value={'Người Vừa'}>Người Vừa</option>
                <option value={'Người Lớn'}>Người Lớn</option>
              </Select>
            </div>
            <div>
              <Button className="w-[150px] bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700 md:w-[300px] lg:w-[400px] xl:ml-3 xl:w-full">
                <IoSearch />
                {t('UserPage.SearchButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Section */}
      <div className="flex flex-col items-center justify-center px-2 md:flex-row md:gap-20 xl:px-0">
        <div className="flex w-[350px] flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionOne} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('UserPage.SectionOneTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionOneDescription')}
          </p>
        </div>
        <div className="flex w-[350px] flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionTwo} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('UserPage.SectionTwoTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionTwoDescription')}
          </p>
        </div>
        <div className="flex w-[350px] flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionThree} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('UserPage.SectionThreeTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionThreeDescription')}
          </p>
        </div>
      </div>
      {/* Grid IMG */}
      <div className="mt-10 grid grid-cols-1 gap-3 px-2 md:grid-cols-3 xl:grid-cols-4 xl:px-[100px]">
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={HaNoi}
              alt="HaNoi"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-bold text-black">
              <IoLocationOutline className="text-xl text-[#f7aaab]" /> Hà Nội
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={NinhBinh}
              alt="NinhBinh"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-bold text-black">
              <IoLocationOutline className="text-xl text-[#f7aaab]" /> Ninh Bình
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg xl:col-span-2 xl:w-[615px]">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={ThanhHoa}
              alt="ThanhHoa"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-bold text-black">
              <IoLocationOutline className="text-xl text-[#f7aaab]" /> Thanh Hoá
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg xl:col-span-2 xl:w-[615px]">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={Vinh}
              alt="Vinh"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-bold text-black">
              <IoLocationOutline className="text-xl text-[#f7aaab]" /> Vinh
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={DaNang}
              alt="DaNang"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-bold text-black">
              <IoLocationOutline className="text-xl text-[#f7aaab]" /> Đà Nẵng
            </span>
          </Link>
        </div>
        {/*  */}
        <div className="relative overflow-hidden rounded-lg">
          <Link to="">
            <img
              className="h-[200px] w-full cursor-pointer object-cover transition-transform duration-1000 ease-in-out hover:scale-125"
              src={Hue}
              alt="Hue"
            />
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-bold text-black">
              <IoLocationOutline className="text-xl text-[#f7aaab]" /> Huế
            </span>
          </Link>
        </div>
      </div>
      {/*  */}
      <div className="px-2 xl:px-[100px]">
        <div className="my-5 font-bold">Giá Vé Tàu Hoả</div>
        <div className="flex flex-row gap-5">
          <Button>Hà Nội</Button>
          <Button>Ninh Bình</Button>
          <Button>Thanh Hoá</Button>
          <Button>Vinh</Button>
          <Button>Đà Nẵng</Button>
          <Button>Huế</Button>
          <Button>Sài Gòn</Button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;

