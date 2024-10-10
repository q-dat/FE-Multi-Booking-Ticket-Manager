import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { ISeat } from '../../../../types/type/seat/seat';

interface ModalEditSeatProps {
  isOpen: boolean;
  onClose: () => void;
  seatId: string;
}
const ModalEditSeat: React.FC<ModalEditSeatProps> = ({
  isOpen,
  onClose,
  seatId
}) => {
  const { getAllSeats, updateSeat, getSeatById, seats } =
    useContext(SeatContext);
  const { register, handleSubmit, reset, setValue } = useForm<ISeat>();

  useEffect(() => {
    if (seatId) {
      getSeatById(seatId);
    }
  }, [seatId, getSeatById]);

  useEffect(() => {
    const seatData = seats.find(seat => seat._id === seatId);
    if (seatData) {
      setValue('name', seatData.name);
    }
  }, [seats, seatId, setValue]);

  const onSubmit: SubmitHandler<ISeat> = async formData => {
    try {
      await updateSeat(seatId, formData);
      Toastify('Chỉnh sửa địa điểm thành công!', 200);
      reset();
      getAllSeats();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa địa điểm!';
      Toastify(`Lỗi: ${errorMessage}`, 401);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa địa điểm
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên địa điểm
            </label>
            <InputModal
              placeholder={'ví dụ: địa điểm A'}
              type={'text'}
              {...register('name', { required: true })}
            />
          </div>
          <div className="mt-4 space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Huỷ bỏ
            </Button>
            <Button color="primary" type="submit" className="text-white">
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditSeat;
