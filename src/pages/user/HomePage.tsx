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
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TicketContext } from '../../context/ticket/TicketContext';
import { ITicket, SearchFormData } from '../../types/type/ticket/ticket';
import { LocationContext } from '../../context/location/LocationContext';
import { TicketCatalogContext } from '../../context/ticketCatalog/TicketCatalogContext';
import { Toastify } from '../../helper/Toastify';
import { VehicleCatalogContext } from '../../context/vehicleCatalog/VehicleCatalogContext';

const Home: React.FC = () => {
  //Translation
  const { t } = useTranslation();
  //Search Ticket
  const searchTicket = useContext(TicketContext);
  const navigate = useNavigate();
  if (!searchTicket) {
    console.log('Home phải được sử dụng trong TicketProvider');
  }
  const { searchTickets, loading, error } = searchTicket;

  const { register, handleSubmit } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = async data => {
    const searchParams: Record<string, string> = Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    // Call searchTickets and wait for the result
    const searchResults: ITicket[] = await searchTickets(searchParams);

    if (searchResults.length > 0) {
      const selectedVehicle = searchResults[0];
      const vehicleType = selectedVehicle.vehicle_catalog_id.name;
      sessionStorage.setItem('searchResults', JSON.stringify(searchResults));

      // Navigate based on vehicle type
      switch (vehicleType) {
        case 'Tàu hoả':
          navigate('/ticket-trains-results');
          break;
        case 'Xe khách':
          navigate('/ticket-buses-results');
          break;
        case 'Máy bay':
          navigate('/ticket-flight-results');
          break;
        default:
          break;
      }
      Toastify('Tìm kiếm vé thành công', 200);
    } else {
      Toastify(`Lỗi: ${error || 'Không tìm thấy vé nào'}`, 404);
    }
  };

  //Get Vehicle Catalog
  const { vehicleCatalogs, getAllVehicleCatalogs } = useContext(
    VehicleCatalogContext
  );
  useEffect(() => {
    getAllVehicleCatalogs();
  }, []);

  //Get Ticket Catalog
  const { ticketCatalogs, getAllTicketCatalogs } =
    useContext(TicketCatalogContext);
  useEffect(() => {
    getAllTicketCatalogs();
  }, []);

  // Get Ticket
  const { tickets, getAllTickets } = useContext(TicketContext);
  useEffect(() => {
    getAllTickets();
  }, []);

  //Get Location
  const [activeItem, setActiveItem] = useState('Hà Nội');
  const { locations, getAllLocations } = useContext(LocationContext);
  useEffect(() => {
    getAllLocations();
  }, []);
  // scrollRef
  const scrollRef = useRef<HTMLDivElement>(null);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative top-1 flex flex-grow items-center justify-center px-2 pb-10 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
          <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
            {/* Form Mobile 1 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <Select
                defaultValue=""
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
                {...register('departure_point_name')}
              >
                <option value="" disabled>
                  {t('UserPage.DeparturePlaceholder')}
                </option>
                {locations.map(location => (
                  <option key={location._id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </Select>
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <Select
                defaultValue=""
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                {...register('destination_point_name')}
              >
                <option value="" disabled>
                  {t('UserPage.DestinationPlaceholder')}
                </option>
                {locations.map(location => (
                  <option key={location._id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </Select>
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            </div>
            {/* Form Mobile 2 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                {...register('departure_date')}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              {/* <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                {...register('return_date')}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" /> */}
              <div>
                <Select
                  defaultValue=""
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                  {...register('ticket_catalog_name')}
                >
                  <option value="" disabled>
                    {t('UserPage.TicketSelectDefault')}
                  </option>
                  {ticketCatalogs.map(ticketCatalog => (
                    <option key={ticketCatalog._id} value={ticketCatalog.name}>
                      {ticketCatalog.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            {/* Form Mobile 3 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <div>
                <Select
                  defaultValue=""
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                  {...register('vehicle_catalog_name')}
                >
                  <option value="" disabled>
                    {t('UserPage.VehicleSelectDefault')}
                  </option>
                  {vehicleCatalogs.map(vehicleCatalogs => (
                    <option
                      key={vehicleCatalogs._id}
                      value={vehicleCatalogs.name}
                    >
                      {vehicleCatalogs.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={loading.search}
                  className="w-[150px] bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary dark:hover:bg-gray-700 md:w-[300px] lg:w-[400px] xl:ml-3 xl:w-full"
                >
                  <IoSearch />
                  {loading.search
                    ? `${t('UserPage.Loading')}`
                    : `${t('UserPage.SearchButton')}`}
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
          {locations.map((location, index) => (
            <Button
              key={index}
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
            className="flex space-x-4 overflow-x-auto scroll-smooth p-5 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tickets.map((ticket: ITicket) => (
              <div
                key={ticket._id}
                className="w-full flex-none transform overflow-hidden rounded-lg bg-white text-black shadow-md shadow-primary transition-transform duration-300 ease-in-out hover:scale-105 sm:w-80"
              >
                <div className="flex flex-col gap-1 p-4 font-light">
                  <p className="mb-5 text-center text-xl font-semibold">
                    {ticket.ticket_catalog_id.name}
                  </p>
                  <p>
                    Từ: &nbsp;
                    <span className="font-semibold">
                      {ticket.trip_id.departure_point.name}
                    </span>
                    - Đến: &nbsp;
                    <span className="font-semibold">
                      {ticket.trip_id.destination_point.name}
                    </span>
                  </p>
                  <p>
                    Phương tiện: &nbsp;
                    <span className="font-semibold">
                      {ticket.seat_id.seat_catalog_id.vehicle_id.name}
                    </span>
                  </p>
                  <p>
                    Ghế: &nbsp;
                    <span className="font-semibold">{ticket.seat_id.name}</span>
                    &nbsp;
                    <span className="font-semibold">
                      ({ticket.seat_id.seat_catalog_id.name})
                    </span>
                  </p>
                  <p>
                    Giá vé: &nbsp;
                    <span className="font-bold text-red-500">
                      {(ticket.price * 1000).toLocaleString('vi-VN')} &nbsp;
                    </span>
                    VND
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Button  */}
          <div className="flex w-full items-center justify-between space-x-2">
            <Button
              onClick={() => scroll(-200)}
              className="bg-primary text-white dark:bg-white dark:text-primary"
            >
              <FaChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => scroll(200)}
              className="bg-primary text-white dark:bg-white dark:text-primary"
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
