import React from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { LocationContext } from '../../../../context/location/LocationContext';
import { ILocation } from '../../../../types/type/location/location';
import { isIErrorResponse } from '../../../../types/error/error';
import { Toastify } from '../../../../helper/Toastify';

interface ModalCreateLocationProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateLocation: React.FC<ModalCreateLocationProps> = ({
  isOpen,
  onClose
}) => {
  const { createLocation } = React.useContext(LocationContext); 
  const { register, handleSubmit, reset } = useForm<ILocation>();

  const onSubmit: SubmitHandler<ILocation> = async formData => {
    try {
      await createLocation(formData); 
      Toastify('Tạo địa điểm thành công!', 201); 
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo địa điểm!';
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
              Tạo địa điểm mới
            </p>
            <InputModal
              type={'text'}
              {...register('name', { required: true })}
              placeholder="Tên địa điểm"
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

export default ModalCreateLocation;
