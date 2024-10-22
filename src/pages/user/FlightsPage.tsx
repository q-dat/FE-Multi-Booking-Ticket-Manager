import React, { useContext, useEffect } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button, Select } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { BannerFlight } from '../../assets/image-represent';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LocationContext } from '../../context/location/LocationContext';
import { TicketContext } from '../../context/ticket/TicketContext';
import { TicketCatalogContext } from '../../context/ticketCatalog/TicketCatalogContext';
import { Toastify } from '../../helper/Toastify';
import { SearchFormData, ITicket } from '../../types/type/ticket/ticket';
import FlightTickets from './tickets-filter/FlightTickets';

const FlightsPage: React.FC = () => {
  //Translation
  const { t } = useTranslation();
  const { searchTickets, loading } = useContext(TicketContext);
  const navigate = useNavigate();
  if (!searchTickets) {
    console.log('Home phải được sử dụng trong TicketProvider');
  }

  const { register, handleSubmit } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = async data => {
    const searchParams: Record<string, string> = Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const searchResults: ITicket[] = await searchTickets(searchParams);

    if (searchResults.length > 0) {
      sessionStorage.setItem('searchResults', JSON.stringify(searchResults));
      navigate('/ticket-flights-results');
      Toastify('Tìm kiếm vé thành công', 200);
    } else {
      Toastify('Không tìm thấy vé nào', 404);
    }
  };

  //Get Ticket Catalog
  const { ticketCatalogs, getAllTicketCatalogs } =
    useContext(TicketCatalogContext);
  useEffect(() => {
    getAllTicketCatalogs();
  }, []);
  //Get Location
  const { locations, getAllLocations } = useContext(LocationContext);
  useEffect(() => {
    getAllLocations();
  }, []);

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Flights')} />
      <div className="">
        {/* Banner */}
        <div>
          <img
            src={BannerFlight}
            className="hidden w-full xl:block dark:xl:hidden"
            alt="Banner"
          />
          <img
            src={BannerFlight}
            className="hidden w-full dark:xl:block"
            alt="Banner"
          />
          <img
            className="block h-[150px] w-full object-cover xl:hidden"
            src={BannerFlight}
            alt="Banner"
          />
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative top-1 flex flex-grow items-center justify-center px-2 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
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
                <div>
                  <Select
                    defaultValue=""
                    className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                    {...register('ticket_catalog_name')}
                  >
                    <option value="" disabled>
                      {t('UserPage.TicketSelectDefault')}
                    </option>
                    {ticketCatalogs.map(ticketCatalog => (
                      <option
                        key={ticketCatalog._id}
                        value={ticketCatalog.name}
                      >
                        {ticketCatalog.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <InputForm
                placeholder={''}
                classNameLabel={''}
                type="hidden"
                value="Máy bay"
                {...register('vehicle_catalog_name')}
              />
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
        </form>
        <FlightTickets />
      </div>
    </div>
  );
};

export default FlightsPage;
