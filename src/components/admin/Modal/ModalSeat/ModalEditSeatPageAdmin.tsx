import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button, Select } from 'react-daisyui';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { ISeat } from '../../../../types/type/seat/seat';

interface ModalEditSeatProps {
  isOpen: boolean;
  onClose: () => void;
  seatId: string;
}
const ModalEditSeatPageAdmin: React.FC<ModalEditSeatProps> = ({
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
      setValue('price', seatData.price);
      setValue('des', seatData.des);
      setValue('status', seatData.status);
      setValue('ordinal_numbers', seatData.ordinal_numbers);
    }
  }, [seats, seatId, setValue]);

  const onSubmit: SubmitHandler<ISeat> = async formData => {
    try {
      await updateSeat(seatId, formData);
      Toastify('Chỉnh sửa Ghế thành công!', 200);
      reset();
      getAllSeats();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa ghế!';
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
        <div className='space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800 '>
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa Ghế
          </p>
          <div
            onClick={e => e.stopPropagation()}
            className="grid grid-cols-2 "
          >
            <div className='mr-3'>

              <label className="block text-sm font-medium text-gray-700">
                Tên Ghế
              </label>
              <InputModal
                placeholder={'ví dụ: địa điểm A'}
                type={'text'}
                {...register('name', { required: true })}
              />
              <label className="block text-sm font-medium text-gray-700">
                Giá
              </label>
              <InputModal
                placeholder={'ví dụ: địa điểm A'}
                type={'text'}
                {...register('price', { required: true })}
              />
              <label className="block text-sm font-medium text-gray-700">
                Số Ghế
              </label>
              <InputModal
                placeholder={'ví dụ: địa điểm A'}
                type={'text'}
                {...register('ordinal_numbers', { required: true })}
              />
            </div>
            <div className='ml-3'>
              <label className="block text-sm font-medium text-gray-700">
                Mô Tả
              </label>
              <InputModal
                placeholder={'ví dụ: địa điểm A'}
                type={'text'}
                {...register('des')}
              />
              <label className="block text-sm font-medium text-gray-700">
                Trạng Thái
              </label>
              <Select
                defaultValue=""
                className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('status')}
              >
                <option value="" disabled>
                  Chọn Trạng Thái
                </option>
                <option value="Còn chỗ">Còn Chỗ</option>
                <option value="Hết chỗ">Hết Chỗ</option>
              </Select>
            </div>
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

export default ModalEditSeatPageAdmin;
