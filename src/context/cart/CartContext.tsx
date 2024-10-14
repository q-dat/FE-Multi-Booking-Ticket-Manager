import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react';
import { ITicket } from '../../types/type/ticket/ticket';
import { Toastify } from '../../helper/Toastify';
import { updateSeatApi } from '../../axios/api/seatApi';

interface CartContextType {
  selectedSeats: ITicket[];
  totalPrice: number;
  addSeat: (ticket: ITicket) => void;
  removeSeat: (ticketId: string, seatId: string) => void;
  clearSeats: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [selectedSeats, setSelectedSeats] = useState<ITicket[]>([]);
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as ITicket[];
      setSelectedSeats(parsedCart);
    }
  }, []);
  //Add To Cart
  const addSeat = useCallback(
    async (ticket: ITicket) => {
      const isSeatSelected = selectedSeats.some(
        seat => seat._id === ticket._id
      );
      if (!isSeatSelected && ticket.seat_id.status === 'Còn chỗ') {
        try {
          const updatedSeat = { ...ticket.seat_id, status: 'Hết chỗ' };
          await updateSeatApi(ticket.seat_id._id, updatedSeat);

          const updatedSelectedSeats = [...selectedSeats, ticket];
          setSelectedSeats(updatedSelectedSeats);
          sessionStorage.setItem('cart', JSON.stringify(updatedSelectedSeats));
          const storedTickets = sessionStorage.getItem('searchResults');
          if (storedTickets) {
            const parsedTickets = JSON.parse(storedTickets) as ITicket[];
            const updatedTickets = parsedTickets.map(t =>
              t._id === ticket._id
                ? { ...t, seat_id: { ...t.seat_id, status: 'Hết chỗ' } }
                : t
            );
            sessionStorage.setItem(
              'searchResults',
              JSON.stringify(updatedTickets)
            );
          }

          Toastify(`Đã thêm ghế ${ticket.seat_id.name} vào giỏ hàng!`, 200);
        } catch (error) {
          Toastify(`Lỗi: Không thể cập nhật trạng thái ghế!`, 401);
        }
      } else {
        if (isSeatSelected) {
          Toastify(`Lỗi: Ghế ${ticket.seat_id.name} đã được chọn!`, 401);
        } else {
          Toastify(`Lỗi: Ghế ${ticket.seat_id.name} không còn chỗ!`, 401);
        }
      }
    },
    [selectedSeats]
  );
  //Delete
  const removeSeat = useCallback(
    async (ticketId: string, seatId: string) => {
      const ticket = selectedSeats.find(seat => seat._id === ticketId);
      if (!ticket) return;

      try {
        const updatedSeat = { ...ticket.seat_id, status: 'Còn chỗ' };
        await updateSeatApi(seatId, updatedSeat);
        setSelectedSeats(prev => {
          const newSelectedSeats = prev.filter(seat => seat._id !== ticketId);

          sessionStorage.setItem('cart', JSON.stringify(newSelectedSeats));
          return newSelectedSeats;
        });

        const storedTickets = sessionStorage.getItem('searchResults');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets) as ITicket[];
          const updatedTickets = parsedTickets.map(t =>
            t._id === ticketId
              ? { ...t, seat_id: { ...t.seat_id, status: 'Còn chỗ' } }
              : t
          );
          sessionStorage.setItem(
            'searchResults',
            JSON.stringify(updatedTickets)
          );
        }

        Toastify(`Đã xoá ghế khỏi giỏ hàng!`, 200);
      } catch (error) {
        Toastify(`Lỗi: Không thể cập nhật trạng thái ghế khi xoá!`, 401);
      }
    },
    [selectedSeats]
  );
  //Delete All
  const clearSeats = useCallback(async () => {
    try {
      for (const ticket of selectedSeats) {
        const updatedSeat = { ...ticket.seat_id, status: 'Còn chỗ' };
        await updateSeatApi(ticket.seat_id._id, updatedSeat);
      }
      setSelectedSeats([]);
      const storedTickets = sessionStorage.getItem('searchResults');
      if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets) as ITicket[];
        const updatedTickets = parsedTickets.map(t => ({
          ...t,
          seat_id: { ...t.seat_id, status: 'Còn chỗ' }
        }));
        sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
      }

      sessionStorage.setItem('cart', JSON.stringify([]));
      console.log('Trạng thái của ghế đã được cập nhật!');
      Toastify('Đã xóa tất cả ghế khỏi giỏ hàng!', 200);
    } catch (error) {
      console.log('Lỗi: Không thể cập nhật trạng thái ghế khi xoá tất cả!');
    }
  }, [selectedSeats]);
  //
  const totalPrice = selectedSeats.reduce(
    (total, ticket) => total + ticket.price,
    0
  );

  return (
    <CartContext.Provider
      value={{ selectedSeats, totalPrice, addSeat, removeSeat, clearSeats }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

