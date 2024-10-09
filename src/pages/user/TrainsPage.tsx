import React, { useEffect, useRef, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { ILocation } from '../../types/type/location/location';
import { BannerTrain, HaNoi } from '../../assets/image-represent';

interface Card {
  id?: number;
  title?: string;
  description?: string;
  image?: string;
}
const TrainsPage: React.FC<Card> = () => {
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
      _id: '',
      createAt: '',
      updateAt: ''
    },
    {
      name: 'Ninh Bình',
      _id: '',
      createAt: '',
      updateAt: ''
    },
    {
      name: 'Thanh Hoá',
      _id: '',
      createAt: '',
      updateAt: ''
    },
    {
      name: 'Vinh',
      _id: '',
      createAt: '',
      updateAt: ''
    },
    {
      name: 'Đà Nẵng',
      _id: '',
      createAt: '',
      updateAt: ''
    },
    {
      name: 'Huế',
      _id: '',
      createAt: '',
      updateAt: ''
    }
  ];

  // Sử dụng useRef với kiểu HTMLDivElement
  const scrollRef = useRef<HTMLDivElement>(null);

  // Danh sách các thẻ card
  const cards: Card[] = [
    {
      id: 1,
      title: 'Card 1',
      description: 'Description for Card 1',
      image: `${HaNoi}`
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'Description for Card 2',
      image: `${HaNoi}`
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'Description for Card 3',
      image: `${HaNoi}`
    },
    {
      id: 4,
      title: 'Card 4',
      description: 'Description for Card 4',
      image: `${HaNoi}`
    },
    {
      id: 5,
      title: 'Card 5',
      description: 'Description for Card 5',
      image: `${HaNoi}`
    }
  ];

  // Hàm cuộn theo hướng
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Buses')} />
      <div className="">
        {/* Banner */}
        <div>
          <img
            src={BannerTrain}
            className="hidden w-full xl:block dark:xl:hidden"
            alt="Banner"
          />
          <img
            src={BannerTrain}
            className="hidden w-full dark:xl:block"
            alt="Banner"
          />
          <img
            className="block h-[150px] w-full object-cover xl:hidden"
            src={BannerTrain}
            alt="Banner"
          />
        </div>
        {/* Form */}
        <form>
          <div className="relative top-1 flex flex-grow items-center justify-center px-2 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
            <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
              {/* Form Mobile 1 */}
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                <InputForm
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
                  type={'text'}
                  placeholder={`${t('UserPage.DeparturePlaceholder')}`}
                  classNameLabel=" bg-white  dark:bg-gray-700"
                />
                <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
                <InputForm
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
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
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                  type={'date'}
                  placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                  classNameLabel=" bg-white  dark:bg-gray-700"
                />
                <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
                <InputForm
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                  type={'date'}
                  placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                  classNameLabel=" bg-white  dark:bg-gray-700"
                />{' '}
                {/* <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" /> */}
              </div>
              {/* Form Mobile 3 */}
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                {/* <div>
                <Select
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
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
              </div> */}
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
        <div className="px-2 xl:px-[100px]">
          <div className="my-5 rounded-lg bg-primary py-2 text-center text-3xl font-bold text-white dark:bg-white dark:text-primary xl:mt-0">
            {t('UserPage.TicketPrice')}
          </div>
          <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
            {FecthLocation.map(item => (
              <Button
                key={item._id}
                className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
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

          {/* Card */}
          <div className="my-5">
            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cards.map(card => (
                <div
                  key={card.id}
                  className="w-full flex-none transform overflow-hidden rounded-lg bg-white text-black shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-secondary hover:text-white sm:w-80"
                >
                  <img
                    className="h-48 w-full object-cover"
                    src={card.image}
                    alt={card.title}
                  />
                  <div className="p-4">
                    <p className="mb-2 truncate text-lg font-semibold">
                      {card.title}
                    </p>
                    <p className="mb-4 line-clamp-2 text-sm">
                      {card.description}
                    </p>
                    <Button
                      className="w-full bg-primary font-light text-white hover:border-primary hover:bg-white hover:font-bold hover:text-primary"
                      aria-label={`View details for ${card.title}`}
                    >
                      {t('UserPage.Details')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Navigation Button  */}
            <div className="flex w-full items-center justify-between space-x-2">
              <Button
                onClick={() => scroll(-200)}
                className="text-primary dark:text-white"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => scroll(200)}
                className="text-primary dark:text-white"
                aria-label="Scroll right"
              >
                <FaChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default TrainsPage;
