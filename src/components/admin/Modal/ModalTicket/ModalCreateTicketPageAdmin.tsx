import React, { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ITicket } from '../../../../types/type/ticket/ticket';
import { TicketContext } from '../../../../context/ticket/TicketContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import { Button, Select as DaisySelect } from 'react-daisyui';
import { TicketCatalogContext } from '../../../../context/ticketCatalog/TicketCatalogContext';
import LabelForm from '../../LabelForm';
import { VehicleContext } from '../../../../context/vehicle/VehicleContext';
import { VehicleCatalogContext } from '../../../../context/vehicleCatalog/VehicleCatalogContext';
import { SeatContext } from '../../../../context/seat/SeatContext';
import InputModal from '../../InputModal';
import { TripContext } from '../../../../context/trip/TripContext';

interface ModalCreateTicketProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateTicketPageAdmin: React.FC<ModalCreateTicketProps> = ({
  isOpen,
  onClose
}) => {
  const { register, handleSubmit, reset } = useForm<ITicket>();
  const { createTicket, getAllTickets } = useContext(TicketContext);
  const { ticketCatalogs } = useContext(TicketCatalogContext);
  const { vehicles } = useContext(VehicleContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
  const { seats, searchSeatsByName } = useContext(SeatContext);
  const { trips } = useContext(TripContext);

  const onSubmit: SubmitHandler<ITicket> = async formData => {
    try {
      await createTicket(formData);
      Toastify('Tạo vé thành công!', 201);
      reset();
      getAllTickets();
      onClose();
    } catch (error: unknown) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi tạo vé!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };
  //Filter
  const [vehiclesName, setVehiclesName] = useState<string>('');
  const [seatCatalogsName, setSeatCatalogsName] = useState<string>('');
  const [shouldSearch, setShouldSearch] = useState(false);

  const handleFilter = async () => {
    const filterParams = {
      vehicleName: vehiclesName,
      seatCatalogName: seatCatalogsName
    };
    await searchSeatsByName(filterParams);
  };

  useEffect(() => {
    if (shouldSearch) {
      handleFilter();
      setShouldSearch(false);
    }
  }, [shouldSearch]);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    currentValue: string
  ) => {
    const newValue = currentValue === value ? '' : value;
    setter(newValue);
    setShouldSearch(true);
  };

  if (!isOpen) return null;

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
          {/*  Filter Seat */}
          <div className="flex w-full flex-col items-center gap-5">
            {/* Phương Tiện */}
            <p className="w-[150px] rounded-lg py-2 text-center text-sm text-primary shadow-inner shadow-gray-50 dark:text-white">
              Lọc Chỗ Ngồi
            </p>
            <div className="flex w-full flex-row items-start justify-between gap-5">
              <div className="flex h-[80px] w-full flex-col gap-1 overflow-auto rounded-md p-2 shadow-inner shadow-gray-50 scrollbar-hide">
                <span className="text-xs font-semibold text-primary hover:text-secondary dark:text-white">
                  Lọc Phương Tiện
                </span>
                {vehicles.map(item => (
                  <label
                    className="flex h-8 cursor-pointer items-center gap-2"
                    key={item.name}
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={vehiclesName === item.name}
                      onChange={() =>
                        handleCheckboxChange(
                          setVehiclesName,
                          item.name,
                          vehiclesName
                        )
                      }
                    />
                    <span className="text-primary hover:text-secondary dark:text-white">
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>
              {/* Khoang/Toa */}
              <div className="flex h-[80px] w-full flex-col gap-1 overflow-auto rounded-md p-2 shadow-inner shadow-gray-50 scrollbar-hide">
                <span className="text-xs font-semibold text-primary hover:text-secondary dark:text-white">
                  Lọc Khoang/Toa
                </span>
                {seats
                  .filter(
                    (item, index, self) =>
                      index ===
                      self.findIndex(
                        t =>
                          t.seat_catalog_id.name === item.seat_catalog_id.name
                      )
                  )
                  .map(item => (
                    <label
                      className="flex h-8 cursor-pointer items-center gap-2"
                      key={item.seat_catalog_id.name}
                    >
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={seatCatalogsName === item.seat_catalog_id.name}
                        onChange={() =>
                          handleCheckboxChange(
                            setSeatCatalogsName,
                            item.seat_catalog_id.name,
                            seatCatalogsName
                          )
                        }
                      />
                      <span className="text-primary hover:text-secondary dark:text-white">
                        {item.seat_catalog_id.name}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
          {/* */}
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
                {...register('seat_id.0.seat_catalog_id.vehicle_id._id', {
                  required: true
                })}
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
              <DaisySelect
                defaultValue=""
                className="w-full border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white"
                {...register('seat_id.0._id', { required: true })}
              >
                <option disabled value="">
                  Chọn Chỗ Ngồi
                </option>
                {seats
                  .filter(
                    (item, index, self) =>
                      index === self.findIndex(t => t.name === item.name)
                  )
                  .map(seat => (
                    <option value={seat._id} key={seat._id}>
                      {seat.name} &nbsp;-&nbsp;
                      {seat.seat_catalog_id.name}
                    </option>
                  ))}
              </DaisySelect>
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
              ></InputModal>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5 text-center">
            {/* <div className="text-start">
              <LabelForm title={'Chọn chỗ ngồi'} />
              <Select
                isMulti
                options={seats.map(seat => ({
                  value: seat._id,
                  label: seat.name
                }))}
                onChange={selectedOptions => {
                  const seatIds = selectedOptions.map(option => option.value);
                  console.log(seatIds)
                  register('seat_id._id', { required: true }).onChange({
                    target: { value: seatIds }
                  });
                }}
              />
            
            </div> */}

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
