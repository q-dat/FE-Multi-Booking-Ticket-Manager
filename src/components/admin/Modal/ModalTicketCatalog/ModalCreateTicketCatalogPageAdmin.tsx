import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { TicketCatalogContext } from '../../../../context/ticketCatalog/TicketCatalogContext';
import { isIErrorResponse } from '../../../../types/error/error';
import { Toastify } from '../../../../helper/Toastify';
import { ITicketCatalog } from '../../../../types/type/ticket-catalog/ticket-catalog';

interface ModalCreateTicketCatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTicketCatalogPageAdmin: React.FC<
  ModalCreateTicketCatalogProps
> = ({ isOpen, onClose }) => {
  const { createTicketCatalog } = useContext(TicketCatalogContext);
  const { register, handleSubmit, reset } = useForm<ITicketCatalog>();

  const onSubmit: SubmitHandler<ITicketCatalog> = async formData => {
    try {
      await createTicketCatalog(formData);
      Toastify('Tạo danh mục vé thành công!', 201);
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo danh mục vé!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
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
          className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo danh mục vé mới
            </p>
            <InputModal
              type="text"
              {...register('name', { required: true })}
              placeholder="Tên loại vé"
            />
          </div>

          <div className="space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
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

export default ModalCreateTicketCatalogPageAdmin;
