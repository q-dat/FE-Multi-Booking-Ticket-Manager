import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button, Select } from 'react-daisyui';
import { SeatCatalogContext } from '../../../../context/seatCatalog/SeatCatalogContext';
import { ISeatCatalog } from '../../../../types/type/seat-catalog/seat-catalog';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import LabelForm from '../../LabelForm';

interface ModalEditSeatCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  seatCatalogId: string;
}

const ModalEditSeatCatalogPageAdmin: React.FC<ModalEditSeatCatalogProps> = ({
  isOpen,
  onClose,
  seatCatalogId
}) => {
  const {
    getAllSeatCatalogs,
    updateSeatCatalog,
    getSeatCatalogById,
    seatCatalogs
  } = useContext(SeatCatalogContext);
  const { register, handleSubmit, reset, setValue } = useForm<ISeatCatalog>();
  const { vehicles } = useContext(VehicleContext);
  useEffect(() => {
    if (seatCatalogId) {
      getSeatCatalogById(seatCatalogId);
    }
  }, [seatCatalogId, getSeatCatalogById]);

  useEffect(() => {
    const seatCatalogData = seatCatalogs.find(
      catalog => catalog._id === seatCatalogId
    );
    if (seatCatalogData) {
      setValue('name', seatCatalogData.name);
    }
  }, [seatCatalogs, seatCatalogId, setValue]);

  const onSubmit: SubmitHandler<ISeatCatalog> = async formData => {
    try {
      await updateSeatCatalog(seatCatalogId, formData);
      Toastify('Chỉnh sửa danh mục ghế thành công!', 200);
      reset();
      getAllSeatCatalogs();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa danh mục ghế!';
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
            Chỉnh sửa danh mục ghế
          </p>
          <div>
            <LabelForm title={'Khoang(Toa)'} />
            <InputModal
              placeholder="Tên Khoang(Toa)"
              type="text"
              {...register('name')}
            />
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('vehicle_id._id')}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {vehicles.map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name}
                </option>
              ))}
            </Select>
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

export default ModalEditSeatCatalogPageAdmin;
