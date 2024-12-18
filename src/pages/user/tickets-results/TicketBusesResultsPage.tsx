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
import { IoMdPricetag } from 'react-icons/io';
import { IoTicket, IoTrainSharp } from 'react-icons/io5';

const TicketBusesResultsPage: React.FC = () => {
  const { searchTickets } = useContext(TicketContext);
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  // const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart();
  const [isHidden, setIsHidden] = useState(true);

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
  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };


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
          <div className="mx-auto w-full max-w-2xl rounded-2xl">
            <div>
              {Object.entries(ticketsByBus).map(([busName, busTickets]) => (
                <div>
                  <div
                    className={`group flex flex-col lg:flex-row items-center justify-between p-4 mb-4 rounded-xl  shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ${selectedBus === busName ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    onClick={() => setSelectedBus(busName)}
                    key={busName}
                  >
                    {/* Hình ảnh phương tiện */}
                    <img
                      src="https://photo.znews.vn/w660/Uploaded/OFH_oazszstq/2017_06_13/2_mercedes_bus.jpg"
                      alt="Bus"
                      className="w-48 h-48 object-cover rounded-lg mb-4 lg:mb-0 lg:mr-6"
                    />

                    {/* Thông tin chuyến đi */}
                    <div className="text-center lg:text-left flex-1">
                      {/* Điểm đi - Điểm đến */}
                      <div className="mb-4 flex items-center justify-center lg:justify-start gap-3">
                        <span className="font-bold text-xl text-blue-600">{tripInfo.departure_point.name}</span>
                        <p className="text-2xl text-gray-500">→</p>
                        <span className="font-bold text-xl text-blue-600">{tripInfo.destination_point.name}</span>
                      </div>

                      {/* Giá vé */}
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                        <IoMdPricetag className="text-blue-500 text-2xl" />
                        <span className="font-bold text-red-500 text-2xl">
                          {(tickets[0]?.price * 1000).toLocaleString('vi-VN') || 'N/A'} VND
                        </span>
                      </div>
                      {/* Loại vé */}
                      <div className="flex items-center gap-2 mb-3">
                        <IoTicket className="text-blue-600" />
                        <p className="text-sm text-gray-600">{t('UserPage.TicketType')}</p>
                        <span className="font-semibold text-blue-600">
                          {tickets[0]?.ticket_catalog_id?.name || 'N/A'}
                        </span>
                      </div>
                      {/* Loại phương tiện */}
                      <div className="flex items-center gap-2 mb-3">
                        <IoTrainSharp className="text-blue-600" />
                        <p className="text-sm text-gray-600">{t('UserPage.Vehicle')}</p>
                        <span className="font-semibold text-blue-600">
                          {busTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name}
                        </span>
                      </div>
                      {/* Ngày giờ đi */}
                      <p className="text-base text-gray-700">
                        Ngày đi: <span className="font-bold text-blue-600">{new Date(busTickets[0]?.trip_id.departure_date).toLocaleDateString('vi-VN')}</span>
                      </p>
                      <p className="text-base text-gray-700">
                        Giờ đi: <span className="font-bold text-blue-600">{busTickets[0]?.trip_id.departure_time}</span>
                      </p>

                      {/* Thông tin vé khứ hồi (nếu có) */}
                      {busTickets[0]?.ticket_catalog_id?.name.toLowerCase() !== 'một chiều' && (
                        <div className="mt-3">
                          <p className="text-base text-gray-700">
                            Ngày về: <span className="font-bold text-blue-600">{new Date(busTickets[0]?.trip_id.return_date).toLocaleDateString('vi-VN')}</span>
                          </p>
                          <p className="text-base text-gray-700">
                            Giờ về: <span className="font-bold text-blue-600">{busTickets[0]?.trip_id.return_time}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Nút chọn chuyến */}
                    <button
                      onClick={toggleHidden}
                      className="mt-6 lg:mt-0 lg:ml-6 rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
                    >
                      Chọn Chuyến
                    </button>
                  </div>
                </div>
              ))}
              <div className={isHidden ? 'hidden' : 'block'}>
                <div className="mb-4 mt-5 flex w-full flex-row items-center justify-center gap-3">
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src="https://futabus.vn/images/icons/seat_active.svg"
                      alt="seat icon"
                      width="25"
                      className="rounded"
                    />
                    <p>{t('UserPage.TicketTrainsResults.EmptySeats')}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src="https://futabus.vn/images/icons/seat_disabled.svg"
                      alt="seat icon"
                      width="25"
                      className="rounded"
                    />
                    <p>{t('UserPage.TicketTrainsResults.NoSeats')}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <img
                      src="https://futabus.vn/images/icons/seat_selecting.svg"
                      alt="seat icon"
                      width="25"
                      className="rounded"
                    />
                    <p>{t('UserPage.TicketTrainsResults.Selecting')}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center sm:flex-row">
                  {selectedBus &&
                    ticketsByCarriage &&
                    Object.entries(ticketsByCarriage).map(([classId, classTickets]) => (
                      <div
                        key={classId}
                        className="w-auto sm:w-auto md:w-auto xl:mx-[20px] pl-4 boder"
                      >
                        <Button
                          color="primary"
                          size="sm"
                          className="text-xs pointer-events-none mb-3 rounded-sm font-semibold text-white dark:bg-white dark:text-primary"
                        >
                          {classTickets[0].seat_id[0]?.seat_catalog_id.name}
                        </Button>
                        <p className="p-1 text-sm font-semibold">Vị trí ghế ngồi:</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="pointer-events-none text-black text-xs shadow-lg"
                          >
                            <GiSteeringWheel /> Lái Xe
                          </Button>
                          <Button
                            size="sm"
                            className="pointer-events-none text-black text-xs shadow-lg"
                          >
                            <GiBusDoors /> Cửa Lên
                          </Button>
                        </div>
                        <div className="grid w-[200px] grid-cols-3 gap-2 rounded-xl dark:border-white">
                          {classTickets
                            .sort((a, b) => {
                              const numA = parseInt(
                                a.seat_id[0]?.ordinal_numbers || '0',
                                10
                              );
                              const numB = parseInt(
                                b.seat_id[0]?.ordinal_numbers || '0',
                                10
                              );

                              return (isNaN(numA) ? 0 : numA) - (isNaN(numB) ? 0 : numB);
                            })
                            .map((ticket, index) => {
                              const seatStatus = ticket.seat_id[0]?.status;
                              const seatNumber =
                                ticket.seat_id[0]?.seat_catalog_id?.name === 'Giường Dưới'
                                  ? `A${ticket.seat_id[0]?.ordinal_numbers}`
                                  : `B${ticket.seat_id[0]?.ordinal_numbers}`;
                              return (
                                <div
                                  onClick={() => addSeat(ticket)}
                                  key={index}
                                  className="group m-1 relative"
                                >
                                  <div className="relative">
                                    {seatStatus === 'Hết chỗ' ? (
                                      <img
                                        src="https://futabus.vn/images/icons/seat_disabled.svg"
                                        alt="seat icon"
                                        width="32"
                                        className="rounded"
                                      />
                                    ) : seatStatus === 'Còn chỗ' ? (
                                      <img
                                        src="https://futabus.vn/images/icons/seat_active.svg"
                                        alt="seat icon"
                                        width="32"
                                        className="rounded"
                                      />
                                    ) : (
                                      <img
                                        src="https://futabus.vn/images/icons/seat_selecting.svg"
                                        alt="seat icon"
                                        width="32"
                                        className="rounded"
                                      />
                                    )}

                                    {/* Hiển thị số ghế ở giữa hình ảnh ghế */}
                                    <div className="absolute inset-0 flex items-center justify-center text-black text-xs font-semibold mr-4">
                                      {seatNumber}
                                    </div>
                                  </div>

                                  {/* Tooltip khi hover */}
                                  <div
                                    className={`absolute -bottom-2 left-1/2 z-10 w-[100px] -translate-x-1/2 transform rounded bg-white p-1 text-center text-xs text-black opacity-0 shadow-headerMenu transition-opacity duration-200 ease-in-out group-hover:opacity-100`}
                                  >
                                    {seatStatus === 'Còn chỗ' ? (
                                      <>
                                        <strong>{ticket.seat_id[0]?.name}</strong>
                                        <p>
                                          <strong>Giá:</strong>{' '}
                                          {(ticket.price * 1000).toLocaleString('vi-VN')} VNĐ
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
                    ))}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="hidden xl:block w-[50%] mx-auto">
          <CartPage />
        </div>


      </div>
    </div>
  );
};

export default TicketBusesResultsPage;
