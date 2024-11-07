import React, { useContext } from 'react';
import { Button, Select } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { IVehicle } from '../../../../types/type/vehicle/vehicle';
import { Toastify } from '../../../../helper/Toastify';

interface ModalCreateVehicleProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateVehiclePageAdmin: React.FC<ModalCreateVehicleProps> = ({
  isOpen,
  onClose
}) => {
  const { getAllVehicles, createVehicle, error } = useContext(VehicleContext);
  const { register, handleSubmit, reset } = useForm<IVehicle>();

  const onSubmit: SubmitHandler<IVehicle> = async formData => {
    try {
      await createVehicle(formData);
      Toastify('Tạo phương tiện thành công!', 201);
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
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('status', { required: true })}
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

export default ModalCreateVehiclePageAdmin;
