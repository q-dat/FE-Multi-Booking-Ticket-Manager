import React, { useContext, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITicket } from '../../../../types/type/ticket/ticket';
import { TicketContext } from '../../../../context/ticket/TicketContext';
import { Toastify } from '../../../../helper/Toastify';
import { Button, Select as DaisySelect } from 'react-daisyui';
import { TicketCatalogContext } from '../../../../context/ticketCatalog/TicketCatalogContext';
import LabelForm from '../../LabelForm';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { VehicleCatalogContext } from '../../../../context/vehicleCatalog/VehicleCatalogContext';
import { SeatContext } from '../../../../context/seat/SeatContext';
import InputModal from '../../InputModal';
import { TripContext } from '../../../../context/trip/TripContext';
import Select from 'react-select';
import { ISeat } from '../../../../types/type/seat/seat';

interface ModalCreateTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTicketPageAdmin: React.FC<ModalCreateTicketProps> = ({
  isOpen,
  onClose
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<ITicket>();
  const { createTicket, getAllTickets, error } = useContext(TicketContext);
  const { ticketCatalogs } = useContext(TicketCatalogContext);
  const { vehicles } = useContext(VehicleContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
  const { seats, seatIds, getListIdByVehicleName } = useContext(SeatContext);
  const { trips } = useContext(TripContext);

  const handleGetListIdByVehicleName = async (vehicleName: string) => {
    await getListIdByVehicleName(vehicleName);
  };

  const onSubmit: SubmitHandler<ITicket> = async formData => {
    formData.seat_id = seatIds.map(
      seatId => seats.find(seat => seat._id === seatId) as ISeat
    );
    try {
      await createTicket(formData);
      Toastify('Tạo vé thành công!', 201);
      reset();
      getAllTickets();
      onClose();
    } catch {
      Toastify(`Lỗi: ${error}`, 500);
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  useEffect(() => {
    const selectedSeats = seatIds
      .map(seatId => {
        return seats.find(seat => seat._id === seatId);
      })
      .filter(seat => seat !== undefined) as ISeat[];

    setValue('seat_id', selectedSeats);
  }, [seatIds, setValue, seats]);

  const handleVehicleChange = (vehicleId: string) => {
    const vehicleName = vehicles.find(
      vehicle => vehicle._id === vehicleId
    )?.name;
    if (vehicleName) {
      handleGetListIdByVehicleName(vehicleName);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto bg-black bg-opacity-40 px-2 scrollbar-hide"
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
              <LabelForm title={'Loại phương tiện'} />
              <DaisySelect
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('vehicle_catalog_id', { required: true })}
              >
                <option disabled value="">
                  Chọn Loại Phương Tiện
                </option>
                {vehicleCatalogs.map(vehicleCatalog => (
                  <option value={vehicleCatalog._id} key={vehicleCatalog._id}>
                    {vehicleCatalog.name}
                  </option>
                ))}
              </DaisySelect>

              <LabelForm title={'Phương tiện'} />
              <DaisySelect
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                onChange={e => handleVehicleChange(e.target.value)}
              >
                <option disabled value="">
                  Chọn Phương Tiện
                </option>
                {vehicles.map(vehicle => (
                  <option value={vehicle._id} key={vehicle._id}>
                    {vehicle.name}
                  </option>
                ))}
              </DaisySelect>

              <LabelForm title={'Chọn chỗ ngồi'} />
              <Select
                isMulti
                className="border-none text-primary"
                options={seats.map(seat => ({
                  value: seat._id,
                  label: seat.name || seat._id
                }))}
                value={seatIds.map(seatId => ({
                  value: seatId,
                  label: seats.find(seat => seat._id === seatId)?.name || ''
                }))}
                onChange={selectedOptions => {
                  const seatData: ISeat[] = selectedOptions
                    .map(option => {
                      const selectedSeat = seats.find(
                        seat => seat._id === option.value
                      );
                      if (!selectedSeat) {
                        return null;
                      }
                      return {
                        _id: selectedSeat._id,
                        name: selectedSeat.name || '',
                        price: selectedSeat.price || 0,
                        status: selectedSeat.status || '',
                        ordinal_numbers: selectedSeat.ordinal_numbers || 0,
                        seat_catalog_id: selectedSeat.seat_catalog_id,
                        createAt: selectedSeat.createAt || '',
                        updateAt: selectedSeat.updateAt || ''
                      };
                    })
                    .filter(seat => seat !== null) as ISeat[];

                  setValue('seat_id', seatData);
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <LabelForm title={'Loại vé'} />
              <DaisySelect
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('ticket_catalog_id._id', { required: true })}
              >
                <option disabled value="">
                  Chọn Loại Vé
                </option>
                {ticketCatalogs.map(ticketCatalog => (
                  <option key={ticketCatalog._id} value={ticketCatalog._id}>
                    {ticketCatalog.name}
                  </option>
                ))}
              </DaisySelect>

              <LabelForm title={'Chuyến đi'} />
              <DaisySelect
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('trip_id._id', { required: true })}
              >
                <option disabled value="">
                  Chọn Chuyến Đi
                </option>
                {trips.map(trip => (
                  <option key={trip._id} value={trip._id}>
                    {trip.departure_point.name}
                    &nbsp; - &nbsp;{trip.destination_point.name}
                    &nbsp;({trip.vehicle_catalog_id?.name || 'unknown'})
                  </option>
                ))}
              </DaisySelect>

              <LabelForm title={'Giá vé(Tự động)'} />
              <InputModal
                placeholder={'(Giá vé tự động!)'}
                type={'number'}
                {...register('price', { required: true })}
                defaultValue="0"
                readOnly
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5 text-center">
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
