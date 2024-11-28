import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Toastify } from '../../../../helper/Toastify';
import { Button, Select } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { ITrip } from '../../../../types/type/trip/trip';
import { LocationContext } from '../../../../context/location/LocationContext';
import { TripContext } from '../../../../context/trip/TripContext';
import InputModal from '../../InputModal';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { isIErrorResponse } from '../../../../types/error/error';

interface ModalCreateTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTripPageAdmin: React.FC<ModalCreateTicketProps> = ({
  isOpen,
  onClose
}) => {
  const { createTrip, getAllTrips } = useContext(TripContext);
  const { locations } = useContext(LocationContext);
  const { vehicles } = useContext(VehicleContext);
  const { register, handleSubmit, reset } = useForm<ITrip>();

  const onSubmit: SubmitHandler<ITrip> = async formData => {
    try {
      await createTrip(formData);
      Toastify('Tạo chuyến đi thành công!', 201);
      reset();
      getAllTrips();
      onClose();
    } catch (error) {
      getAllTrips();
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Tạo chuyến đi thất bại!';
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
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40 px-2"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="flex flex-col gap-5 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Tạo Chuyến Đi
          </p>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-5">
              <div className="flex flex-col">
                <LabelForm title={'Điểm Khởi Hành'} />
                <Select
                  defaultValue=""
                  className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  {...register('departure_point', { required: true })}
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
                  {...register('departure_date', { required: true })}
                  placeholder="Ngày Đi"
                />
                <LabelForm title={'Thời Gian Đi'} />
                <InputModal
                  type={'text'}
                  {...register('departure_time', { required: true })}
                  placeholder="vd: 06:00"
                />
                {/*  */}
                <LabelForm title={'Phương Tiện'} />
                <Select
                  defaultValue=""
                  className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  {...register('vehicle_id._id', { required: true })}
                >
                  <option disabled value="">
                    Chọn Phương Tiện
                  </option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col">
                <LabelForm title={'Điểm Đến'} />
                <Select
                  defaultValue=""
                  className="mb-5 w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                  {...register('destination_point', { required: true })}
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
                  {...register('return_date', { required: true })}
                  placeholder="Ngày Về"
                />
                <LabelForm title={'Thời Gian Về'} />
                <InputModal
                  type={'text'}
                  {...register('return_time', { required: true })}
                  placeholder="vd: 12:00"
                />
                {/*  */}
                <LabelForm title={'Giá vé'} />
                <InputModal
                  placeholder={'vd: 1000'}
                  type={'number'}
                  {...register('price', { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <LabelForm title={'Mô Tả'} />
              <InputModal
                placeholder={'Không bắt buộc!'}
                type={'text'}
                {...register('des')}
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

export default ModalCreateTripPageAdmin;
