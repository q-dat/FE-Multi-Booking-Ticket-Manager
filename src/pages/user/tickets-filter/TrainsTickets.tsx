import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-daisyui';
import { ITicket } from '../../../types/type/ticket/ticket';
import { TicketContext } from '../../../context/ticket/TicketContext';
import { LocationContext } from '../../../context/location/LocationContext';
import { TicketCatalogContext } from '../../../context/ticketCatalog/TicketCatalogContext';
import { IoTicket, IoTrainSharp } from 'react-icons/io5';
import { IoMdPricetag } from 'react-icons/io';
import { PiMapPinAreaDuotone, PiSeatFill } from 'react-icons/pi';
import { FaArrowRightArrowLeft, FaCartPlus } from 'react-icons/fa6';

const BusesTickets: React.FC = () => {
  const { tickets, getAllTickets, filterTickets } = useContext(TicketContext);
  const { ticketCatalogs } = useContext(TicketCatalogContext);
  const { locations } = useContext(LocationContext);

  const [ticketCatalog, setTicketCatalog] = useState<string>('');
  const [vehicleCatalog] = useState<string>('Tàu');
  const [departurePoint, setDeparturePoint] = useState<string>('');
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);

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
  // Lọc vé tàu hoả
  const filteredTickets = tickets.filter(
    ticket => ticket.vehicle_catalog_id?.name === vehicleCatalog
  );
  return (
    <div className="px-2 xl:px-[100px]">
      <div className="my-5">
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
        <div className="my-5 grid w-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-2">
          {filteredTickets.map((ticket: ITicket) => (
            <div
              key={ticket._id}
              className="w-full transform rounded-lg bg-white text-black shadow-md shadow-primary transition-transform duration-300 ease-in-out hover:bg-primary hover:bg-opacity-10 dark:hover:bg-gray-50"
            >
              <div className="flex flex-col gap-1 p-4 font-light">
                <div className="mb-2 flex items-center justify-center gap-1 font-semibold">
                  <span className="font-semibold">
                    {ticket.trip_id?.departure_point?.name}
                  </span>
                  <FaArrowRightArrowLeft color="#12296999" />
                  <span className="font-semibold">
                    {ticket.trip_id?.destination_point?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <IoTicket color="#12296999" /> Loại Vé:
                  <span className="font-semibold">
                    {ticket.ticket_catalog_id?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <IoTrainSharp color="#12296999" /> Phương tiện:
                  <span className="font-semibold">
                    {ticket.seat_id.map(seat => (
                      <span key={seat._id}>
                        ({seat.seat_catalog_id.vehicle_id?.name})
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex items-start gap-1">
                  <p className="flex items-center gap-1">
                    <PiSeatFill color="#12296999" /> Ghế:
                  </p>
                  <p>
                    <span className="font-semibold">
                      {ticket.seat_id.map(seat => (
                        <span key={seat._id}>({seat?.name})</span>
                      ))}
                    </span>
                    <span className="font-semibold">
                      {ticket.seat_id.map(seat => (
                        <span key={seat._id}>
                          ({seat.seat_catalog_id?.name})
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <IoMdPricetag color="#12296999" /> Giá vé:
                  <span className="font-bold text-red-500">
                    {(ticket.price * 1000).toLocaleString('vi-VN')}
                  </span>
                  VND
                </div>
                <Button
                  size="sm"
                  color="primary"
                  className="font-serif text-white"
                >
                  <FaCartPlus color="#ffffff" />
                  Mua Vé
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusesTickets;
