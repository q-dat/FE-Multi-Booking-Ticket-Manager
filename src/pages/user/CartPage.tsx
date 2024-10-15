import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/cart/CartContext';

const CartPage: React.FC = () => {
  const { selectedSeats, removeSeat, clearSeats, totalPrice } = useCart();
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const newCountdowns: { [key: string]: number } = {};

    selectedSeats.forEach(ticket => {
      if (!countdowns[ticket._id]) {
        newCountdowns[ticket._id] = 6;
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
    <div className="cart">
      <h2 className="text-xl font-bold">Giỏ hàng</h2>
      {selectedSeats.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul>
            {selectedSeats.map(ticket => (
              <li
                key={ticket._id}
                className="flex items-center justify-between"
              >
                <span>
                  {ticket.seat_id.name} - {ticket.price} VND
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      const seatId = ticket.seat_id._id;
                      if (seatId) {
                        removeSeat(ticket._id, seatId);
                      }
                    }}
                    className="mr-2"
                  >
                    Xóa
                  </button>
                  <span className="text-red-500">
                    {countdowns[ticket._id]} giây
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <strong>
              Tổng tiền: {(totalPrice * 1000).toLocaleString('vi-VN')}
              &nbsp;VND
            </strong>
          </div>
          <button onClick={clearSeats} className="mt-4 bg-red-500 text-white">
            Xóa tất cả
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
