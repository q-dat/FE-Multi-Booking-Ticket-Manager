import React, { useContext, useEffect } from 'react';
import { Button, Select } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { SeatCatalogContext } from '../../../../context/seatCatalog/SeatCatalogContext';
import LabelForm from '../../LabelForm';
import { isIErrorResponse } from '../../../../types/error/error';

interface ModalCreateSeatProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalDeleteSeatMultiPageAdmin: React.FC<ModalCreateSeatProps> = ({
  isOpen,
  onClose
}) => {
  const { seatCatalogs, getAllSeatCatalogs } = useContext(SeatCatalogContext);
  const { getAllSeats, deleteSeatsByCatalogId } = useContext(SeatContext);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getAllSeatCatalogs();
  }, []);
  const onSubmit = async (data: any) => {
    try {
      await deleteSeatsByCatalogId(data.seatCatalogId);
      Toastify('Xoá danh sách ghế thành công!', 201);
      reset();
      getAllSeats();
      onClose();
    } catch (error) {
      getAllSeats();
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Danh sách ghế này không tồn tại!';
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
          className="mx-2 flex w-[400px] flex-col gap-5 rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <p className="font-bold text-black dark:text-white">
            Xoá danh sách ghế theo danh mục
          </p>
          <div className="flex flex-col">
            <LabelForm title="Khoang/Toa" />
            <Select
              defaultValue=""
              className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('seatCatalogId', { required: true })}
            >
              <option disabled value="">
                Chọn Khoang/Toa
              </option>
              {seatCatalogs.map(seatCatalog => (
                <option key={seatCatalog._id} value={seatCatalog._id}>
                  {seatCatalog.name}
                </option>
              ))}
            </Select>
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

export default ModalDeleteSeatMultiPageAdmin;
