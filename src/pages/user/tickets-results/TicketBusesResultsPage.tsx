import React, { useEffect, useState, useContext } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { ITicket } from '../../../types/type/ticket/ticket';
import { useCart } from '../../../context/cart/CartContext';
import CartPage from '../CartPage';
import { Button } from 'react-daisyui';
import { GiSteeringWheel } from 'react-icons/gi';
import { GiBusDoors } from 'react-icons/gi';
import {
  listenToNewTickets,
  offSocketEvents
} from '../../../socket/seatSocket';
import { TicketContext } from '../../../context/ticket/TicketContext';

const TicketBusesResultsPage: React.FC = () => {
  const { searchTickets } = useContext(TicketContext);
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  // const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart();

  useEffect(() => {
    let consecutiveCalls = 0; // Biến đếm số lần gọi liên tiếp
    const MAX_CONSECUTIVE_CALLS = 2; // Số lần gọi tối đa liên tiếp cho phép
    const fetchTickets = async () => {
      if (consecutiveCalls >= MAX_CONSECUTIVE_CALLS) {
        console.warn('Đã vượt quá số lần gọi liên tiếp cho phép.');
        return; // Dừng nếu gọi quá số lần cho phép
      }
      consecutiveCalls++; // Tăng biến đếm khi gọi API
      setLoading(true);
      try {
        const storedTickets = localStorage.getItem('searchResults');
        if (!storedTickets)
          throw new Error('Không tìm thấy dữ liệu vé trong session.');
        const parsedTickets = JSON.parse(storedTickets) as ITicket[];
        const searchParams = sessionStorage.getItem('searchParams');
        if (!searchParams) {
          throw new Error('Không tìm thấy tham số tìm kiếm trong session.');
        }
        const parsedSearchParams = JSON.parse(searchParams);

        // Tạo đối tượng tìm kiếm từ thông tin trong session
        const filterParams = {
          departure_date: parsedSearchParams.departure_date,
          departure_point_name: parsedSearchParams.departure_point_name,
          destination_point_name: parsedSearchParams.destination_point_name,
          return_date: parsedSearchParams.return_date,
          ticket_catalog_name: parsedSearchParams.ticket_catalog_name,
          vehicle_catalog_name: parsedSearchParams.vehicle_catalog_name
        };

        // Gọi API tìm kiếm vé
        const filteredTickets = await searchTickets(filterParams);

        const updatedTickets = parsedTickets.map(ticket =>
          ticket.seat_id[0]?.status === 'Đang chọn'
            ? ticket
            : filteredTickets.find(t => t._id === ticket._id) || ticket
        );

        setTickets(updatedTickets);
        localStorage.setItem('searchResults', JSON.stringify(updatedTickets));

        if (updatedTickets.length > 0) {
          setSelectedBus(
            updatedTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name
          );
          // setSelectedClassId(updatedTickets[0].seat_id[0]?.seat_catalog_id._id);
        }
      } catch (err) {
        console.error(err);
        setError('Lỗi khi tải vé.');
      } finally {
        setLoading(false);
        updateSeatStatus();

        setTimeout(() => {
          consecutiveCalls = 0;
        }, 5000);
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
    const updateSeatStatusIDList = () => {
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
    updateSeatStatusIDList();
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
  // const ticketCatalogInfo = tickets[0]?.ticket_catalog_id;
  //Ticket By Vehicle
  const ticketsByBus = tickets.reduce(
    (acc, ticket) => {
      const busName = ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name;
      acc[busName] = acc[busName] ? [...acc[busName], ticket] : [ticket];
      return acc;
    },
    {} as Record<string, ITicket[]>
  );
  //Ticket by Carriage(SeatCatalog)
  const ticketsByCarriage = selectedBus
    ? ticketsByBus[selectedBus].reduce(
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

  // // Khi người dùng chọn một tàu khác, tự động chọn danh mục ghế đầu tiên của tàu đó
  // const handleTrainChange = (busName: string) => {
  //   setSelectedBus(busName);
  //   setSelectedClassId(
  //     ticketsByBus[busName][0]?.seat_id[0]?.seat_catalog_id._id || null
  //   );
  // };

  return (
    <div className="pb-[20px] xl:pt-[90px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Buses')} />
      <div className="flex w-full flex-col items-start justify-center px-2 xl:flex-row xl:px-[50px]">
        <div className="block w-full xl:hidden">
          <CartPage />
        </div>
        <div className="w-full">
          <h1 className="mx-2 mb-5 border-[4px] border-b-0 border-r-0 border-t-0 border-primary bg-blue-200 px-5 py-1 text-center text-xl text-black dark:border-white dark:bg-gray-400 dark:text-white xl:text-start">
            Chuyến đi từ <strong>{tripInfo.departure_point.name}</strong> đến{' '}
            <strong>{tripInfo.destination_point.name}</strong> &nbsp;(
            <strong>
              {tickets[0]?.seat_id[0]?.seat_catalog_id.vehicle_id.name}
            </strong>
            )
          </h1>

          <div className="mb-8 flex flex-wrap justify-center space-x-16">
            {Object.entries(ticketsByBus).map(([busName, busTickets]) => (
              <div
                className={`group mb-4 flex h-[200px] w-[200px] cursor-pointer flex-col items-center justify-around rounded-[30px] border bg-black bg-opacity-20 p-1 px-2 shadow-lg hover:bg-white ${selectedBus === busName ? 'bg-primary bg-opacity-100' : ''}`}
                onClick={() => setSelectedBus(busName)}
                key={busName}
              >
                <div className="h-10 w-[150px] rounded-3xl bg-white text-black group-hover:border group-hover:border-white group-hover:bg-primary group-hover:text-white">
                  <p className="py-[5px] text-center">
                    {busTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name}
                  </p>
                </div>
                <div className="my-2 h-[150px] w-full rounded-3xl border-2 border-white bg-white p-2 text-start text-lg font-light group-hover:border-gray-400">
                  <p>
                    Ngày đi:{' '}
                    {new Date(
                      busTickets[0].trip_id?.departure_date
                    ).toLocaleDateString('vi-VN')}
                  </p>
                  <p>Giờ đi: {busTickets[0].trip_id?.departure_time}</p>
                  {busTickets[0]?.ticket_catalog_id?.name.toLowerCase() !==
                    'một chiều' && (
                    <>
                      <p>
                        Ngày về:{' '}
                        {new Date(
                          busTickets[0].trip_id?.return_date
                        ).toLocaleDateString('vi-VN')}
                      </p>
                      <p>Giờ về: {busTickets[0].trip_id?.return_time}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                  <div className="w-9">
                    <hr className="w-full border-2 border-white group-hover:border-gray-400" />
                    <hr className="w-full border-2 border-white group-hover:border-gray-400" />
                  </div>
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                </div>
                <div className="relative">
                  <div
                    className="absolute bottom-32 left-24 h-[50px] w-[35px] rounded-r-full bg-slate-400 bg-opacity-100"
                    style={{
                      clipPath: 'polygon(0 60%, 100% 50%, 100% 100%, 0% 100%)'
                    }}
                  />
                  <div
                    className="absolute bottom-32 right-24 h-[50px] w-[40px] rounded-l-full bg-slate-400 bg-opacity-100"
                    style={{
                      clipPath: 'polygon(0% 50%, 100% 60%, 100% 100%, 0% 100%)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mb-10 flex w-full flex-row items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-1">
              <p className="h-5 w-5 rounded-md border border-black bg-blue-500"></p>
              <p>{t('UserPage.TicketTrainsResults.EmptySeats')}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p className="h-5 w-5 rounded-md border border-black bg-orange-500"></p>
              <p>{t('UserPage.TicketTrainsResults.NoSeats')}</p>
            </div>
            <div className="flex items-center justify-center gap-1">
              <p className="h-5 w-5 rounded-md border border-black bg-gray-500"></p>
              <p>{t('UserPage.TicketTrainsResults.Selecting')}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center sm:flex-row">
            {selectedBus &&
              ticketsByCarriage &&
              Object.entries(ticketsByCarriage).map(
                ([classId, classTickets]) => (
                  <div
                    key={classId}
                    className="mb-6 w-full pl-10 sm:w-[90%] md:w-[45%] xl:mx-[20px]"
                  >
                    <Button
                      color="primary"
                      size="sm"
                      className="text-md pointer-events-none mb-10 rounded-sm font-semibold text-white dark:bg-white dark:text-primary"
                    >
                      {classTickets[0].seat_id[0]?.seat_catalog_id.name}
                    </Button>
                    <p className="p-1 font-bold">Vị trí ghế ngồi:</p>
                    <div className="flex">
                      <Button
                        size="sm"
                        className="pointer-events-none text-black shadow-xl"
                      >
                        <GiSteeringWheel /> Lái Xe
                      </Button>
                      <Button
                        size="sm"
                        className="pointer-events-none mb-2 ml-10 text-black shadow-xl"
                      >
                        <GiBusDoors /> Cửa Lên
                      </Button>
                    </div>
                    <div className="grid w-[250px] grid-cols-3 gap-4 rounded-xl dark:border-white">
                      {classTickets
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
                              className={`relative flex h-12 w-12 items-center justify-center rounded-md border transition-all duration-200 ease-in-out ${
                                seatStatus === 'Hết chỗ'
                                  ? 'cursor-not-allowed border-orange-400 bg-orange-400 text-white'
                                  : seatStatus === 'Còn chỗ'
                                    ? 'cursor-pointer border-blue-500 bg-blue-300 text-black hover:bg-blue-400'
                                    : 'cursor-not-allowed border-gray-500 bg-gray-500 text-white'
                              } group m-1`}
                            >
                              {ticket.seat_id[0]?.ordinal_numbers}
                              <div
                                className={`absolute -bottom-2 left-1/2 z-10 w-[120px] -translate-x-1/2 transform rounded bg-white p-2 text-center text-xs text-black opacity-0 shadow-headerMenu shadow-primary transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
                              >
                                {seatStatus === 'Còn chỗ' ? (
                                  <>
                                    <strong>{ticket.seat_id[0]?.name}</strong>
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
                        })}
                    </div>
                  </div>
                )
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

export default TicketBusesResultsPage;
