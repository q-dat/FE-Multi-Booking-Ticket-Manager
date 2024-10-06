import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Select } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { IoLocationOutline, IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import {
  Hue,
  Vinh,
  HaNoi,
  DaNang,
  ThanhHoa,
  NinhBinh,
  sectionOne,
  sectionTwo,
  sectionThree,
  Banner,
  BannerFlight
} from '../../assets/image-represent';
import { useTranslation } from 'react-i18next';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Link, useLocation } from 'react-router-dom';
import { ILocation } from '../../types/location/location';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TicketResults from '../../components/UserPage/TicketResults';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TicketContext } from '../../context/ticket/TicketContext';
import { ITicket, SearchFormData } from '../../types/type/ticket/ticket';

const Home: React.FC = () => {
  //Translation
  const { t } = useTranslation();
  //Search Ticket
  const searchTicket = useContext(TicketContext);
  if (!searchTicket) {
    throw new Error('TicketSearchForm must be used within a TicketProvider');
  }
  const { searchTickets, loading, error } = searchTicket;
  const { register, handleSubmit } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = async data => {
    console.log('Form data:', data);

    const searchParams: Record<string, string> = Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    console.log('Search params:', searchParams);
    await searchTickets(searchParams);
  };

  // Get Ticket
  const getTickets = useContext(TicketContext);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      if (getTickets && tickets.length === 0) {
        await getTickets.getAllTickets();
        setTickets(getTickets.tickets);
      }
    };
    fetchData();
  }, [getTickets, tickets]);

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

  // Sử dụng useRef với kiểu HTMLDivElement
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hàm cuộn theo hướng
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };
  return (
    <div className="pb-[20px] xl:pt-[80px]">
      {/* Mobile */}
      <div>
        <HeaderResponsive Title_NavbarMobile="Trang Chủ" />
      </div>
      {/* Banner */}
      <div className="relative">
        <div className="absolute bottom-0 left-2 top-[50%] md:bottom-4 md:top-[30%] xl:left-[20%] xl:top-[40%]">
          <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[25px] font-bold text-transparent dark:from-primary dark:to-gray-100 md:text-[40px]">
            {t('UserPage.BannerTitle')}
          </p>
          <p className="bg-gradient-to-r from-white to-white bg-clip-text text-[15px] font-light text-transparent dark:from-primary dark:to-primary">
            {t('UserPage.BannerSubtitle')}
          </p>
        </div>
        {/* Banner IMG */}
        <div>
          <img
            src={BannerFlight}
            className="hidden w-full xl:block dark:xl:hidden"
            alt="Banner"
          />
          <img
            src={Banner}
            className="hidden w-full dark:xl:block"
            alt="Banner"
          />
          <img
            className="block h-[150px] w-full object-cover xl:hidden"
            src={Banner}
            alt="Banner"
          />
        </div>
      </div>
      {/* Form */}
      {/* <TicketSearchForm /> */}
      <TicketResults />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative top-1 flex flex-grow items-center justify-center px-2 pb-10 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
          <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
            {/* Form Mobile 1 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
                type={'text'}
                placeholder={`${t('UserPage.DeparturePlaceholder')}`}
                {...register('departure_point_name')}
                classNameLabel="bg-white dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'text'}
                placeholder={`${t('UserPage.DestinationPlaceholder')}`}
                {...register('destination_point_name')}
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
                {...register('departure_date')}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.ArrivalDatePlaceholder')}`}
                {...register('arrival_date')}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />{' '}
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            </div>
            {/* Form Mobile 3 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <div>
                <Select
                  {...register('ticket_catalog_name')}
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                >
                  <option value={'default'} disabled>
                    {t('UserPage.VehicleSelectDefault')}
                  </option>
                  <option value={'Tàu Hoả'}>Tàu Hoả</option>
                  <option value={'Xe Khách'}>Xe Khách</option>
                  <option value={'Máy Bay'}>Máy Bay</option>
                </Select>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-[150px] bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700 md:w-[300px] lg:w-[400px] xl:ml-3 xl:w-full"
                >
                  <IoSearch />
                  {loading
                    ? 'Đang tìm kiếm...'
                    : `${t('UserPage.SearchButton')}`}
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Section */}
      <div className="flex flex-col items-center justify-center px-2 md:flex-row md:gap-20 xl:px-[100px]">
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionOne} alt="" />
          <p className="text-xl font-bold text-primary dark:text-white">
            {t('UserPage.SectionOneTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionOneDescription')}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionTwo} alt="" />
          <p className="text-xl font-bold text-primary dark:text-white">
            {t('UserPage.SectionTwoTitle')}
          </p>
          <br />
          <p className="text-sm font-light text-black dark:text-white">
            {t('UserPage.SectionTwoDescription')}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center xs:px-2 sm:px-0">
          <img width={300} src={sectionThree} alt="" />
          <p className="text-xl font-bold text-primary dark:text-white">
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
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.HaNoi')}
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
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.NinhBinh')}
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
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.ThanhHoa')}
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
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.Vinh')}
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
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.DaNang')}
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
            <span className="absolute right-2 top-2 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-1 font-semibold text-primary">
              <IoLocationOutline className="text-xl text-[#f7aaab]" />
              {t('UserPage.Location.Hue')}
            </span>
          </Link>
        </div>
      </div>
      {/* Location */}
      <div className="px-2 xl:px-[100px]">
        <div className="my-5 rounded-lg bg-primary py-2 text-center text-3xl font-bold text-white dark:bg-white dark:text-primary">
          {t('UserPage.TicketPrice')}
        </div>
        <div className="grid grid-cols-2 gap-2 xl:grid-flow-col xl:grid-cols-none xl:grid-rows-1">
          {FecthLocation.map(location => (
            <Button
              key={location._id}
              className={`flex w-full items-center justify-center transition-all duration-500 ease-in-out hover:rounded-badge hover:bg-secondary hover:text-white ${
                location.name === activeItem
                  ? 'bg-primary text-white hover:bg-primary hover:text-white'
                  : 'bg-white text-primary'
              }`}
              onClick={() => setActiveItem(location.name)}
            >
              <span>{location.name}</span>
            </Button>
          ))}
        </div>

        {/* Ticket */}
        <div className="my-5">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tickets.map((ticket: ITicket) => (
              <div
                key={ticket._id}
                className="w-full flex-none transform overflow-hidden rounded-lg bg-white text-black shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-secondary hover:text-white sm:w-80"
              >
                <div className="p-4">
                  <p className="mb-2 truncate text-lg font-semibold">
                    {ticket.ticket_catalog_id.name}{' '}
                  </p>
                  <p className="mb-2 text-sm">Ghế: {ticket.seat_id.name}</p>
                  <p className="mb-2 text-sm">
                    Giá ghế: {ticket.seat_id.price}
                  </p>
                  <p className="mb-4 text-sm">
                    Từ: {ticket.trip_id.departure_point.name} - Đến:{' '}
                    {ticket.trip_id.destination_point.name}{' '}
                  </p>
                  <p className="mb-4 text-sm">Giá vé: {ticket.price}</p>
                  <Button
                    className="w-full bg-primary font-light text-white hover:border-primary hover:bg-white hover:font-bold hover:text-primary"
                    aria-label={`View details for ${ticket.ticket_catalog_id.name}`}
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
  );
};

export default Home;

