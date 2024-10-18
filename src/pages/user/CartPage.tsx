import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/cart/CartContext';
import { MdDelete } from 'react-icons/md';
import { Button } from 'react-daisyui';

const CartPage: React.FC = () => {
  const { selectedSeats, removeSeat, clearSeats, totalPrice } = useCart();
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const newCountdowns: { [key: string]: number } = {};

    selectedSeats.forEach(ticket => {
      if (!countdowns[ticket._id]) {
        newCountdowns[ticket._id] = 600;
      } else {
        newCountdowns[ticket._id] = countdowns[ticket._id];
      }
    }, []);

    setCountdowns(newCountdowns);

    const intervalId = setInterval(() => {
      setCountdowns(prevCountdowns => {
        const updatedCountdowns = { ...prevCountdowns };
        let allRemoved = true;
        Object.keys(updatedCountdowns).forEach(ticketId => {
          if (updatedCountdowns[ticketId] > 1) {
            updatedCountdowns[ticketId] -= 1;
            allRemoved = false;
          } else {
            const seatId = selectedSeats.find(ticket => ticket._id === ticketId)
              ?.seat_id._id;
            if (seatId) {
              removeSeat(ticketId, seatId);
            }
            delete updatedCountdowns[ticketId];
          }
        });
        if (allRemoved) clearInterval(intervalId);
        return updatedCountdowns;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [selectedSeats, removeSeat]);

  return (
    <div className="mb-5 w-full rounded-md bg-white p-2 text-black dark:bg-black dark:text-white border shadow-headerMenu shadow-primary dark:shadow-white">
      {selectedSeats.length === 0 ? (
        <>{/* <p>Giỏ vé của bạn đang trống!</p> */}</>
      ) : (
        <div className="flex flex-col gap-2">
          <div>
            {selectedSeats.map(ticket => (
              <div
                key={ticket._id}
                className="flex items-center justify-between border border-b border-l-0 border-r-0 border-t-0 py-2 text-xs"
              >
                <div className="flex flex-col items-start justify-start">
                  <p>
                    {ticket.trip_id.departure_point.name}-
                    {ticket.trip_id.destination_point.name}{' '}
                  </p>
                  <p>
                    {new Date(ticket.trip_id.departure_date).toLocaleDateString(
                      'vi-VN'
                    )}
                  </p>
                  <p>{ticket.trip_id.departure_time}</p>
                  <p>{ticket.seat_id.seat_catalog_id.vehicle_id.name}</p>
                  <p>{ticket.seat_id.seat_catalog_id.name}</p>
                  <p>{ticket.seat_id.name}</p>
                  <p>
                    {(ticket.price * 1000).toLocaleString('vi-VN')}
                    &nbsp;VND
                  </p>
                </div>

                <div className="flex flex-row items-center">
                  <p
                    onClick={() => {
                      const seatId = ticket.seat_id._id;
                      if (seatId) {
                        removeSeat(ticket._id, seatId);
                      }
                    }}
                    className="text-2xl text-red-500"
                  >
                    <MdDelete />
                  </p>
                  <span className="text-red-500">
                    {countdowns[ticket._id]} giây
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-end text-xs font-bold">
              Tổng tiền: {(totalPrice * 1000).toLocaleString('vi-VN')}
              &nbsp;VND
            </div>
            <Button
              size="sm"
              onClick={clearSeats}
              className="bg-red-500 text-xs text-white"
            >
              Xóa tất cả
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
