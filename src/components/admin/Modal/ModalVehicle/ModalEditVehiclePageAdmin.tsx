import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IVehicle } from '../../../../types/type/vehicle/vehicle';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button, Select } from 'react-daisyui';

interface ModalEditVehicleProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
}

const ModalEditVehiclePageAdmin: React.FC<ModalEditVehicleProps> = ({
  isOpen,
  onClose,
  vehicleId
}) => {
  const { getAllVehicles, updateVehicle, getVehicleById, vehicles, error } =
    useContext(VehicleContext);
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
      setValue('des', vehicleData.des);
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
          className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="text-xl font-bold text-black dark:text-white">
              Chỉnh sửa phương tiện
            </p>
            <InputModal
              type={'text'}
              {...register('name')}
              placeholder="Tên phương tiện"
            />
            <InputModal placeholder="Mô tả" type="text" {...register('des')} />
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('status')}
            >
              <option value="" disabled>
                Chọn trạng thái
              </option>
              <option value="Đang hoạt động">Đang hoạt động</option>
              <option value="Không hoạt động">Không hoạt động</option>
              <option value="Đang bảo trì">Đang bảo trì</option>
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

export default ModalEditVehiclePageAdmin;
