import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../../components/orther/error/ErrorLoading';
import { ITicket } from '../../../types/type/ticket/ticket';
import { useCart } from '../../../context/cart/CartContext';
import CartPage from '../CartPage';
import { Button } from 'react-daisyui';
import { GiSteeringWheel } from "react-icons/gi";
import { GiBusDoors } from "react-icons/gi";
import { getAllTicketsApi } from '../../../axios/api/ticketApi';

const TicketBusesResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const { addSeat, selectedSeats } = useCart();


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Lấy dữ liệu vé từ sessionStorage
        const storedTickets = sessionStorage.getItem('searchResults');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets) as ITicket[];
          setTickets(parsedTickets);

          // Gọi API để lấy dữ liệu mới cho các vé
          const allTicketsResponse = await getAllTicketsApi();
          const allTickets = allTicketsResponse.data.tickets;

          // Cập nhật dữ liệu trong sessionStorage với dữ liệu mới
          const updatedTickets = parsedTickets.map(ticket => {
            // Nếu trạng thái của vé là 'Đang chọn', không cập nhật
            if (ticket.seat_id[0]?.status === 'Đang chọn') {
              return ticket;
            }
            // Nếu trạng thái không phải 'Đang chọn', cập nhật bằng dữ liệu mới
            const freshTicket = allTickets.find(t => t._id === ticket._id);
            return freshTicket || ticket; // Trả về vé mới hoặc vé cũ nếu không tìm thấy
          });

          setTickets(updatedTickets);
          sessionStorage.setItem(
            'searchResults',
            JSON.stringify(updatedTickets)
          );

          // Tự động chọn tàu và loại ghế đầu tiên nếu có vé
          const initialBusName =
            updatedTickets[0]?.seat_id[0]?.seat_catalog_id.vehicle_id.name ||
            null;
          setSelectedBus(initialBusName);
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
  const ticketsByBus = tickets.reduce(
    (acc: { [key: string]: ITicket[] }, ticket) => {
      const busName = ticket.seat_id[0]?.seat_catalog_id.vehicle_id.name;
      if (!acc[busName]) {
        acc[busName] = [];
      }
      acc[busName].push(ticket);
      return acc;
    },
    {}
  );

  const ticketsByClass = selectedBus
    ? ticketsByBus[selectedBus].reduce(
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
        ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Đang Chọn' }] }
        : t
    );

    sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

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
            <strong>{tripInfo.destination_point.name}</strong> &nbsp;(<strong>{tickets[0]?.seat_id[0]?.seat_catalog_id.vehicle_id.name}</strong>)
          </h1>

          <div className="mb-8 flex flex-wrap justify-center space-x-16">
            {Object.entries(ticketsByBus).map(([busName, busTickets]) => (
              <div
                className={`hover:bg-white group mb-4 flex h-[250px] w-[225px] cursor-pointer flex-col items-center justify-around rounded-[30px] border bg-black bg-opacity-20 p-1 px-2 shadow-lg ${selectedBus === busName ? 'bg-primary bg-opacity-100' : ''}`}
                onClick={() => setSelectedBus(busName)}
                key={busName}
              >
                <div className="group-hover:border h-10 w-[150px] rounded-3xl bg-white text-black group-hover:border-white group-hover:bg-primary group-hover:text-white">
                  <p className="py-[5px] text-center">
                    {busTickets[0].seat_id[0]?.seat_catalog_id.vehicle_id.name}
                  </p>
                </div>
                <div className="h-[150px] w-full rounded-3xl bg-white p-2 text-start text-lg font-light  border-white border-2 group-hover:border-gray-400">
                  <p>
                    Ngày đi:
                    {new Date(
                      busTickets[0].trip_id?.departure_date
                    ).toLocaleDateString('vi-VN')}
                  </p>
                  <p>Giờ đi: {busTickets[0].trip_id?.departure_time}</p>
                  {busTickets[0]?.ticket_catalog_id?.name.toLowerCase() !== 'một chiều' && (
                    <>
                  <p>
                    Ngày về:
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
                    <hr className="w-full border-white border-2 group-hover:border-gray-400" />
                    <hr className="w-full border-white border-2 group-hover:border-gray-400" />
                  </div>
                  <div className="h-6 w-6 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary dark:group-hover:bg-secondary"></div>
                </div>
                <div className='relative'>
                  <div
                    className="w-[35px] h-[50px] bg-slate-400 bg-opacity-100 absolute left-28 bottom-36 rounded-r-full"
                    style={{ clipPath: "polygon(0 60%, 100% 50%, 100% 100%, 0% 100%)" }}
                  />
                  <div
                    className="w-[40px] h-[50px] bg-slate-400 bg-opacity-100 absolute right-28 bottom-36 rounded-l-full"
                    style={{ clipPath: "polygon(0% 50%, 100% 60%, 100% 100%, 0% 100%)" }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className=' flex flex-col  justify-center sm:flex-row '>
            {selectedBus &&
              ticketsByClass &&
              Object.entries(ticketsByClass).map(
                ([classId, classTickets]) => (
                  <div key={classId} className="mb-6 xl:mx-[20px] w-full sm:w-[90%] md:w-[45%] pl-10">
                    <Button
                      color="primary"
                      size="sm"
                      className="text-md mb-10 font-semibold text-white dark:bg-white dark:text-primary"
                    >
                      {classTickets[0].seat_id[0]?.seat_catalog_id.name}
                    </Button>
                    <p className='p-1 font-bold'>Vị trí ghế ngồi:</p>
                    <div className='flex'>
                      <Button
                        size="md"
                        className="text-black  shadow-xl "
                      >
                        <GiSteeringWheel />
                        Lái Xe
                      </Button>
                      <Button
                        size="md"
                        className="text-black mb-2 ml-10 shadow-xl"
                      >
                        <GiBusDoors />
                        Cửa Lên
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 rounded-xl  dark:border-white w-[250px]">
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
                              onClick={() => handleSeatClick(ticket)}
                              key={index}
                              className={`relative flex h-12 w-1/4 items-center justify-center rounded-md border transition-all duration-200 ease-in-out ${seatStatus === 'Hết chỗ'
                                  ? 'cursor-not-allowed border-orange-400 bg-orange-400 text-white'
                                  : seatStatus === 'Còn chỗ'
                                    ? 'cursor-pointer  border-blue-500 bg-blue-300 text-black hover:bg-blue-400' 
                                      : 'cursor-not-allowed border-gray-500 bg-gray-500 text-white'
                                } group m-1`}
                            >
                              {ticket.seat_id[0]?.ordinal_numbers}

                              <div
                                className={`absolute -bottom-2 left-1/2 z-10 w-[100px] -translate-x-1/2 transform rounded bg-white p-2 text-center text-xs text-black opacity-0 group-hover:opacity-100 shadow-headerMenu shadow-primary transition-opacity duration-200 ease-in-out `}
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
