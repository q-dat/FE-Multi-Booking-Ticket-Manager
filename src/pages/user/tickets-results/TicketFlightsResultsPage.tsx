import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { ITicket } from '../../../types/type/ticket/ticket';
import { useCart } from '../../../context/cart/CartContext';
import CartPage from '../CartPage';
import { Button } from 'react-daisyui';
import { getAllTicketsApi } from '../../../axios/api/ticketApi'; // Thêm import API
import { listenToNewTickets, offSocketEvents } from '../../../socket/seatSocket';

const TicketFlightsResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null); // Thêm state cho selectedClassId
  const { addSeat, selectedSeats } = useCart();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const storedTickets = localStorage.getItem('searchResults');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets) as ITicket[];
          setTickets(parsedTickets);

          // Gọi API để lấy dữ liệu mới cho các vé
          const allTicketsResponse = await getAllTicketsApi();
          const allTickets = allTicketsResponse.data.tickets;

          // Cập nhật dữ liệu trong localStorage với dữ liệu mới
          const updatedTickets = parsedTickets
            .map(ticket => {
              if (ticket.seat_id[0]?.status === 'Đang chọn') {
                return ticket;
              }
              const freshTicket = allTickets.find(t => t._id === ticket._id);
              return freshTicket || ticket;
            })
            .sort(
              (a, b) =>
                a.seat_id[0]?.ordinal_numbers - b.seat_id[0]?.ordinal_numbers
            );
          setTickets(updatedTickets);
          localStorage.setItem(
            'searchResults',
            JSON.stringify(updatedTickets)
          );

          // Tự động chọn chuyến bay và loại ghế đầu tiên nếu có vé
          const initialFlightName =
            updatedTickets[0]?.seat_id[0]?.seat_catalog_id.vehicle_id.name ||
            null;
          setSelectedFlight(initialFlightName);
          const firstClassId =
            updatedTickets[0]?.seat_id[0]?.seat_catalog_id._id || null;
          setSelectedClassId(firstClassId);
        } else {
          setError('Không tìm thấy dữ liệu vé trong session.');
        }
      } catch (err) {
        console.error(err);
        setError('Lỗi khi tải vé.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
    const handleNewTicket = () => {
      fetchTickets();
    };

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
  }, [selectedSeats]);

  if (loading) {
    // return <LoadingLocal />;
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

  const handleFlightChange = (flightName: string) => {
    // Thêm hàm xử lý thay đổi chuyến bay
    setSelectedFlight(flightName);
    setSelectedClassId(
      ticketsByFlight[flightName][0]?.seat_id[0]?.seat_catalog_id._id || null
    );
  };

  return (
    <div className="pb-[20px] xl:pt-[90px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Flights')} />
      <div className="flex w-full flex-col items-start justify-center px-2 xl:flex-row xl:px-[50px]">
        <div className="block w-full xl:hidden">
          <CartPage />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-start justify-between">
            <div className="w-full">
              <h1 className="mx-2 mb-5 border-[4px] border-b-0 border-r-0 border-t-0 border-primary bg-blue-200 px-5 py-1 text-center text-xl text-black dark:border-white dark:bg-gray-400 dark:text-white xl:text-start">
                {t('UserPage.TicketTrainsResults.TripFrom')}
                &nbsp; <strong>{tripInfo.departure_point?.name}</strong>
                <span className="px-2">
                  {t('UserPage.TicketTrainsResults.To')}
                </span>
                <strong>{tripInfo.destination_point?.name}</strong> &nbsp;
              </h1>
              <div className="mb-8 flex w-full flex-row items-center justify-center overflow-x-auto scrollbar-hide">
                {Object.entries(ticketsByFlight).map(
                  ([flightName, flightTickets]) => (
                    <>
                      <div
                        className="h-[100px] w-[100px] bg-primary bg-opacity-100"
                        style={{
                          clipPath:
                            'polygon(20% 75%, 100% 60%, 100% 100%, 0% 100%)'
                        }}
                      />
                      <div
                        className={`group mb-4 flex h-[300px] w-[180px] cursor-pointer flex-col items-center justify-around gap-1 rounded-[150px] border border-white bg-black bg-opacity-20 p-12 shadow-lg ${selectedFlight === flightName ? 'bg-primary bg-opacity-100' : ''}`}
                        onClick={() => handleFlightChange(flightName)}
                        key={flightName}
                      >
                        <div className="w-[150px] rounded-md bg-white p-2 text-black group-hover:bg-primary group-hover:text-white dark:group-hover:bg-secondary">
                          <p className="truncate text-center text-base font-medium">
                            {
                              flightTickets[0]?.seat_id[0]?.seat_catalog_id
                                .vehicle_id.name
                            }
                          </p>
                        </div>
                        <div className="w-[150px] rounded-md bg-white p-2 text-start text-sm font-medium">
                          <p>
                            <span className="font-semibold">
                              {t('UserPage.DepartureDatePlaceholder')}:
                            </span>{' '}
                            {new Date(
                              flightTickets[0]?.trip_id?.departure_date
                            ).toLocaleDateString('vi-VN')}
                          </p>
                          <p>
                            <span className="font-semibold">
                              {t('UserPage.DepartureTimePlaceholder')}:
                            </span>{' '}
                            {flightTickets[0]?.trip_id?.departure_time}
                          </p>
                          {flightTickets[0]?.ticket_catalog_id?.name.toLowerCase() !==
                            'một chiều' && (
                            <>
                              <p>
                                <span className="font-semibold">
                                  {t('UserPage.ReturnDatePlaceholder')}:
                                </span>{' '}
                                {new Date(
                                  flightTickets[0]?.trip_id?.return_date
                                ).toLocaleDateString('vi-VN')}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  {t('UserPage.ReturnTimePlaceholder')}:
                                </span>{' '}
                                {flightTickets[0]?.trip_id?.return_time}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        className="h-[100px] w-[100px] bg-primary bg-opacity-100"
                        style={{
                          clipPath:
                            'polygon(0 60%, 80% 75%, 100% 100%, 0% 100%)'
                        }}
                      />
                    </>
                  )
                )}
              </div>
              {/*  */}
              <div className="mb-10 flex w-full flex-row items-center justify-center gap-5">
                <div className="flex items-center justify-center gap-1">
                  <p className="h-5 w-5 rounded-md border border-black bg-green-500"></p>
                  <p>Còn Chỗ</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className="h-5 w-5 rounded-md border border-black bg-red-500"></p>
                  <p>Hết Chỗ</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <p className="h-5 w-5 rounded-md border border-black bg-white"></p>
                  <p>Đang Chọn</p>
                </div>
              </div>
              {/*  */}
            </div>
            <div className="hidden w-full xl:block">
              <CartPage />
            </div>
          </div>
          {selectedFlight && ticketsByClass && (
            <div>
              <div className="mb-4 flex justify-center space-x-4">
                {Object.entries(ticketsByClass).map(
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

              <div>
                {selectedClassId && ticketsByClass[selectedClassId] && (
                  <div className="plane mx-auto my-5 max-w-[300px]">
                    <div className="border-b-5 relative h-[250px] w-[300px] overflow-hidden border-gray-300 text-center">
                      <div className="absolute bottom-0 left-0 flex h-[250px] w-full items-center justify-center rounded-t-[150px] bg-primary">
                        <div
                          className="h-[100px] w-[130px] bg-white bg-opacity-100"
                          style={{
                            clipPath:
                              '  polygon(100% 25%, 100% 100%, 50% 70%, 0 100%, 0 25%, 50% 0)'
                          }}
                        />
                        <div
                          className="h-[100px] w-[130px] bg-white bg-opacity-100"
                          style={{
                            clipPath:
                              '   polygon(100% 25%, 100% 100%, 50% 70%, 0 100%, 0 25%, 50% 0)'
                          }}
                        />
                      </div>
                    </div>
                    <div className="exit exit--front fuselage relative h-12">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-green-500 px-2 text-xs font-bold text-white">
                        EXIT
                      </span>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-green-500 px-2 text-xs font-bold text-white">
                        EXIT
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <div className="border border-gray-400 p-2">
                        <div className="grid grid-cols-6 gap-2">
                          {ticketsByClass[selectedClassId].map(
                            (ticket, index) => {
                              const seatStatus = ticket.seat_id[0]?.status;

                              return (
                                <div
                                  key={index}
                                  onClick={() =>
                                    seatStatus === 'Còn chỗ' && addSeat(ticket)
                                  }
                                  className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-md border transition-all duration-200 ease-in-out ${
                                    seatStatus === 'Hết chỗ'
                                      ? 'cursor-not-allowed border-red-700 bg-red-500 text-white'
                                      : seatStatus === 'Còn chỗ'
                                        ? 'cursor-pointer border-green-700 bg-green-500 text-white hover:bg-green-600'
                                        : 'cursor-progress border-gray-300 bg-white font-bold text-black'
                                  } group`}
                                >
                                  {ticket.seat_id[0]?.ordinal_numbers}
                                  <div
                                    className={`pointer-events-none absolute bottom-10 left-1/2 z-10 w-[100px] -translate-x-1/2 transform rounded bg-white p-2 text-center text-xs text-black opacity-0 shadow-headerMenu shadow-primary transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
                                  >
                                    {seatStatus === 'Còn chỗ' ? (
                                      <>
                                        <strong>
                                          {ticket.seat_id[0]?.name}
                                        </strong>
                                        <p>
                                          <strong>Giá:</strong>{' '}
                                          {(ticket.price * 1000).toLocaleString(
                                            'vi-VN'
                                          )}{' '}
                                          VNĐ
                                        </p>
                                      </>
                                    ) : (
                                      <p>{seatStatus}</p>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="exit exit--back fuselage relative h-12">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 transform bg-green-500 px-2 text-xs font-bold text-white">
                        EXIT
                      </span>
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 transform bg-green-500 px-2 text-xs font-bold text-white">
                        EXIT
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketFlightsResultsPage;
