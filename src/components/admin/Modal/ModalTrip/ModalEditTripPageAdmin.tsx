import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import { ITrip } from '../../../../types/type/trip/trip';
import { TripContext } from '../../../../context/trip/TripContext';

interface ModalEditTripProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

const ModalEditTripPageAdmin: React.FC<ModalEditTripProps> = ({
  isOpen,
  onClose,
  tripId
}) => {
  const { getAllTrips, updateTrip, getTripById, trips } =
    useContext(TripContext);

  const { register, handleSubmit, reset, setValue } = useForm<ITrip>();

  useEffect(() => {
    if (tripId) {
      getTripById(tripId);
    }
  }, [tripId, getTripById]);

  useEffect(() => {
    const tripData = trips.find(trip => trip._id === tripId);
    if (tripData) {
      setValue('departure_point', tripData.departure_point);
      setValue('destination_point', tripData.destination_point);
      setValue('departure_date', tripData.departure_date);
      setValue('arrivalDate', tripData.arrivalDate);
      setValue('price', tripData.price);
    }
  }, [trips, tripId, setValue]);

  const onSubmit: SubmitHandler<ITrip> = async formData => {
    try {
      await updateTrip(tripId, formData);
      Toastify('Chỉnh sửa chuyến đi thành công!', 200);
      reset();
      getAllTrips();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa chuyến đi!';
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
            Chỉnh sửa chuyến đi
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Điểm khởi hành
            </label>
            <InputModal
              placeholder="Điểm khởi hành"
              type="text"
              {...register('departure_point')}
            />
            <label className="block text-sm font-medium text-gray-700">
              Điểm đến
            </label>
            <InputModal
              placeholder="Điểm đến"
              type="text"
              {...register('destination_point')}
            />
            <label className="block text-sm font-medium text-gray-700">
              Ngày khởi hành
            </label>
            <InputModal
              placeholder={''}
              type="date"
              {...register('departure_date')}
            />
            <label className="block text-sm font-medium text-gray-700">
              Ngày đến
            </label>
            <InputModal
              placeholder={''}
              type="date"
              {...register('arrivalDate')}
            />
            <label className="block text-sm font-medium text-gray-700">
              Giá
            </label>
            <InputModal
              type="number"
              {...register('price')}
              placeholder="Giá"
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

export default ModalEditTripPageAdmin;
