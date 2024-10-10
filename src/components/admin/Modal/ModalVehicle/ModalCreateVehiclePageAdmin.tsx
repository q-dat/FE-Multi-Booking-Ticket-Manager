import React from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { IVehicle } from '../../../../types/type/vehicle/vehicle';
import { isIErrorResponse } from '../../../../types/error/error';
import { Toastify } from '../../../../helper/Toastify';

interface ModalCreateVehicleProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateVehicle: React.FC<ModalCreateVehicleProps> = ({
  isOpen,
  onClose
}) => {
  const { createVehicle } = React.useContext(VehicleContext);
  const { register, handleSubmit, reset } = useForm<IVehicle>();

  const onSubmit: SubmitHandler<IVehicle> = async formData => {
    try {
      await createVehicle(formData);
      Toastify('Tạo phương tiện thành công!', 201);
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo phương tiện!';
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
          className="mx-2 flex w-[400px] flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo phương tiện mới
            </p>
            <InputModal
              type={'text'}
              {...register('name', { required: true })}
              placeholder="Tên phương tiện"
            />
            <select
              {...register('status', { required: true })}
              className="mt-2 w-full rounded-md border p-2"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="maintenance">Bảo trì</option>
            </select>
          </div>

          <div className="mt-4 space-x-5 text-center">
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

export default ModalCreateVehicle;
