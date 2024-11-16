import React, { useContext, useEffect } from 'react';
import { Button, Select } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { SeatCatalogContext } from '../../../../context/seatCatalog/SeatCatalogContext';
import LabelForm from '../../LabelForm';
import InputModal from '../../InputModal';

interface ModalCreateSeatProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatSeatMultiPageAdmin: React.FC<ModalCreateSeatProps> = ({
  isOpen,
  onClose
}) => {
  const { seatCatalogs, getAllSeatCatalogs, error } =
    useContext(SeatCatalogContext);
  const { createMultipleSeats, getAllSeats } = useContext(SeatContext);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getAllSeatCatalogs();
  }, []);
  const onSubmit = async (data: any) => {
    try {
      await createMultipleSeats(data);
      Toastify('Tạo danh sách ghế thành công!', 201);
      reset();
      getAllSeats();
      onClose();
    } catch (err) {
      Toastify(`Lỗi: ${error}`, 500);
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
            Tạo Danh Sách Chỗ Ngồi
          </p>
          <div className="flex flex-col">
            <InputModal
              placeholder="Số Lượng"
              type="number"
              {...register('quantity', { required: true, min: 1 })}
            />
            <InputModal
              placeholder="Giá"
              type="number"
              {...register('price', { required: true, min: 0 })}
            />
            <div className="flex flex-col">
              <LabelForm title="Danh mục ghế" />
              <Select
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                defaultValue=""
                {...register('seatCatalogId', { required: true })}
              >
                <option value="" disabled>
                  Chọn Danh Mục
                </option>
                {seatCatalogs.map(seatCatalog => (
                  <option key={seatCatalog._id} value={seatCatalog._id}>
                    {seatCatalog.name}
                    &emsp;
                    {seatCatalog?.vehicle_id?.name}&emsp;
                    {seatCatalog?.vehicle_id?.des}
                  </option>
                ))}
              </Select>
            </div>
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

export default ModalCreatSeatMultiPageAdmin;

