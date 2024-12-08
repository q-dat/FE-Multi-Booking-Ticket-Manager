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
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as ITicket[];
      setSelectedSeats(parsedCart);
    }
  }, [setSelectedSeats]);
  //Add
  const addSeat = useCallback(
    (ticket: ITicket) => {
      if (selectedSeats.length >= 10) {
        Toastify('Bạn chỉ được chọn tối đa 10 ghế!', 401);
        return;
      }
      const isSeatSelected = selectedSeats.some(
        seat => seat._id === ticket._id
      );
      if (ticket.seat_id[0]?.status === 'Đang chọn') {
        Toastify(`Ghế ${ticket.seat_id[0]?.name} đang chọn!`, 401);
        return;
      }

      if (!isSeatSelected && ticket.seat_id[0]?.status === 'Còn chỗ') {
        const updatedSelectedSeats = [...selectedSeats, ticket];
        setSelectedSeats(updatedSelectedSeats);
        localStorage.setItem('cart', JSON.stringify(updatedSelectedSeats));
        //
        const updatedSeat = { ...ticket.seat_id[0], status: 'Hết chỗ' };
        updateSeatApi(ticket.seat_id[0]._id, updatedSeat);
        //
        const storedTickets = localStorage.getItem('searchResults');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets) as ITicket[];
          const updatedTickets = parsedTickets.map(t =>
            t._id === ticket._id
              ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Đang chọn' }] }
              : t
          );
          localStorage.setItem('searchResults', JSON.stringify(updatedTickets));
        }

        Toastify(`Đã thêm ${ticket.seat_id[0]?.name} vào giỏ vé!`, 200);
      } else {
        Toastify(`Lỗi: ${ticket.seat_id[0]?.name} đã hết chỗ!`, 401);
      }
    },
    [selectedSeats]
  );
  //removeSeat
  const removeSeat = useCallback(
    (ticketId: string) => {
      //
      const seatToUpdate = selectedSeats.find(seat => seat._id === ticketId);
      if (seatToUpdate && seatToUpdate.seat_id[0]) {
        updateSeatApi(seatToUpdate.seat_id[0]._id, {
          ...seatToUpdate.seat_id[0],
          status: 'Còn chỗ'
        });
      }
      //
      setSelectedSeats(prev => {
        const newSelectedSeats = prev.filter(seat => seat._id !== ticketId);
        localStorage.setItem('cart', JSON.stringify(newSelectedSeats));
        return newSelectedSeats;
      });

      const storedTickets = localStorage.getItem('searchResults');
      if (storedTickets) {
        const parsedTickets = JSON.parse(storedTickets) as ITicket[];
        const updatedTickets = parsedTickets.map(t =>
          t._id === ticketId
            ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Còn chỗ' }] }
            : t
        );
        localStorage.setItem('searchResults', JSON.stringify(updatedTickets));
      }
      console.log('Đã xoá ghế khỏi giỏ vé!');
    },
    [selectedSeats]
  );
  //clearSeats
  const clearSeats = useCallback(() => {
    // Cập nhật tất cả ghế đã chọn về trạng thái "Còn chỗ"
    for (const seat of selectedSeats) {
      if (seat.seat_id[0]) {
        updateSeatApi(seat.seat_id[0]._id, {
          ...seat.seat_id[0],
          status: 'Còn chỗ'
        });
      }
    }

    //
    const storedTickets = localStorage.getItem('searchResults');
    if (storedTickets) {
      const parsedTickets = JSON.parse(storedTickets) as ITicket[];
      const updatedTickets = parsedTickets.map(t =>
        selectedSeats.some(seat => seat._id === t._id)
          ? { ...t, seat_id: [{ ...t.seat_id[0], status: 'Còn chỗ' }] }
          : t
      );
      localStorage.setItem('searchResults', JSON.stringify(updatedTickets));
    }
    setSelectedSeats([]);
    localStorage.setItem('cart', JSON.stringify([]));
    Toastify('Đã xóa tất cả ghế khỏi giỏ vé!', 200);
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
    throw new Error(
      'Các component sử dụng hook useCart đều phải được bọc trong CartProvider!'
    );
  }
  return context;
};
