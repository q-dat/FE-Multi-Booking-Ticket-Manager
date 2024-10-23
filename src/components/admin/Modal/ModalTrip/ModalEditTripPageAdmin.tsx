import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button, Select } from 'react-daisyui';
import { ITrip } from '../../../../types/type/trip/trip';
import { TripContext } from '../../../../context/trip/TripContext';
import LabelForm from '../../LabelForm';
import { LocationContext } from '../../../../context/location/LocationContext';
import { VehicleCatalogContext } from '../../../../context/vehicleCatalog/VehicleCatalogContext';

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
  const { locations } = useContext(LocationContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
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
      setValue('departure_time', tripData.departure_time);
      setValue('return_date', tripData.return_date);
      setValue('return_time', tripData.return_time);
      setValue('price', tripData.price);
      setValue('vehicle_catalog_id', tripData.vehicle_catalog_id);
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
          <div className="flex flex-row items-center justify-center gap-2 md:gap-5">
            <div className="flex flex-col">
              <LabelForm title={'Điểm Khởi Hành'} />
              <Select
                defaultValue=""
                className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('departure_point._id')}
              >
                <option value="" disabled>
                  Chọn Điểm Khởi Hành
                </option>
                {locations.map(location => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </Select>
              <LabelForm title={'Ngày Đi'} />
              <InputModal
                type={'date'}
                {...register('departure_date')}
                placeholder="Ngày Đi"
              />
              <LabelForm title={'Thời Gian Đi'} />
              <InputModal
                type={'text'}
                {...register('departure_time')}
                placeholder="vd: 06:00"
              />
              {/*  */}
              <LabelForm title={'Phương Tiện'} />
              <Select
                defaultValue=""
                className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('vehicle_catalog_id._id')}
              >
                <option disabled value="">
                  Chọn Phương Tiện
                </option>
                {vehicleCatalogs.map(vehicleCatalog => (
                  <option key={vehicleCatalog._id} value={vehicleCatalog._id}>
                    {vehicleCatalog.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <LabelForm title={'Điểm Đến'} />
              <Select
                defaultValue=""
                className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('destination_point._id')}
              >
                <option value="" disabled>
                  Chọn Điểm Đến
                </option>
                {locations.map(location => (
                  <option key={location._id} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </Select>
              <LabelForm title={'Ngày Về'} />
              <InputModal
                type={'date'}
                {...register('return_date')}
                placeholder="Ngày Về"
              />
              <LabelForm title={'Thời Gian Về'} />
              <InputModal
                type={'text'}
                {...register('return_time')}
                placeholder="vd: 12:00"
              />
              {/*  */}
              <LabelForm title={'Giá vé'} />
              <InputModal
                placeholder={'vd: 1000'}
                type={'number'}
                {...register('price')}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5 text-center">
            {/*  */}
            <div className="flex flex-row items-center justify-center gap-5">
              <Button onClick={onClose} className="border-gray-50 text-black">
                Huỷ bỏ
              </Button>
              <Button color="primary" type="submit" className="text-white">
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditTripPageAdmin;
