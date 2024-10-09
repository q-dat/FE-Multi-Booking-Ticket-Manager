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

const TicketTrainsResultsPage: React.FC = () => {
  // Translation
  const { t } = useTranslation();
  const ticketContext = useContext(TicketContext);

  if (!ticketContext) {
    return (
      <p className="text-center text-red-500">
        Error: Ticket context is not available
      </p>
    );
  }

  const { tickets, loading, error } = ticketContext;

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (tickets.length === 0) {
    return <p className="text-center text-gray-500">No tickets found</p>;
  }

  return (
    <div className="pb-[20px] xl:pt-[80px]">
      <HeaderResponsive Title_NavbarMobile={t('UserPage.Navbar.Trains')} />
      <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map(ticketData => (
  <div
    key={ticketData._id}
    className="transform rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
  >
    <div className="mb-4 flex items-center">
      <FaTicketAlt className="mr-3 text-3xl text-blue-600" />
      <h4 className="text-xl font-bold text-blue-700">
        Ticket ID: {ticketData._id}
      </h4>
    </div>
    <div className="mb-4 border-b pb-4">
      <p className="text-lg text-gray-800">
        <span className="font-semibold">Ticket Catalog:</span> {ticketData.ticket_catalog_id.name}
      </p>
      <p className="text-lg text-gray-800">
        <span className="font-semibold">Seat:</span> {ticketData.seat_id.name} 
        <span className="font-semibold"> (Price: {ticketData.seat_id.price})</span>
        <span className="font-semibold"> (Status: {ticketData.seat_id.status.trim()})</span>
        <span className="font-semibold"> (Ordinal Number: {ticketData.seat_id.ordinal_numbers})</span>
      </p>
    </div>
    <div className="mb-2 flex items-center text-gray-800">
      <FaMapMarkerAlt className="mr-1 text-blue-600" />
      <span><span className="font-semibold">Departure:</span> {ticketData.trip_id.departure_point.name}</span>
    </div>
    <div className="mb-2 flex items-center text-gray-800">
      <FaMapMarkerAlt className="mr-1 text-blue-600" />
      <span><span className="font-semibold">Destination:</span> {ticketData.trip_id.destination_point.name}</span>
    </div>
    <p className="mb-2 flex items-center text-lg font-bold text-green-600">
      <FaMoneyBillWave className="mr-1 inline text-green-600" />
      <span className="font-semibold">Total Price:</span> {ticketData.price}
    </p>
    <div className="mb-2 flex justify-between text-gray-800">
      <p className="flex items-center">
        <FaCalendarAlt className="mr-1 text-blue-600" />
        <span><span className="font-semibold">Departure Date:</span> {new Date(ticketData.trip_id.departure_date).toLocaleDateString()}</span>
      </p>
      <p className="flex items-center">
        <FaClock className="mr-1 text-blue-600" />
        <span><span className="font-semibold">Departure Time:</span> {ticketData.trip_id.departure_time}</span>
      </p>
    </div>
    <div className="flex justify-between text-gray-800">
      <p className="flex items-center">
        <FaCalendarAlt className="mr-1 text-blue-600" />
        <span><span className="font-semibold">Return Date:</span> {new Date(ticketData.trip_id.return_date).toLocaleDateString()}</span>
      </p>
      <p className="flex items-center">
        <FaClock className="mr-1 text-blue-600" />
        <span><span className="font-semibold">Return Time:</span> {ticketData.trip_id.return_time}</span>
      </p>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default TicketTrainsResultsPage;

