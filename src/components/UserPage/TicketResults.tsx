import React, { useContext } from 'react';
import { TicketContext } from '../../context/ticket/TicketContext';

const TicketResults: React.FC = () => {
  const ticketContext = useContext(TicketContext);

  if (!ticketContext) {
    return <p>Error: Ticket context is not available</p>;
  }

  const { tickets, loading, error } = ticketContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (tickets.length === 0) {
    return <p>No tickets found</p>;
  }

  return (
    <div>
      {tickets.map((ticketData) => (
        <div key={ticketData._id}>
          <h4>Ticket ID: {ticketData._id}</h4>
          <p>Ticket Catalog: {ticketData.ticket_catalog_id?.name}</p>
          <p>Seat: {ticketData.seat_id?.name} (Price: {ticketData.seat_id?.price})</p>
          <p>Departure: {ticketData.trip_id?.departure_point?.name}</p>
          <p>Destination: {ticketData.trip_id?.destination_point?.name}</p>
          <p>Total Price: {ticketData.price}</p>
          <p>Departure Date: {new Date(ticketData.trip_id?.departure_date).toLocaleDateString()}</p>
          <p>Arrival Date: {new Date(ticketData.trip_id?.arrival_date).toLocaleDateString()}</p>
          <p>Departure Time: {ticketData.trip_id?.departure_time}</p>
          <p>Arrival Time: {ticketData.trip_id?.arrival_time}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketResults;
