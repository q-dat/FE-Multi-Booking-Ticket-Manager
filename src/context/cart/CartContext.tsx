import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react';
import { ITicket } from '../../types/type/ticket/ticket';
import { Toastify } from '../../helper/Toastify';

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
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as ITicket[];
      setSelectedSeats(parsedCart);
    }
  }, []);
  //Add
  const addSeat = useCallback(
    (ticket: ITicket) => {
      const isSeatSelected = selectedSeats.some(
        seat => seat._id === ticket._id
      );
      if (!isSeatSelected && ticket.seat_id[0]?.status === 'Còn chỗ') {
        const updatedSelectedSeats = [...selectedSeats, ticket];
        setSelectedSeats(updatedSelectedSeats);
        localStorage.setItem('cart', JSON.stringify(updatedSelectedSeats));

        const storedTickets = sessionStorage.getItem('searchResults');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets) as ITicket[];
          const updatedTickets = parsedTickets.map(t =>
            t._id === ticket._id
              ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Đang chọn' }] }
              : t
          );
          sessionStorage.setItem(
            'searchResults',
            JSON.stringify(updatedTickets)
          );
        }

        Toastify(`Đã thêm ghế ${ticket.seat_id[0]?.name} vào giỏ hàng!`, 200);
      } else {
        Toastify(`Lỗi: Ghế ${ticket.seat_id[0]?.name} không còn chỗ!`, 401);
      }
    },
    [selectedSeats]
  );
  //removeSeat
  const removeSeat = useCallback(
    (ticketId: string) => {
      setSelectedSeats(prev => {
        const newSelectedSeats = prev.filter(seat => seat._id !== ticketId);
        localStorage.setItem('cart', JSON.stringify(newSelectedSeats));
        return newSelectedSeats;
      });

      const storedTickets = sessionStorage.getItem('searchResults');
      if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets) as ITicket[];
        const updatedTickets = parsedTickets.map(t =>
          t._id === ticketId
            ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Còn chỗ' }] }
            : t
        );
        sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
      }
      console.log('Đã xoá ghế khỏi giỏ hàng!');
    },
    [selectedSeats]
  );
  //clearSeats
  const clearSeats = useCallback(() => {
    const storedTickets = sessionStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      const updatedTickets = parsedTickets.map(t =>
        selectedSeats.some(seat => seat._id === t._id)
          ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Còn chỗ' }] }
          : t
      );
      sessionStorage.setItem('searchResults', JSON.stringify(updatedTickets));
    }
    setSelectedSeats([]);
    localStorage.setItem('cart', JSON.stringify([]));
    Toastify('Đã xóa tất cả ghế khỏi giỏ hàng!', 200);
  }, [selectedSeats]);

  // Total price
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
    throw new Error('Các component sử dụng hook useCart đều phải được bọc trong CartProvider!');
  }
  return context;
};
