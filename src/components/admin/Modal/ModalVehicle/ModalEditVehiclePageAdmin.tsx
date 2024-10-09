import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IVehicle } from '../../../../types/type/vehicle/vehicle';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';

interface ModalEditVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
}

const ModalEditVehicle: React.FC<ModalEditVehicleProps> = ({
  isOpen,
  onClose,
  vehicleId
}) => {
  const { getAllVehicles, updateVehicle, getVehicleById, vehicles } = useContext(VehicleContext);
  const { register, handleSubmit, reset, setValue } = useForm<IVehicle>();

  useEffect(() => {
    if (vehicleId) {
      getVehicleById(vehicleId);
    }
  }, [vehicleId, getVehicleById]);
  
  useEffect(() => {
    const vehicleData = vehicles.find(vehicle => vehicle._id === vehicleId);
    if (vehicleData) {
      setValue('name', vehicleData.name);
      setValue('status', vehicleData.status);
    }
  }, [vehicles, vehicleId, setValue]);

  const onSubmit: SubmitHandler<IVehicle> = async formData => {
    try {
      await updateVehicle(vehicleId, formData);
      Toastify('Chỉnh sửa phương tiện thành công!', 200);
      reset();
      getAllVehicles();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa phương tiện!';
      Toastify(`Lỗi: ${errorMessage}`, 401);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
            Chỉnh sửa phương tiện
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên phương tiện
            </label>
            <InputModal
              placeholder={'ví dụ: Xe buýt A'}
              type={'text'}
              {...register('name', { required: true })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select {...register('status', { required: true })} className="w-full rounded-md border p-2">
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
              <option value="maintenance">Bảo trì</option>
            </select>
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

export default ModalEditVehicle;