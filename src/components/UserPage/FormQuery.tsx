import React from 'react';

const FormQuery: React.FC = () => {
  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative top-1 flex flex-grow items-center justify-center px-2 pb-10 pt-5 md:-top-3 md:pt-0 xl:-top-10 xl:px-0">
          <div className="flex flex-col rounded-lg border border-secondary border-opacity-50 bg-white p-3 shadow-headerMenu dark:bg-gray-700 md:p-10 xl:flex-row xl:px-10 xl:py-8">
            Form Mobile 1
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <div>
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
            </div>
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <div>
                {' '}
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
              </div>
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
            </div>
            Form Mobile 2
            <div className="m-2 flex flex-grow items-center justify-between gap-2 md:m-[10px] md:gap-[20px] xl:m-0 xl:gap-0">
              <div>
                {' '}
                <InputForm
                  className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                  type={'date'}
                  placeholder={`${t('UserPage.DepartureDatePlaceholder')}`}
                  {...register('departure_date')}
                  classNameLabel=" bg-white  dark:bg-gray-700"
                />
              </div>
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
              <InputForm
                className="w-[150px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full xl:rounded-none"
                type={'date'}
                placeholder={`${t('UserPage.ReturnDatePlaceholder')}`}
                {...register('return_date')}
                classNameLabel=" bg-white  dark:bg-gray-700"
              />
              <MdOutlineArrowRightAlt className="hidden text-primary dark:text-white xl:flex" />
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
            Form Mobile 3
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
      </form> */}
    </div>
  );
};

export default FormQuery;
