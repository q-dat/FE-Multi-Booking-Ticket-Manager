import React, { useContext } from 'react';
import { TicketContext } from '../../context/ticket/TicketContext';
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

const TicketTrainsResultsPage: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  const ticketContext = useContext(TicketContext);

  if (!ticketContext) {
    console.log('TicketTrainsResultsPage phải được sử dụng trong TicketProvider');
  }

  const { tickets, loading, error } = ticketContext;

  if (loading) {
    return  <LoadingLocal />;
  }

  if (error) {
    return <ErrorLoading />;
  }

  if (tickets.length === 0) {
    Toastify('Không tìm thấy vé! ',404)
    return
  }

  return (
    <div>
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Trains')} />
      <ul>
        {tickets.map(ticketData => (
          <li key={ticketData._id}>
            <h4>
              <FaTicketAlt /> Ticket ID: {ticketData._id}
            </h4>
            <p>
              <strong>Ticket Catalog:</strong> {ticketData.ticket_catalog_id.name}
            </p>
            <p>
              <strong>Seat:</strong> {ticketData.seat_id.name} 
              <strong> (Price: {ticketData.seat_id.price})</strong>
              <strong> (Status: {ticketData.seat_id.status.trim()})</strong>
              <strong> (Ordinal Number: {ticketData.seat_id.ordinal_numbers})</strong>
            </p>
            <p>
              <FaMapMarkerAlt /> <strong>Departure:</strong> {ticketData.trip_id.departure_point.name}
            </p>
            <p>
              <FaMapMarkerAlt /> <strong>Destination:</strong> {ticketData.trip_id.destination_point.name}
            </p>
            <p>
              <FaMoneyBillWave /> <strong>Total Price:</strong> {ticketData.price}
            </p>
            <p>
              <FaCalendarAlt /> <strong>Departure Date:</strong> {new Date(ticketData.trip_id.departure_date).toLocaleDateString()}
            </p>
            <p>
              <FaClock /> <strong>Departure Time:</strong> {ticketData.trip_id.departure_time}
            </p>
            <p>
              <FaCalendarAlt /> <strong>Return Date:</strong> {new Date(ticketData.trip_id.return_date).toLocaleDateString()}
            </p>
            <p>
              <FaClock /> <strong>Return Time:</strong> {ticketData.trip_id.return_time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketTrainsResultsPage;
