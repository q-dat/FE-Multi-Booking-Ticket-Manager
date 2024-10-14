import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { ITicket } from '../../types/type/ticket/ticket';
import { useCart } from '../../context/cart/CartContext';
import CartPage from './CartPage';

const TicketTrainsResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart(); 

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
      setSelectedTrain(
        parsedTickets[0]?.seat_id.seat_catalog_id.vehicle_id.name || null
      );
    } else {
      setError('Không tìm thấy dữ liệu vé trong session.');
    }
    setLoading(false);
  }, []);

  // useEffect theo dõi sự thay đổi của selectedSeats
  useEffect(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
    } else {
      setTickets([]); // Reset vé nếu không có dữ liệu
    }
  }, [selectedSeats]); // Phụ thuộc vào selectedSeats

  if (loading) {
    return <LoadingLocal />;
  }

  if (error) {
    return <ErrorLoading />;
  }

  if (tickets.length === 0) {
    return <div className="text-center text-red-500">Không tìm thấy vé!</div>;
  }

  const tripInfo = tickets[0]?.trip_id;
  const ticketsByTrain = tickets.reduce(
    (acc: { [key: string]: ITicket[] }, ticket) => {
      const trainName = ticket.seat_id.seat_catalog_id.vehicle_id.name;
      if (!acc[trainName]) {
        acc[trainName] = [];
      }
      acc[trainName].push(ticket);
      return acc;
    },
    {}
  );

  const ticketsByCarriage = selectedTrain
    ? ticketsByTrain[selectedTrain].reduce(
        (acc: { [key: string]: ITicket[] }, ticket) => {
          const carriageId = ticket.seat_id.seat_catalog_id._id;
          if (!acc[carriageId]) {
            acc[carriageId] = [];
          }
          acc[carriageId].push(ticket);
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
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Trains')} />
      <div className="mb-4 text-center">
        <CartPage />
        <h1 className="text-2xl">
          Chuyến đi từ <strong>{tripInfo.departure_point.name}</strong> đến{' '}
          <strong>{tripInfo.destination_point.name}</strong>
        </h1>
      </div>

      <div className="mb-8 flex flex-wrap justify-center space-x-4">
        {Object.entries(ticketsByTrain).map(([trainName, trainTickets]) => (
          <div
            className={`hover:bg- group mb-4 flex h-[280px] w-[250px] cursor-pointer flex-col items-center justify-around rounded-[30px] bg-black bg-opacity-20 p-1 px-2 shadow-lg ${selectedTrain === trainName ? 'bg-primary bg-opacity-100' : ''}`}
            onClick={() => setSelectedTrain(trainName)}
            key={trainName}
          >
            <div className="group-hover:boder h-10 w-[150px] rounded-3xl bg-white text-black group-hover:border group-hover:border-white group-hover:bg-primary group-hover:text-white">
              <p className="py-[5px] text-center">
                {trainTickets[0].seat_id.seat_catalog_id.vehicle_id.name}
              </p>
            </div>
            <div className="h-[150px] w-full rounded-3xl bg-white p-2 text-start text-lg font-light">
              <p>
                Ngày đi:
                {new Date(
                  trainTickets[0].trip_id.departure_date
                ).toLocaleDateString()}
              </p>
              <p>
                Ngày về:
                {new Date(
                  trainTickets[0].trip_id.return_date
                ).toLocaleDateString()}
              </p>
              <p>Giờ đi: {trainTickets[0].trip_id.departure_time}</p>
              <p>Giờ về: {trainTickets[0].trip_id.return_time}</p>
            </div>
            <div className="flex flex-row gap-10">
              <div className="h-10 w-10 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary"></div>
              <div className="h-10 w-10 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary"></div>
            </div>
          </div>
        ))}
      </div>

      {selectedTrain &&
        ticketsByCarriage &&
        Object.entries(ticketsByCarriage).map(
          ([carriageId, carriageTickets]) => (
            <div
              key={carriageId}
              className="mb-6 border-b border-t py-4 xl:px-[100px]"
            >
              <h4 className="mb-2 text-lg font-bold">
                Toa số: {carriageTickets[0].seat_id.seat_catalog_id.name}
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {carriageTickets.map((ticket, index) => {
                  const seatStatus = ticket.seat_id.status;

                  return (
                    <div
                      onClick={() => handleSeatClick(ticket)}
                      key={index}
                      className={`relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-md border transition-all duration-200 ease-in-out ${
                        seatStatus === 'Còn chỗ'
                          ? 'border-green-700 bg-green-500 text-white hover:bg-green-600'
                          : 'border-red-700 bg-red-500 text-white'
                      } group`}
                    >
                      {ticket.seat_id.ordinal_numbers}

                      <div
                        className={`absolute -top-8 left-1/2 z-10 w-[100px] -translate-x-1/2 transform rounded bg-white p-2 text-sm text-black opacity-0 shadow-lg transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
                      >
                        {seatStatus === 'Còn chỗ' ? (
                          <>
                            <strong>{ticket.seat_id.name}</strong>
                            <p>
                              <strong>Giá:</strong>
                              {ticket.price}
                            </p>
                          </>
                        ) : (
                          <p>
                            <strong> Trạng thái:</strong>
                            {seatStatus}
                          </p>
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

export default TicketTrainsResultsPage;
