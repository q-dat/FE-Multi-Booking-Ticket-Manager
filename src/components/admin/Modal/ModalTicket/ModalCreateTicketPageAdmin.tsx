import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITicket } from '../../../../types/type/ticket/ticket';
import { TicketContext } from '../../../../context/ticket/TicketContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import { Button, Select } from 'react-daisyui';
import { TicketCatalogContext } from '../../../../context/ticketCatalog/TicketCatalogContext';
import LabelForm from '../../LabelForm';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { VehicleCatalogContext } from '../../../../context/vehicleCatalog/VehicleCatalogContext';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { SeatCatalogContext } from '../../../../context/seatCatalog/SeatCatalogContext';
import InputModal from '../../InputModal';

interface ModalCreateTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTicketPageAdmin: React.FC<ModalCreateTicketProps> = ({
  isOpen,
  onClose
}) => {
  const { createTicket } = useContext(TicketContext);
  const { register, handleSubmit, reset } = useForm<ITicket>();
  //
  const { ticketCatalogs } = useContext(TicketCatalogContext);
  const { vehicles } = useContext(VehicleContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
  const { seats } = useContext(SeatContext);
  const { seatCatalogs } = useContext(SeatCatalogContext);

  const onSubmit: SubmitHandler<ITicket> = async formData => {
    try {
      await createTicket(formData);
      Toastify('Tạo vé thành công!', 201);
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo vé!';
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
            Tạo vé mới
          </p>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-5">
            <div className="flex flex-col gap-2">
              {/*  */}
              <LabelForm title={'Loại phương tiện'} />
              <Select
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('vehicle_catalog_id')}
              >
                <option disabled value="">
                  Chọn Loại Phương Tiện
                </option>
                {vehicleCatalogs.map(vehicleCatalog => (
                  <option value={vehicleCatalog._id} key={vehicleCatalog._id}>
                    {vehicleCatalog.name}
                  </option>
                ))}
              </Select>
              {/*  */}

              <LabelForm title={'Phương tiện'} />
              <Select
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('seat_id.seat_catalog_id.vehicle_id')}
              >
                <option disabled value="">
                  Chọn Phương Tiện
                </option>
                {vehicles.map(vehicle => (
                  <option value={vehicle._id} key={vehicle._id}>
                    {vehicle.name}
                  </option>
                ))}
              </Select>
              {/*  */}
              <LabelForm title={'Khoang(toa)'} />
              <Select
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('seat_id.seat_catalog_id.vehicle_id')}
              >
                <option disabled value="">
                  Chọn Khoang(Toa)
                </option>
                {seatCatalogs.map(seatCatalog => (
                  <option value={seatCatalog._id} key={seatCatalog._id}>
                    {seatCatalog.name}
                  </option>
                ))}
              </Select>
            </div>
            {/*  */}
            <div className="flex flex-col gap-2">
              {/*  */}
              <LabelForm title={'Loại vé'} />
              <Select
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('ticket_catalog_id')}
              >
                <option disabled value="">
                  Chọn Loại Vé
                </option>
                {ticketCatalogs.map(ticketCatalog => (
                  <option key={ticketCatalog._id} value={ticketCatalog._id}>
                    {ticketCatalog.name}
                  </option>
                ))}
              </Select>
              {/*  */}
              <LabelForm title={'Chuyến đi'} />
              <Select
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
              >
                <option disabled value="">
                  Chọn Chuyến Đi
                </option>
                <option value=""></option>
              </Select>
              {/*  */}
              <LabelForm title={'Giá vé'} />
              <InputModal
                placeholder={'vd: 1000'}
                type={'number'}
                {...register('_id')}
              ></InputModal>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5 text-center">
            {/*  */}
            <Select
              defaultValue=""
              className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
            >
              <option disabled value="">
                Chọn Chỗ Ngồi
              </option>
              {seats.map(seat => (
                <option value={seat._id} key={seat._id}>
                  {seat.name}
                </option>
              ))}
            </Select>
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

export default ModalCreateTicketPageAdmin;

