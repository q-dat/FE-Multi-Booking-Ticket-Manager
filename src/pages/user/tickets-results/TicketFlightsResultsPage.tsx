import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { ITicket } from '../../../types/type/ticket/ticket';
import { useCart } from '../../../context/cart/CartContext';
import CartPage from '../CartPage';
import { Button } from 'react-daisyui';

const TicketFlightsResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart();

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
      setSelectedFlight(
        parsedTickets[0]?.seat_id[0]?.seat_catalog_id.vehicle_id.name || null
      );
    } else {
      setError('Không tìm thấy dữ liệu vé trong session.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
    } else {
      setTickets([]);
    }
  }, [selectedSeats]);

  if (loading) {
    return <LoadingLocal />;
  }

  if (error) {
    return <ErrorLoading />;
  }

  if (tickets.length === 0) {
    return <LoadingLocal />;
  }

  const tripInfo = tickets[0]?.trip_id;
  const ticketsByFlight = tickets.reduce(
    (acc: { [key: string]: ITicket[] }, ticket) => {
      const flightName = ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name;
      if (!acc[flightName]) {
        acc[flightName] = [];
      }
      acc[flightName].push(ticket);
      return acc;
    },
    {}
  );

  const ticketsByClass = selectedFlight
    ? ticketsByFlight[selectedFlight].reduce(
        (acc: { [key: string]: ITicket[] }, ticket) => {
          const classId = ticket.seat_id[0]?.seat_catalog_id._id;
          if (!acc[classId]) {
            acc[classId] = [];
          }
          acc[classId].push(ticket);
          return acc;
        },
        {}
      )
    : {};

  const handleSeatClick = (ticket: ITicket) => {
    addSeat(ticket);

    const updatedTickets = tickets.map(t =>
      t._id === ticket._id
        ? { ...t, seat_id: { ...t.seat_id, status: 'Hết chỗ' } }
        : t
    );

    sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  return (
    <div className="pb-[20px] xl:pt-[90px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Flights')} />
      <div className="mb-4 text-center xl:relative">
        <div className="xl:absolute xl:right-2">
          <CartPage />
        </div>
        <h1 className="mx-2 border border-l-0 border-r-0 border-t-0 text-center text-xl text-black dark:text-white xl:text-start">
          Chuyến bay từ <strong>{tripInfo.departure_point.name}</strong> đến{' '}
          <strong>{tripInfo.destination_point.name}</strong>
        </h1>
      </div>

      <div className="mb-8 flex flex-wrap justify-center space-x-4">
        {Object.entries(ticketsByFlight).map(([flightName, flightTickets]) => (
          <div
            className={`hover:bg-white group mb-4 flex h-[280px] w-[250px] cursor-pointer flex-col items-center justify-around rounded-[30px] border bg-black bg-opacity-20 p-1 px-2 shadow-lg ${selectedFlight === flightName ? 'bg-primary bg-opacity-100' : ''}`}
            onClick={() => setSelectedFlight(flightName)}
            key={flightName}
          >
            <div className="group-hover:border h-10 w-[150px] rounded-3xl bg-white text-black group-hover:border-white group-hover:bg-primary group-hover:text-white">
              <p className="py-[5px] text-center">
                {flightTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name}
              </p>
            </div>
            <div className="h-[150px] w-full rounded-3xl bg-white p-2 text-start text-lg font-light">
              <p>
                Ngày đi:
                {new Date(
                  flightTickets[0].trip_id?.departure_date
                ).toLocaleDateString('vi-VN')}
              </p>
              <p>
                Giờ đi: {flightTickets[0].trip_id?.departure_time}
              </p>
            </div>
            <div className="flex flex-row gap-10">
              <div className="h-10 w-10 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary"></div>
              <div className="h-10 w-10 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary"></div>
            </div>
          </div>
        ))}
      </div>

      {selectedFlight &&
        ticketsByClass &&
        Object.entries(ticketsByClass).map(
          ([classId, classTickets]) => (
            <div key={classId} className="mb-6 xl:mx-[20px]">
              <Button
                color="primary"
                size="md"
                className="text-md mb-10 font-semibold dark:bg-white dark:text-primary"
              >
                {classTickets[0].seat_id[0]?.seat_catalog_id.name}
              </Button>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary p-2 dark:border-white">
                {classTickets.map((ticket, index) => {
                  const seatStatus = ticket.seat_id[0]?.status;

                  return (
                    <div
                      onClick={() => handleSeatClick(ticket)}
                      key={index}
                      className={`relative flex h-14 w-14 items-center justify-center rounded-md border transition-all duration-200 ease-in-out ${
                        seatStatus === 'Còn chỗ'
                          ? 'cursor-pointer border-green-700 bg-green-500 text-white hover:bg-green-600'
                          : 'cursor-not-allowed border-red-700 bg-red-500 text-white'
                      } group`}
                    >
                      {ticket.seat_id[0]?.ordinal_numbers}

                      <div
                        className={`absolute bottom-10 left-1/2 z-10 w-[100px] -translate-x-1/2 transform rounded bg-white p-2 text-center text-xs text-black opacity-0 shadow-headerMenu shadow-primary transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
                      >
                        {seatStatus === 'Còn chỗ' ? (
                          <>
                            <strong>{ticket.seat_id[0]?.name}</strong>
                            <p>
                              <strong>Giá:</strong>{' '}
                              {(ticket.price * 1000).toLocaleString('vi-VN')}{' '}
                              VNĐ
                            </p>
                          </>
                        ) : (
                          <p>{seatStatus}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default TicketFlightsResultsPage;