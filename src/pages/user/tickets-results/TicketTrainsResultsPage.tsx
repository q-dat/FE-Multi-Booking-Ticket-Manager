import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { ITicket } from '../../../types/type/ticket/ticket';
import { useCart } from '../../../context/cart/CartContext';
import CartPage from '../CartPage';
import { Button } from 'react-daisyui';

const TicketTrainsResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart();

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
      const initialTrainName =
        parsedTickets[0]?.seat_id[0]?.seat_catalog_id.vehicle_id.name || null;
      setSelectedTrain(initialTrainName);

      // Tự động chọn danh mục ghế đầu tiên nếu có vé
      const firstClassId =
        parsedTickets[0]?.seat_id[0]?.seat_catalog_id._id || null;
      setSelectedClassId(firstClassId);
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
  const ticketCatalogInfo = tickets[0]?.ticket_catalog_id;
  const ticketsByTrain = tickets.reduce(
    (acc: { [key: string]: ITicket[] }, ticket) => {
      const trainName = ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name;
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
          const carriageId = ticket.seat_id[0]?.seat_catalog_id._id;
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
        ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Hết chỗ' }] }
        : t
    );

    sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  // Khi người dùng chọn một tàu khác, tự động chọn danh mục ghế đầu tiên của tàu đó
  const handleTrainChange = (trainName: string) => {
    setSelectedTrain(trainName);
    setSelectedClassId(ticketsByTrain[trainName][0]?.seat_id[0]?.seat_catalog_id._id || null);
  };

  return (
    <div className="pb-[20px] xl:pt-[90px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Trains')} />
      <div className="flex w-full flex-col items-start justify-center px-2 xl:flex-row xl:px-[50px]">
        <div className="block w-full xl:hidden">
          <CartPage />
        </div>
        {/* Title */}
        <div className="w-full">
          <h1 className="mx-2 mb-5 border-[4px] border-b-0 border-r-0 border-t-0 border-primary bg-blue-200 px-5 py-1 text-center text-xl text-black dark:border-white dark:bg-gray-400 dark:text-white xl:text-start">
            Chuyến đi từ <strong>{tripInfo.departure_point?.name}</strong> đến{' '}
            <strong>{tripInfo.destination_point?.name}</strong> &nbsp;(
            <strong>{ticketCatalogInfo.name}</strong>)
          </h1>
          {/* Vehicle Catalog */}
          <div className="mb-8 flex w-full flex-row items-center justify-center gap-5 overflow-x-auto scrollbar-hide">
            {Object.entries(ticketsByTrain).map(([trainName, trainTickets]) => (
              <div
                className={`boder-white group mb-4 flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-around gap-2 rounded-[30px] border bg-black bg-opacity-20 p-1 px-2 shadow-lg ${selectedTrain === trainName ? 'bg-primary bg-opacity-100' : ''}`}
                onClick={() => handleTrainChange(trainName)} 
                key={trainName}
              >
                <div className="w-[100px] rounded-3xl bg-white text-black group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary">
                  <p className="text-center">
                    {trainTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name}
                  </p>
                </div>
                <div className="h-[150px] w-full rounded-2xl bg-white p-2 text-start text-sm font-bold">
                  <p>
                    Ngày đi:
                    {new Date(trainTickets[0].trip_id.departure_date).toLocaleDateString('vi-VN')}
                  </p>
                  <p>
                    Ngày về:
                    {new Date(trainTickets[0].trip_id.return_date).toLocaleDateString('vi-VN')}
                  </p>
                  <p>Giờ đi: {trainTickets[0].trip_id?.departure_time}</p>
                  <p>Giờ về: {trainTickets[0].trip_id?.return_time}</p>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                </div>
              </div>
            ))}
          </div>
          {/* SeatCatalog */}
          {selectedTrain && ticketsByCarriage && (
            <div>
              <div className="mb-4 flex justify-center space-x-4">
                {Object.entries(ticketsByCarriage).map(
                  ([classId, classTickets]) => (
                    <Button
                      key={classId}
                      color="primary"
                      size="sm"
                      onClick={() => setSelectedClassId(classId)}
                      className={`text-md font-semibold text-white dark:bg-white dark:text-primary ${
                        selectedClassId === classId
                          ? 'bg-opacity-100'
                          : 'bg-opacity-50'
                      }`}
                    >
                      {classTickets[0].seat_id[0]?.seat_catalog_id.name}
                    </Button>
                  )
                )}
              </div>
              <div className="p-4">
                {selectedClassId && ticketsByCarriage[selectedClassId] && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary p-2 dark:border-white">
                    {ticketsByCarriage[selectedClassId].map((ticket, index) => {
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
                )}
              </div>
            </div>
          )}
        </div>
        <div className="hidden w-full xl:block">
          <CartPage />
        </div>
      </div>
    </div>
  );
};

export default TicketTrainsResultsPage;
