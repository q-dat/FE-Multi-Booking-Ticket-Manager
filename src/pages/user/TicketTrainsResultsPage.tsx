import React, { useEffect, useState } from 'react';
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave
} from 'react-icons/fa';
import HeaderResponsive from '../../components/UserPage/HeaderResponsive';
import { useTranslation } from 'react-i18next';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { Toastify } from '../../helper/Toastify';
import { ITicket } from '../../types/type/ticket/ticket';

const TicketTrainsResultsPage: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      setTickets(parsedTickets);
    } else {
      setError('Không tìm thấy dữ liệu vé trong session.');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingLocal />;
  }

  if (error) {
    return <ErrorLoading />;
  }

  if (tickets.length === 0) {
    Toastify('Không tìm thấy vé!', 404);
    return null;
  }

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Trains')} />
      <div>
        {tickets.map(ticketData => (
          <div className="flex flex-col bg-white p-3 text-center font-bold dark:bg-transparent md:p-10 xl:px-10 xl:py-8">
            <div className="my-5 flex flex-row items-center justify-center gap-5 text-2xl">
              <p>
                <span className="font-light"> Từ: </span>
                {ticketData.trip_id.departure_point.name}
              </p>
              <p>
                <span className="font-light"> đến: </span>
                {ticketData.trip_id.destination_point.name}
              </p>
            </div>
            <div className="hover:bg- group flex h-[280px] w-[250px] flex-col items-center justify-around rounded-[30px] bg-primary px-2">
              <div className="group-hover:boder h-10 w-[150px] rounded-3xl bg-white text-black group-hover:border group-hover:border-white group-hover:bg-primary group-hover:text-white">
                <p className="py-[5px]">
                  {ticketData.seat_id.seat_catalog_id.vehicle_id.name}
                </p>
              </div>
              <div className="h-[150px] w-full rounded-3xl bg-white p-2 text-start text-lg font-light">
                <p>
                  Ngày đi:
                  {new Date(
                    ticketData.trip_id.departure_date
                  ).toLocaleDateString()}
                </p>
                <p>Giờ đi: {ticketData.trip_id.departure_time}</p>
                <p>
                  Ngày về:
                  {new Date(
                    ticketData.trip_id.return_date
                  ).toLocaleDateString()}
                </p>
                <p>Giờ về: {ticketData.trip_id.return_time}</p>
              </div>
              <div className="flex flex-row gap-10">
                <div className="group-hover:boder h-10 w-10 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary"></div>
                <div className="group-hover:boder h-10 w-10 rounded-full bg-white group-hover:border group-hover:border-white group-hover:bg-primary"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*
       */}
      <div>
        <ul>
          {tickets.map(ticketData => (
            <li key={ticketData._id}>
              <h4>
                <FaTicketAlt /> Ticket ID: {ticketData._id}
              </h4>
              <p>Ticket Catalog: {ticketData.ticket_catalog_id.name}</p>
              <p>
                Seat: {ticketData.seat_id.name}
                (Price: {ticketData.seat_id.price}) (Status:
                {ticketData.seat_id.status.trim()}) (Ordinal Number:
                {ticketData.seat_id.ordinal_numbers})
              </p>
              <p>
                <FaMapMarkerAlt /> Departure:
                {ticketData.trip_id.departure_point.name}
              </p>
              <p>
                <FaMapMarkerAlt /> Destination:
                {ticketData.trip_id.destination_point.name}
              </p>
              <p>
                <FaMoneyBillWave /> Total Price: {ticketData.price}
              </p>
              <p>
                <FaCalendarAlt /> Departure Date:
                {new Date(
                  ticketData.trip_id.departure_date
                ).toLocaleDateString()}
              </p>
              <p>
                <FaClock /> Departure Time: {ticketData.trip_id.departure_time}
              </p>
              <p>
                <FaCalendarAlt /> Return Date:
                {new Date(ticketData.trip_id.return_date).toLocaleDateString()}
              </p>
              <p>
                <FaClock /> Return Time: {ticketData.trip_id.return_time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TicketTrainsResultsPage;
