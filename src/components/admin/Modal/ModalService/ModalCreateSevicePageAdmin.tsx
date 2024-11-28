import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { ServiceContext } from '../../../../context/service/ServiceContext';
import { IService } from '../../../../types/type/service/service';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';

interface ModalCreateServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateServicePageAdmin: React.FC<ModalCreateServiceProps> = ({
  isOpen,
  onClose
}) => {
  const { getAllServices, createService } = useContext(ServiceContext);
  const { register, handleSubmit, reset } = useForm<IService>();

  const onSubmit: SubmitHandler<IService> = async formData => {
    try {
      await createService(formData);
      Toastify('Tạo dịch vụ thành công!', 201);
      reset();
      onClose();
      getAllServices();
    } catch (error) {
      getAllServices();
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Dịch vụ đã tồn tại!';
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
              Tạo dịch vụ mới
            </p>
            <InputModal
              type={'text'}
              {...register('name', { required: true })}
              placeholder="Tên dịch vụ"
            />
            <InputModal
              type={'number'}
              {...register('price', { required: true })}
              placeholder="Giá dịch vụ"
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

export default ModalCreateServicePageAdmin;
