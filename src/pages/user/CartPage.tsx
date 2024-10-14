import React from 'react';
import { useCart } from '../../context/cart/CartContext';

const CartPage: React.FC = () => {
  const { selectedSeats, removeSeat, clearSeats, totalPrice } = useCart();

  return (
    <div className="cart">
      <h2 className="text-xl font-bold">Giỏ hàng</h2>
      {selectedSeats.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul>
            {selectedSeats.map(ticket => (
              <li key={ticket._id} className="flex justify-between">
                <span>
                  {ticket.seat_id.name} - {ticket.price} VND
                </span>
                <button
                  onClick={() => removeSeat(ticket._id, ticket.seat_id._id)}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <strong>Tổng tiền: {totalPrice} VND</strong>
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

