import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { ITicket } from '../../../types/type/ticket/ticket';
import { useCart } from '../../../context/cart/CartContext';
import CartPage from '../CartPage';
import { Button } from 'react-daisyui';
import { getAllTicketsApi } from '../../../axios/api/ticketApi';
import {
  listenToNewTickets,
  offSocketEvents
} from '../../../socket/seatSocket';

const TicketTrainsResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const storedTickets = localStorage.getItem('searchResults');
        if (!storedTickets)
          throw new Error('Không tìm thấy dữ liệu vé trong session.');

        const parsedTickets = JSON.parse(storedTickets) as ITicket[];
        const {
          data: { tickets: allTickets }
        } = await getAllTicketsApi();

        const updatedTickets = parsedTickets.map(ticket =>
          ticket.seat_id[0]?.status === 'Đang chọn'
            ? ticket
            : allTickets.find(t => t._id === ticket._id) || ticket
        );

        setTickets(updatedTickets);
        localStorage.setItem('searchResults', JSON.stringify(updatedTickets));

        if (updatedTickets.length > 0) {
          setSelectedTrain(
            updatedTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name
          );
          setSelectedClassId(updatedTickets[0].seat_id[0]?.seat_catalog_id._id);
        }
      } catch (err) {
        console.error(err);
        setError('Lỗi khi tải vé.');
      } finally {
        setLoading(false);
        updateSeatStatus();
      }
    };

    const updateSeatStatus = () => {
      const storedListID = localStorage.getItem('listID');
      if (!storedListID) return;

      const listID = JSON.parse(storedListID) as string[];

      const storedSearchResults = localStorage.getItem('searchResults');
      if (!storedSearchResults) return;

      const searchResults = JSON.parse(storedSearchResults) as ITicket[];

      const updatedResults = searchResults.map(ticket => {
        const isSeatSelected = listID.includes(ticket.seat_id[0]?._id || '');
        return {
          ...ticket,
          seat_id: ticket.seat_id.map(seat => ({
            ...seat,
            status: isSeatSelected ? 'Đang chọn' : seat.status
          }))
        };
      });

      localStorage.setItem('searchResults', JSON.stringify(updatedResults));
      setTickets(updatedResults);
    };

    const handleNewTicket = () => {
      fetchTickets();
    };

    fetchTickets();
    listenToNewTickets(handleNewTicket);

    return () => {
      offSocketEvents();
    };
  }, []);

  useEffect(() => {
    const storedTickets = localStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
    } else {
      setTickets([]);
    }
    //
    const updateSeatIDList = () => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const cartItems = JSON.parse(storedCart) as ITicket[];
        const seatIDs = cartItems
          .map(item => item.seat_id[0]?._id)
          .filter(Boolean); // Lọc bỏ undefined/null
        localStorage.setItem('listID', JSON.stringify(seatIDs));
      } else {
        localStorage.setItem('listID', JSON.stringify([]));
      }
    };
    const updateSeatStatus = () => {
      const storedListID = localStorage.getItem('listID');
      const storedSearchResults = localStorage.getItem('searchResults');

      if (!storedSearchResults) return;

      const searchResults = JSON.parse(storedSearchResults) as ITicket[];
      const listID = storedListID ? (JSON.parse(storedListID) as string[]) : [];

      // Cập nhật trạng thái ghế
      const updatedResults = searchResults.map(ticket => ({
        ...ticket,
        seat_id: ticket.seat_id.map(seat => ({
          ...seat,
          status:
            listID.length > 0 && listID.includes(seat._id)
              ? 'Đang chọn'
              : 'Còn chỗ'
        }))
      }));

      localStorage.setItem('searchResults', JSON.stringify(updatedResults));
      setTickets(updatedResults);
    };
    updateSeatIDList();
    updateSeatStatus();
  }, [selectedSeats]);

  // if (loading) {
  // return <LoadingLocal />;
  // }
  console.log(loading);

  if (error) {
    return <ErrorLoading />;
  }

  if (tickets.length === 0) {
    return <LoadingLocal />;
  }
  //Tittle
  const tripInfo = tickets[0]?.trip_id;
  const ticketCatalogInfo = tickets[0]?.ticket_catalog_id;
  //Ticket By Vehicle
  const ticketsByTrain = tickets.reduce(
    (acc, ticket) => {
      const trainName = ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name;
      acc[trainName] = acc[trainName] ? [...acc[trainName], ticket] : [ticket];
      return acc;
    },
    {} as Record<string, ITicket[]>
  );
  //Ticket by Carriage(SeatCatalog)
  const ticketsByCarriage = selectedTrain
    ? ticketsByTrain[selectedTrain].reduce(
        (acc, ticket) => {
          const carriageId = ticket.seat_id[0]?.seat_catalog_id._id;
          acc[carriageId] = acc[carriageId]
            ? [...acc[carriageId], ticket]
            : [ticket];
          return acc;
        },
        {} as Record<string, ITicket[]>
      )
    : {};

  // Khi người dùng chọn một tàu khác, tự động chọn danh mục ghế đầu tiên của tàu đó
  const handleTrainChange = (trainName: string) => {
    setSelectedTrain(trainName);
    setSelectedClassId(
      ticketsByTrain[trainName][0]?.seat_id[0]?.seat_catalog_id._id || null
    );
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
            {t('UserPage.TicketTrainsResults.TripFrom')}
            &nbsp; <strong>{tripInfo.departure_point?.name}</strong>
            <span className="px-2">{t('UserPage.TicketTrainsResults.To')}</span>
            <strong>{tripInfo.destination_point?.name}</strong> &nbsp;(
            <strong>{ticketCatalogInfo.name}</strong>)
          </h1>
          {/* Vehicle Catalog */}
          <div className="mb-8 flex w-full flex-row items-center justify-center gap-5 overflow-x-auto scrollbar-hide">
            {Object.entries(ticketsByTrain).map(([trainName, trainTickets]) => (
              <div
                className={`boder-white group mb-4 flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-around gap-2 rounded-[30px] border bg-black bg-opacity-20 p-1 px-2 shadow-lg ${selectedTrain === trainName ? 'bg-primary bg-opacity-60' : ''}`}
                key={trainName}
                onClick={() => handleTrainChange(trainName)}
              >
                <div className="w-[100px] rounded-3xl bg-white text-black group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary">
                  <p className="text-center">
                    {
                      trainTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id
                        .name
                    }
                  </p>
                </div>
                <div className="h-[150px] w-full rounded-2xl bg-white p-2 text-start text-[12px]">
                  <p>
                    <strong>{t('UserPage.DepartureDatePlaceholder')}:</strong>
                    {new Date(
                      trainTickets[0].trip_id?.departure_date
                    ).toLocaleDateString('vi-VN')}
                  </p>
                  <p>
                    <strong>{t('UserPage.DepartureTimePlaceholder')}:</strong>
                    {trainTickets[0].trip_id?.departure_time}
                  </p>
                  <div>
                    {trainTickets[0].ticket_catalog_id?.name.toLowerCase() !==
                      'một chiều' && (
                      <>
                        <p>
                          <strong>
                            {t('UserPage.ReturnDatePlaceholder')}:
                          </strong>
                          {trainTickets[0].ticket_catalog_id?.name.toLowerCase() !==
                          'một chiều'
                            ? new Date(
                                trainTickets[0].trip_id?.return_date
                              ).toLocaleDateString('vi-VN')
                            : 'N/A'}
                        </p>
                        <p>
                          <strong>
                            {t('UserPage.ReturnTimePlaceholder')}:
                          </strong>
                          {trainTickets[0].ticket_catalog_id?.name.toLowerCase() !==
                          'một chiều'
                            ? trainTickets[0].trip_id?.return_time
                            : 'N/A'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                </div>
              </div>
            ))}
          </div>
          {/*  */}
          <div className="mb-10 flex w-full flex-row items-center justify-center gap-5 text-black dark:text-white">
            <div className="flex items-center justify-center gap-1">
              <p className="h-5 w-5 rounded-md border border-black bg-green-500"></p>
              <p> {t('UserPage.TicketTrainsResults.EmptySeats')}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p className="h-5 w-5 rounded-md border border-black bg-red-500"></p>
              <p> {t('UserPage.TicketTrainsResults.NoSeats')}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p className="h-5 w-5 rounded-md border border-black bg-white"></p>
              <p> {t('UserPage.TicketTrainsResults.Selecting')}</p>
            </div>
          </div>
          {/* SeatCatalog */}
          <div>
            {selectedTrain && ticketsByCarriage && (
              <div className="w-full">
                <div className="mb-4 flex w-full flex-row items-start justify-start overflow-auto scrollbar-hide">
                  <img
                    width={50}
                    height={50}
                    src="https://i.ibb.co/3sKMBgp/tau.jpg"
                    alt="Vehicle"
                    className="scale-x-[-1] rounded-md rounded-r-full"
                  />
                  {Object.entries(ticketsByCarriage)
                    .sort(([, classTicketsA], [, classTicketsB]) => {
                      const nameA =
                        classTicketsA[0].seat_id[0]?.seat_catalog_id.name || '';
                      const nameB =
                        classTicketsB[0].seat_id[0]?.seat_catalog_id.name || '';
                      return nameA.localeCompare(nameB);
                    })
                    .map(([classId, classTickets]) => (
                      <div
                        key={classId}
                        className="flex flex-row items-end justify-center"
                      >
                        <p className="text-black dark:text-white">+</p>
                        <div className="rounded-sm border border-b-[5px] border-l-0 border-r-0 border-t-0 border-dotted border-black dark:border-white">
                          <Button
                            size="xs"
                            onClick={() => setSelectedClassId(classId)}
                            className={`text-md min-w-[100px] rounded-sm border-none text-xs font-semibold shadow-headerMenu shadow-black hover:bg-secondary ${
                              selectedClassId === classId
                                ? 'bg-[#0084c1] text-white'
                                : 'bg-black bg-opacity-20 text-black dark:bg-white dark:text-[#0084c1]'
                            }`}
                          >
                            <p className="inline-block">
                              {classTickets[0].seat_id[0]?.seat_catalog_id.name}
                            </p>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
                {/* SeatMap */}
                <div className="w-full">
                  {selectedClassId && ticketsByCarriage[selectedClassId] && (
                    <div
                      className={`${
                        ticketsByCarriage[selectedClassId].length === 64
                          ? 'grid-cols-16 zebra-background64 grid-rows-4 gap-x-5 gap-y-10'
                          : ticketsByCarriage[selectedClassId].length === 42
                            ? 'grid-cols-14 zebra-background42 grid-rows-3 gap-x-5 gap-y-10'
                            : ticketsByCarriage[selectedClassId].length === 28
                              ? 'zebra-background28 grid-cols-12 grid-rows-2 gap-x-5 gap-y-10'
                              : ''
                      } grid grid-flow-col items-center justify-around gap-x-5 gap-y-10 overflow-x-auto rounded-xl border border-l-0 border-r-0 border-primary p-2 scrollbar-hide dark:border-white xl:gap-x-1 xl:overflow-visible`}
                    >
                      {ticketsByCarriage[selectedClassId]
                        .sort(
                          (a, b) =>
                            a.seat_id[0]?.ordinal_numbers -
                            b.seat_id[0]?.ordinal_numbers
                        )
                        .map((ticket, index) => {
                          const seatStatus = ticket.seat_id[0]?.status;
                          return (
                            <div
                              onClick={() => addSeat(ticket)}
                              key={index}
                              className={`relative flex h-8 w-8 items-center justify-center rounded-md font-semibold shadow-headerMenu shadow-black transition-all duration-200 ease-in-out ${
                                seatStatus === 'Hết chỗ'
                                  ? 'cursor-not-allowed border-red-700 bg-red-500 text-white'
                                  : seatStatus === 'Còn chỗ'
                                    ? 'cursor-pointer border-green-700 bg-green-500 text-white hover:bg-green-600'
                                    : 'cursor-progress border-gray-300 bg-white font-bold text-black'
                              } group`}
                            >
                              {ticket.seat_id[0]?.ordinal_numbers}
                              <div
                                className={`pointer-events-none absolute bottom-10 left-1/2 z-[99999] w-[100px] -translate-x-1/2 transform rounded bg-white p-2 text-start text-xs text-black opacity-0 shadow-headerMenu shadow-primary transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
                              >
                                {seatStatus === 'Còn chỗ' ? (
                                  <>
                                    <p className="text-[12px] font-semibold">
                                      {ticket.seat_id[0]?.name}
                                    </p>
                                    <div className="text-red-500">
                                      <p className="text-black">
                                        {t('UserPage.TicketPrice')}:
                                      </p>
                                      {(ticket.price * 1000).toLocaleString(
                                        'vi-VN'
                                      )}
                                      <span className="text-black">VNĐ</span>
                                    </div>
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
        </div>
        <div className="hidden w-full xl:block">
          <CartPage />
        </div>
      </div>
    </div>
  );
};

export default TicketTrainsResultsPage;
