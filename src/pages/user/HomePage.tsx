import React, { useEffect, useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { ILocation } from '../../types/location/location';
const Home: React.FC = () => {
  //Translation
  const { t } = useTranslation();

  // Naviga Active
  const [activeItem, setActiveItem] = useState('Hà Nội');
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.split('/').pop();
    const foundItem = FecthLocation.find(item => item.name === pathname);
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname]);

  const FecthLocation: ILocation[] = [
    {
      name: 'Hà Nội',
      _id: ''
    },
    {
      name: 'Ninh Bình',
      _id: ''
    },
    {
      name: 'Thanh Hoá',
      _id: ''
    },
    {
      name: 'Vinh',
      _id: ''
    },
    {
      name: 'Đà Nẵng',
      _id: ''
    },
    {
      name: 'Huế',
      _id: ''
    }
  ];
  const [value, setValue] = useState('default');
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* Banner */}
      <div className="relative">
        <div className="absolute bottom-0 left-2 top-[50%] md:bottom-4 md:top-[30%] xl:left-[20%] xl:top-[40%]">
          <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[25px] font-bold text-transparent dark:from-[#122969] dark:to-gray-100 md:text-[40px]">
            {t('UserPage.BannerTitle')}
          </p>
          <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-light text-transparent dark:from-[#122969] dark:to-[#122969]">
            {t('UserPage.BannerSubtitle')}
          </p>
        </div>
        {/* Banner IMG */}
        <div>
          <img src={Banner} className="hidden w-full xl:block" alt="Banner" />
          <img
            className="block h-[150px] w-full object-cover xl:hidden"
            src={Banner}
            alt="Banner"
          />
        </div>
      </div>
      {/* Form */}
      <form>
        <div className="relative top-1 flex flex-grow items-center justify-center px-2 pb-10 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
          <div className="flex flex-col rounded-lg border border-primary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
            {/* Form Mobile 1 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-primary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
                type={'text'}
                placeholder={`${t('UserPage.DeparturePlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-primary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'text'}
                placeholder={`${t('UserPage.DestinationPlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            </div>
            {/* Form Mobile 2 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              {' '}
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-primary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary dark:border-primary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                classNameLabel=" bg-white  dark:bg-gray-700"
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
      </form>
      {/* Section */}
      <div className="flex flex-col items-center justify-center px-2 md:flex-row md:gap-20 xl:px-[100px]">
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionOne} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('UserPage.SectionOneTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionOneDescription')}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionTwo} alt="" />
          <p className="text-xl font-bold text-[#122969] dark:text-white">
            {t('UserPage.SectionTwoTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionTwoDescription')}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
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
        <div className="relative overflow-hidden rounded-lg xl:col-span-2 xl:w-full">
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
        <div className="relative overflow-hidden rounded-lg xl:col-span-2 xl:w-full">
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
      {/* Location */}
      <div className="px-2 xl:px-[100px]">
        <div className="my-5 font-bold">Giá Vé Tàu Hoả</div>
        <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
          {FecthLocation.map(item => (
            <Button
              key={item._id}
              className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out ${
                item.name === activeItem
                  ? 'bg-primary text-white hover:bg-primary hover:text-white'
                  : 'bg-white text-primary'
              }`}
              onClick={() => setActiveItem(item.name)}
            >
              <span>{item.name}</span>
            </Button>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;

