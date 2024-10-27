import React, { useContext, useEffect } from 'react';
import { Button } from 'react-daisyui';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import { TicketContext } from '../../context/ticket/TicketContext';
import { ITicket, SearchFormData } from '../../types/type/ticket/ticket';
import { TicketCatalogContext } from '../../context/ticketCatalog/TicketCatalogContext';
import { Toastify } from '../../helper/Toastify';
import { VehicleCatalogContext } from '../../context/vehicleCatalog/VehicleCatalogContext';
import { LocationContext } from '../../context/location/LocationContext';
import AllTickets from './tickets-filter/AllTickets';
import ReactSelect from '../../components/orther/react-select/ReactSelect';

interface Option {
  value: string;
  label: string;
}

const Home: React.FC = () => {
  //Translation
  const { t } = useTranslation();
  //Search Ticket
  const { searchTickets, loading, error } = useContext(TicketContext);
  const navigate = useNavigate();
  if (!searchTickets) {
    console.log('Home phải được sử dụng trong TicketProvider');
  }

  const { control, register, handleSubmit } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = async data => {
    const searchParams: Record<string, string> = Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    //
    const searchResults: ITicket[] = await searchTickets(searchParams);

    if (searchResults.length > 0) {
      const selectedVehicle = searchResults[0];
      const vehicleType = selectedVehicle.vehicle_catalog_id.name;
      sessionStorage.setItem('searchResults', JSON.stringify(searchResults));

      //
      switch (vehicleType) {
        case 'Tàu':
          navigate('/ticket-trains-results');
          break;
        case 'Xe khách':
          navigate('/ticket-buses-results');
          break;
        case 'Máy bay':
          navigate('/ticket-flights-results');
          break;
        default:
          break;
      }
      Toastify('Tìm kiếm vé thành công', 200);
    } else {
      Toastify(`Lỗi: ${error || 'Không tìm thấy vé!'}`, 404);
    }
  };

  //Get Vehicle Catalog
  const { vehicleCatalogs, getAllVehicleCatalogs } = useContext(
    VehicleCatalogContext
  );
  useEffect(() => {
    getAllVehicleCatalogs();
  }, []);
  //react-select
  const vehicleCatalog: Option[] = vehicleCatalogs.map(vehicleCatalog => ({
    value: vehicleCatalog.name,
    label: vehicleCatalog.name
  }));

  //Get Ticket Catalog
  const { ticketCatalogs, getAllTicketCatalogs } =
    useContext(TicketCatalogContext);
  useEffect(() => {
    getAllTicketCatalogs();
  }, []);
  //react-select
  const ticketCatalog: Option[] = ticketCatalogs.map(ticketCatalog => ({
    value: ticketCatalog.name,
    label: ticketCatalog.name
  }));
  //Get Location
  const { locations, getAllLocations } = useContext(LocationContext);
  useEffect(() => {
    getAllLocations();
  }, []);
  //react-select
  const location: Option[] = locations.map(location => ({
    value: location.name,
    label: location.name
  }));
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
          <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu md:p-10 xl:flex-row xl:px-10 xl:py-8">
            {/* Form Mobile 1 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <div className="flex items-center">
                <ReactSelect
                  name="departure_point_name"
                  control={control}
                  options={location}
                  placeholder={t('UserPage.DeparturePlaceholder')}
                  isMulti={false}
                  className="xl:rounded-r-none"
                />
                <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
              </div>
              <div className="flex items-center">
                <ReactSelect
                  name="destination_point_name"
                  control={control}
                  options={location}
                  placeholder={t('UserPage.DestinationPlaceholder')}
                  isMulti={false}
                  className="xl:rounded-none"
                />

                <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
              </div>
            </div>
            {/* Form Mobile 2 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <InputForm
                className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                {...register('departure_date')}
                classNameLabel=" dark:text-[#122969] bg-white dark:peer-focus:text-primary "
              />
              <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
              <div>
                <ReactSelect
                  name="ticket_catalog_name"
                  control={control}
                  options={ticketCatalog}
                  placeholder={t('UserPage.TicketSelectDefault')}
                  isMulti={false}
                  className="xl:rounded-none"
                />
              </div>
            </div>
            {/* Form Mobile 3 */}
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
              <div>
                <ReactSelect
                  name="vehicle_catalog_name"
                  control={control}
                  options={vehicleCatalog}
                  placeholder={t('UserPage.VehicleSelectDefault')}
                  isMulti={false}
                  className="xl:rounded-l-none"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={loading.search}
                  className="min-h-[48px] min-w-[150px] border border-white bg-primary text-sm text-white hover:border-primary hover:bg-white hover:text-primary first-letter:xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:ml-3 xl:w-full"
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
      {/* AllTickets */}
      <AllTickets />
    </div>
  );
};

export default Home;
