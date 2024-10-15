import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { TicketCatalogContext } from '../../../../context/ticketCatalog/TicketCatalogContext';
import { ITicketCatalog } from '../../../../types/type/ticket-catalog/ticket-catalog';
import LabelForm from '../../LabelForm';

interface ModalEditTicketCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  ticketCatalogId: string;
}

const ModalEditTicketCatalogPageAdmin: React.FC<
  ModalEditTicketCatalogProps
> = ({ isOpen, onClose, ticketCatalogId }) => {
  const {
    getAllTicketCatalogs,
    updateTicketCatalog,
    getTicketCatalogById,
    ticketCatalogs
  } = useContext(TicketCatalogContext);
  const { register, handleSubmit, reset, setValue } = useForm<ITicketCatalog>();

  useEffect(() => {
    if (ticketCatalogId) {
      getTicketCatalogById(ticketCatalogId);
    }
  }, [ticketCatalogId, getTicketCatalogById]);

  useEffect(() => {
    const ticketCatalogData = ticketCatalogs.find(
      catalog => catalog._id === ticketCatalogId
    );
    if (ticketCatalogData) {
      setValue('name', ticketCatalogData.name);
    }
  }, [ticketCatalogs, ticketCatalogId, setValue]);

  const onSubmit: SubmitHandler<ITicketCatalog> = async formData => {
    try {
      await updateTicketCatalog(ticketCatalogId, formData);
      Toastify('Chỉnh sửa danh mục vé thành công!', 200);
      reset();
      getAllTicketCatalogs();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa danh mục vé!';
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
          className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa danh mục vé
          </p>
          <div>
            <LabelForm title={'Loại Vé'} />
            <InputModal
              placeholder="Tên Loại Vé"
              type="text"
              {...register('name')}
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

export default ModalEditTicketCatalogPageAdmin;
