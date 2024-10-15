// src/components/admin/Modal/ModalTrip/ModalCreateTripPageAdmin.tsx
import React, { useContext, useEffect } from 'react';
import { Button, Select } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputModal from '../../InputModal';
import { ITrip } from '../../../../types/type/trip/trip';
import { isIErrorResponse } from '../../../../types/error/error';
import { Toastify } from '../../../../helper/Toastify';
import { LocationContext } from '../../../../context/location/LocationContext';
import LabelForm from '../../LabelForm';
import { TripContext } from '../../../../context/trip/TripContext';


interface ModalCreateTripProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTripPageAdmin: React.FC<ModalCreateTripProps> = ({
  isOpen,
  onClose
}) => {
  const { createTrip } = useContext(TripContext);
  const { locations, getAllLocations } = useContext(LocationContext);
  const { register, handleSubmit, reset } = useForm<ITrip>();

  useEffect(() => {
    getAllLocations();
  }, [getAllLocations]);

  const onSubmit: SubmitHandler<ITrip> = async formData => {
    try {
      await createTrip(formData);
      Toastify('Tạo chuyến đi thành công!', 201);
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo chuyến đi!';
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
          <LabelForm title={'Điểm Khởi Hành'}/>
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('departure_point', { required: true })}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </Select>

            <LabelForm title={'Điểm Đến'}/>
            <Select
              defaultValue=""
              className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              {...register('destination_point', { required: true })}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {locations.map(location => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </Select>
           
            
            <InputModal
              type={'date'}
              {...register('departure_date', { required: true })}
              placeholder="Ngày khởi hành"
            />
            <InputModal
              type={'date'}
              {...register('arrivalDate', { required: true })}
              placeholder="Ngày đến"
            />
            <InputModal
              type={'number'}
              {...register('price', { required: true })}
              placeholder="Giá"
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

export default ModalCreateTripPageAdmin;