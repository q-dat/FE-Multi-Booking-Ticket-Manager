import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITicket } from '../../../../types/type/ticket/ticket';
import { TicketContext } from '../../../../context/ticket/TicketContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';

interface ModalCreateTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTicketPageAdmin: React.FC<ModalCreateTicketProps> = ({
  isOpen,
  onClose
}) => {
  const { createTicket } = useContext(TicketContext);
  const { register, handleSubmit, reset } = useForm<ITicket>();

  const onSubmit: SubmitHandler<ITicket> = async formData => {
    try {
      await createTicket(formData);
      Toastify('Tạo vé thành công!', 201);
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo vé!';
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
            Tạo vé mới
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã Danh Mục Vé
            </label>
            <InputModal
              placeholder={'ví dụ: Mã vé ABC'}
              type={'text'}
              {...register('ticket_catalog_id')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã Danh Mục Xe
            </label>
            <InputModal
              placeholder={'ví dụ: Mã xe XYZ'}
              type={'text'}
              {...register('vehicle_catalog_id')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã Ghế
            </label>
            <InputModal
              placeholder={'ví dụ: Ghế 1A'}
              type={'text'}
              {...register('seat_id')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mã Chuyến Đi
            </label>
            <InputModal
              placeholder={'ví dụ: Chuyến đi 123'}
              type={'text'}
              {...register('trip_id')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giá vé
            </label>
            <InputModal
              placeholder={'ví dụ: 500'}
              type={'number'}
              {...register('price')}
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

export default ModalCreateTicketPageAdmin;
