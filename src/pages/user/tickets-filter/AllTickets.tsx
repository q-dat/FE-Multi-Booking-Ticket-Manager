import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-daisyui';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ITicket } from '../../../types/type/ticket/ticket';
import { TicketContext } from '../../../context/ticket/TicketContext';
import { t } from 'i18next';
import { LocationContext } from '../../../context/location/LocationContext';
import { TicketCatalogContext } from '../../../context/ticketCatalog/TicketCatalogContext';
import { VehicleCatalogContext } from '../../../context/vehicleCatalog/VehicleCatalogContext';
import { IoTicket, IoTrainSharp } from 'react-icons/io5';
import { IoMdPricetag } from 'react-icons/io';
import { PiMapPinAreaDuotone, PiSeatFill } from 'react-icons/pi';
import { FaCartPlus } from 'react-icons/fa6';
import { GrStatusInfo } from 'react-icons/gr';
const AllTickets: React.FC = () => {
  // Get Ticket
  const { tickets, getAllTickets, filterTickets } = useContext(TicketContext);
  const [status] = useState<string>('còn chỗ');

  useEffect(() => {
    getAllTickets();
  }, []);

  // scrollRef
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);
  const { ticketCatalogs } = useContext(TicketCatalogContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
  const { locations } = useContext(LocationContext);

  //Filter
  const [ticketCatalog, setTicketCatalog] = useState<string>('');
  const [vehicleCatalog, setVehicleCatalog] = useState<string>('');
  const [departurePoint, setDeparturePoint] = useState<string>('');
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    if (shouldSearch) {
      handleFilter();
      setShouldSearch(false);
    }
  }, [shouldSearch]);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    currentValue: string
  ) => {
    const newValue = currentValue === value ? '' : value;
    setter(newValue);
    setShouldSearch(true);
  };

  const handleFilter = async () => {
    const filterParams = {
      ticket_catalog_name: ticketCatalog,
      vehicle_catalog_name: vehicleCatalog,
      departure_point_name: departurePoint
    };
    await filterTickets(filterParams);
  };
  const filteredTickets = tickets.filter(
    ticket => ticket.seat_id[0]?.status.toLocaleLowerCase() === status
  );
  return (
    <div className="px-2 xl:px-[100px]">
      <div className="my-5 rounded-lg bg-primary py-2 text-center text-3xl font-bold text-white dark:bg-white dark:text-primary">
        {t('UserPage.TicketPrice')}
      </div>
      {/* Ticket */}
      <div className="my-5">
        {/*  */}
        <div className="rounded-md bg-slate-50 p-2 shadow-headerMenu">
          <div className="flex flex-col gap-3">
            {/* Loại Vé */}
            <div>
              <p className="flex items-center gap-1 bg-blue-50 font-bold text-primary">
                <IoTicket /> Loại Vé:
              </p>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-6 xl:grid-cols-7">
                {ticketCatalogs.map(item => (
                  <label
                    className="flex h-8 cursor-pointer items-center gap-1"
                    key={item._id}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={ticketCatalog === item.name}
                      onChange={() =>
                        handleCheckboxChange(
                          setTicketCatalog,
                          item.name,
                          ticketCatalog
                        )
                      }
                    />
                    <span className="text-primary hover:text-secondary">
                      {item?.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phương Tiện */}
            <div>
              {' '}
              <p className="flex items-center gap-1 bg-blue-50 font-bold text-primary">
                <IoTrainSharp /> Phương tiện:
              </p>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-6 xl:grid-cols-7">
                {vehicleCatalogs.map(item => (
                  <label
                    className="flex h-8 cursor-pointer items-center gap-1"
                    key={item._id}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={vehicleCatalog === item.name}
                      onChange={() =>
                        handleCheckboxChange(
                          setVehicleCatalog,
                          item.name,
                          vehicleCatalog
                        )
                      }
                    />
                    <span className="text-primary hover:text-secondary">
                      {item?.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Điểm Khởi Hành */}
            <div>
              <p className="flex items-center gap-1 bg-blue-50 font-bold text-primary">
                <PiMapPinAreaDuotone /> Điểm Khởi Hành:
              </p>
              <div className="grid grid-cols-3 items-center justify-center gap-3 md:grid-cols-6 xl:grid-cols-7">
                {locations.map(item => (
                  <label
                    className="flex h-8 cursor-pointer items-center gap-1"
                    key={item._id}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={departurePoint === item.name}
                      onChange={() =>
                        handleCheckboxChange(
                          setDeparturePoint,
                          item.name,
                          departurePoint
                        )
                      }
                    />
                    <span className="text-primary hover:text-secondary">
                      {item?.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 rounded-xl bg-transparent ">
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scroll-smooth p-[1px] scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredTickets.map((ticket: ITicket) => (
              <div
                key={ticket._id}
                className="w-full flex-none transform overflow-hidden rounded-lg bg-white text-black shadow shadow-black transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-primary hover:bg-opacity-10 sm:w-80"
              >
                <div className="flex min-h-[200px] flex-col justify-between gap-1 p-2 text-sm font-light text-gray-600">
                  <div className="w-full">
                    <div className="mb-2 flex items-center justify-center gap-1 font-semibold">
                      <span className="font-semibold text-primary">
                        {ticket.trip_id?.departure_point?.name}
                      </span>
                      <p className="text-primary">-</p>
                      <span className="font-semibold text-primary">
                        {ticket.trip_id?.destination_point?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoTicket className="text-gray-100" /> Loại Vé:
                      <span className="font-semibold text-primary">
                        {ticket.ticket_catalog_id?.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoTrainSharp className="text-gray-100" /> Phương tiện:
                      <span className="font-semibold text-primary">
                        {ticket.seat_id.map(seat => (
                          <span key={seat._id}>
                            {seat.seat_catalog_id.vehicle_id?.name}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GrStatusInfo className="text-gray-100" /> Trạng thái:
                      <span className="font-semibold text-primary">
                        {ticket.seat_id.map(seat => (
                          <span key={seat._id}>{seat?.status}</span>
                        ))}
                      </span>
                    </div>
                    <div className="flex items-start gap-1">
                      <p className="flex items-center gap-1">
                        <PiSeatFill className="text-gray-100" /> Ghế:
                      </p>
                      <p>
                        <span className="font-semibold text-primary">
                          {ticket.seat_id.map(seat => (
                            <span key={seat._id}>{seat?.name}</span>
                          ))}
                        </span>
                        &nbsp;-&nbsp;
                        <span className="font-semibold text-primary">
                          {ticket.seat_id.map(seat => (
                            <span key={seat._id}>
                              {seat.seat_catalog_id?.name}
                            </span>
                          ))}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoMdPricetag className="text-gray-100" /> Giá vé:
                      <span className="font-semibold text-red-500">
                        {(ticket?.price * 1000).toLocaleString('vi-VN')}
                      </span>
                      <span className="font-semibold text-primary">VND</span>
                    </div>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      className="bg-primary font-serif text-xs text-white hover:bg-secondary"
                    >
                      <FaCartPlus color="#ffffff" />
                      Mua Vé
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
  );
};

export default AllTickets;
