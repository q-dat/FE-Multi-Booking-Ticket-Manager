import io from 'socket.io-client';
import { ISeat } from '../types/type/seat/seat';

const socket = io(import.meta.env.VITE_API_PORT, {
  transports: ['websocket'],
  withCredentials: true
});

export const listenToNewSeats = (callback: (seat: ISeat) => void): void => {
  socket.on('get_seat', callback);
};

export const putSocketSeat = (seat: ISeat): void => {
  socket.emit('put_seat', seat);
};

export const postSocketSeat = (seat: ISeat): void => {
  socket.emit('post_seat', seat);
};

export const onSocketConnect = (callback: () => void): void => {
  socket.on('connection', callback);
};

export const onSocketDisconnect = (callback: () => void): void => {
  socket.on('disconnect', callback);
};

export const offSocketEvents = (): void => {
  socket.off('get_seat');
  socket.off('connection');
  socket.off('disconnect');
};

