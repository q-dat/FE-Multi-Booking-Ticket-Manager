import React, { useEffect, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITicket } from '../../../../types/type/ticket/ticket';
import { TicketContext } from '../../../../context/ticket/TicketContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import InputModal from '../../InputModal';
import { Button, Select } from 'react-daisyui';
import LabelForm from '../../LabelForm';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { VehicleCatalogContext } from '../../../../context/vehicleCatalog/VehicleCatalogContext';
import { SeatContext } from '../../../../context/seat/SeatContext';
import { TripContext } from '../../../../context/trip/TripContext';
import { TicketCatalogContext } from '../../../../context/ticketCatalog/TicketCatalogContext';

interface ModalEditTicketProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
}

const ModalEditTicketPageAdmin: React.FC<ModalEditTicketProps> = ({
  isOpen,
  onClose,
  ticketId
}) => {
  const { getAllTickets, updateTicket, getTicketById, tickets } =
    useContext(TicketContext);
  const { vehicles } = useContext(VehicleContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
  const { seats } = useContext(SeatContext);
  const { trips } = useContext(TripContext);
  const { register, handleSubmit, reset, setValue } = useForm<ITicket>();
  const { ticketCatalogs } = useContext(TicketCatalogContext);

  useEffect(() => {
    if (ticketId) {
      getTicketById(ticketId);
    }
  }, [ticketId, getTicketById]);

  useEffect(() => {
    const ticketData = tickets.find(ticket => ticket._id === ticketId);
    if (ticketData) {
      setValue('ticket_catalog_id', ticketData.ticket_catalog_id);
      setValue('vehicle_catalog_id', ticketData.vehicle_catalog_id);
      setValue('seat_id', ticketData.seat_id);
      setValue('trip_id', ticketData.trip_id);
      setValue('price', ticketData.price);
    }
  }, [tickets, ticketId, setValue]);

  const onSubmit: SubmitHandler<ITicket> = async formData => {
    try {
      await updateTicket(ticketId, formData);
      Toastify('Chỉnh sửa vé thành công!', 200);
      reset();
      getAllTickets();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi chỉnh sửa vé!';
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
            Chỉnh sửa vé
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
                {...register('trip_id')}
              >
                <option disabled value="">
                  Chọn Chuyến Đi
                </option>
                {trips.map(trip => (
                  <option key={trip._id} value={trip._id}>
                    {trip.departure_point.name}
                    &nbsp; - &nbsp;{trip.destination_point.name}
                  </option>
                ))}
              </Select>
              {/*  */}
              <LabelForm title={'Giá vé(Tự động)'} />
              <InputModal
                placeholder={'(Giá vé tự động!)'}
                type={'number'}
                {...register('price')}
                defaultValue=""
                readOnly
              ></InputModal>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5 text-center">
            {/*  */}
            <div className="text-start">
              <LabelForm title={'Chọn chỗ ngồi'} />
              <Select
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('seat_id')}
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
            </div>
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

export default ModalEditTicketPageAdmin;
