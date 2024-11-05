import React, { useContext, useEffect } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button, Select } from 'react-daisyui';
import InputForm from '../../components/UserPage/InputForm';
import { useTranslation } from 'react-i18next';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LocationContext } from '../../context/location/LocationContext';
import { TicketContext } from '../../context/ticket/TicketContext';
import { TicketCatalogContext } from '../../context/ticketCatalog/TicketCatalogContext';
import { Toastify } from '../../helper/Toastify';
import { SearchFormData, ITicket } from '../../types/type/ticket/ticket';
import { BannerBus } from '../../assets/image-represent';
import BusesTickets from './tickets-filter/BusesTickets';

const BusesPage: React.FC = () => {
  //Translation
  const { t } = useTranslation();
  const { searchTickets, loading } = useContext(TicketContext);
  const navigate = useNavigate();

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
      navigate('/ticket-buses-results');
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
  // Tính toán ngày hôm nay
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  const minDate = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Buses')} />
      <div className="">
        {/* Banner */}
        <div className="relative">
          {/* Banner IMG */}
          <div>
            <img
              src={BannerBus}
              className="hidden w-full xl:block dark:xl:hidden"
              alt="Banner"
            />
            <img
              src={BannerBus}
              className="hidden w-full dark:xl:block"
              alt="Banner"
            />
            <img
              className="block h-[150px] w-full object-cover xl:hidden"
              src={BannerBus}
              alt="Banner"
            />
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative top-1 flex flex-grow items-center justify-center px-2 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
            <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu md:p-10 xl:flex-row xl:px-10 xl:py-8">
              {/* Form Mobile 1 */}
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                <div className="flex items-center">
                  <Select
                    defaultValue=""
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
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
                  <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
                </div>
                <div className="flex items-center">
                  <Select
                    defaultValue=""
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
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
                  <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
                </div>
              </div>
              {/* Form Mobile 2 */}
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                <div className="flex items-center">
                  <InputForm
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                    type={'date'}
                    placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                    {...register('departure_date')}
                    classNameLabel=" dark:text-[#122969] bg-white dark:peer-focus:text-primary "
                    min={minDate}
                  />
                  <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
                </div>
                <div className="flex items-center">
                  <InputForm
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                    type={'date'}
                    placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                    {...register('return_date')}
                    classNameLabel=" dark:text-[#122969] bg-white dark:peer-focus:text-primary "
                    min={minDate}
                  />
                  <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
                </div>
              </div>
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                <div className="flex items-center">
                  <Select
                    defaultValue=""
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
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
                  <InputForm
                    placeholder={''}
                    classNameLabel={''}
                    type="hidden"
                    value="Xe khách"
                    {...register('vehicle_catalog_name')}
                    min=""
                  />
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
      </div>
      {/* AllTickets */}
      <BusesTickets />
    </div>
  );
};

export default BusesPage;
