import React, { useContext, useEffect, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { Button } from 'react-daisyui';
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
import { BannerTrain } from '../../assets/image-represent';
import TrainsTickets from './tickets-filter/TrainsTickets';
import ReactSelect from '../../components/orther/react-select/ReactSelect';
import ReactSelectNone from '../../components/orther/react-select/ReactSelectNone';

interface Option {
  value: string;
  label: string;
}
const TrainsPage: React.FC = () => {
  const [selectedTicketCatalog, setSelectedTicketCatalog] = useState<
    string | string
  >('');
  //Translation
  const { t } = useTranslation();
  const { searchTickets, loading } = useContext(TicketContext);
  const navigate = useNavigate();

  const { control, register, handleSubmit } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = async data => {
    const searchParams: Record<string, string> = Object.entries(data).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    searchParams.ticket_catalog_name = 'Một chiều';
    //
    const searchResults: ITicket[] = await searchTickets(searchParams);
    sessionStorage.setItem('searchParams', JSON.stringify(searchParams));

    if (searchResults.length > 0) {
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
      navigate('/ticket-trains-results');
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
  // Tính toán ngày hôm nay
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  const minDate = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Trains')} />
      <div className="">
        {/* Banner */}
        <div className="relative">
          {/* Banner IMG */}
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
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative top-1 flex flex-grow items-center justify-center px-2 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
            <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu md:p-10 xl:flex-row xl:px-10 xl:py-8">
              {/* Form Mobile 1 */}
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                <div className="flex items-center">
                  {/* <Select
                    defaultValue=""
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-r-none"
                    {...register('departure_point_name')}
                  >
                    <option value="" disabled>
                      {t('UserPage.DeparturePlaceholder')}
                    </option>
                    {locations.map(location => (
                      <option key={location.name} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </Select> */}

                  <ReactSelectNone
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
                  {/* <Select
                    defaultValue=""
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                    {...register('destination_point_name')}
                  >
                    <option value="" disabled>
                      {t('UserPage.DestinationPlaceholder')}
                    </option>
                    {locations.map(location => (
                      <option key={location.name} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </Select> */}
                  <ReactSelectNone
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
                <div className="flex items-center">
                  {/* <Select
                    defaultValue=""
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                    {...register('ticket_catalog_name')}
                    onChange={e => setSelectedTicketCatalog(e.target.value)}
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
                  </Select> */}
                  <ReactSelect
                    name="ticket_catalog_name"
                    control={control}
                    options={ticketCatalog}
                    placeholder={t('UserPage.TicketSelectDefault')}
                    isMulti={false}
                    className="xl:rounded-none"
                    onChange={selectedOption => {
                      if (
                        typeof selectedOption === 'object' &&
                        'value' in selectedOption
                      ) {
                        setSelectedTicketCatalog(selectedOption.value);
                      } else if (typeof selectedOption === 'string') {
                        setSelectedTicketCatalog(selectedOption);
                      } else {
                        setSelectedTicketCatalog('');
                      }
                    }}
                  />
                  <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
                  {/* hide */}
                  <InputForm
                    placeholder={''}
                    classNameLabel={''}
                    type="hidden"
                    value="Tàu"
                    {...register('vehicle_catalog_name')}
                    min=""
                  />
                </div>
                <div className="flex items-center">
                  <InputForm
                    className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                    type={'date'}
                    placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                    {...register('departure_date')}
                    classNameLabel=" dark:text-[#122969] bg-white dark:peer-focus:text-primary "
                    min={minDate}
                  />
                </div>
              </div>
              <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
                <div
                  className={`${selectedTicketCatalog === 'Một chiều' ? 'hidden' : ''}`}
                >
                  <div className="flex items-center">
                    <MdOutlineArrowRightAlt className="hidden text-xl text-primary xl:flex" />
                    <InputForm
                      className="h-[48px] min-w-[150px] border border-primary bg-white text-sm text-black hover:border-gray-700 hover:border-opacity-50 hover:outline-none focus:outline-none dark:border-primary dark:hover:border-gray-700 dark:hover:border-opacity-50 xs:max-w-[150px] sm:max-w-[300px] md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-l-none"
                      type={'date'}
                      placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                      {...register('return_date')}
                      classNameLabel=" dark:text-[#122969] bg-white dark:peer-focus:text-primary "
                      min={minDate}
                    />
                  </div>
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
      </div>
      {/* AllTickets */}
      <TrainsTickets />
    </div>
  );
};

export default TrainsPage;
