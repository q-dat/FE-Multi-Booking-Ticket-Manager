import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IService } from '../../../../types/type/service/service';
import { ServiceContext } from '../../../../context/service/ServiceContext';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { isIErrorResponse } from '../../../../types/error/error';

interface ModalEditServiceProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
}
const ModalEditServicePageAdmin: React.FC<ModalEditServiceProps> = ({
  isOpen,
  onClose,
  serviceId
}) => {
  const { getAllServices, updateService, getServiceById, services } =
    useContext(ServiceContext);
  const { register, handleSubmit, reset, setValue } = useForm<IService>();

  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId);
    }
  }, [serviceId, getServiceById]);

  useEffect(() => {
    const serviceData = services.find(service => service._id === serviceId);
    if (serviceData) {
      setValue('name', serviceData.name);
      setValue('price', serviceData.price);
    }
  }, [services, serviceId, setValue]);

  const onSubmit: SubmitHandler<IService> = async formData => {
    try {
      await updateService(serviceId, formData);
      Toastify('Chỉnh sửa dịch vụ thành công!', 200);
      reset();
      getAllServices();
      onClose();
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
          className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa dịch vụ
          </p>
          <div>
            <LabelForm title={'Dịch Vụ'} />
            <InputModal
              placeholder={'Tên Dịch Vụ'}
              type={'text'}
              {...register('name')}
            />
            <LabelForm title={'Giá'} />
            <InputModal
              placeholder={'vd: 1000'}
              type={'number'}
              {...register('price')}
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

export default ModalEditServicePageAdmin;
