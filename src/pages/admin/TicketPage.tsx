import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../context/ticket/TicketContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine, RiListSettingsLine } from 'react-icons/ri';
import { Button, Select, Table } from 'react-daisyui';
import { ITicket } from '../../types/type/ticket/ticket';
import { MdDelete, MdDeleteSweep } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import ModalCreateTicketPageAdmin from '../../components/admin/Modal/ModalTicket/ModalCreateTicketPageAdmin';
import ModalDeleteTicketPageAdmin from '../../components/admin/Modal/ModalTicket/ModalDeleteTicketPageAdmin';
import ModalEditTicketPageAdmin from '../../components/admin/Modal/ModalTicket/ModalEditTicketPageAdmin';
import { TicketCatalogContext } from '../../context/ticketCatalog/TicketCatalogContext';
import { VehicleCatalogContext } from '../../context/vehicleCatalog/VehicleCatalogContext';
import { LocationContext } from '../../context/location/LocationContext';
import { LuFilter } from 'react-icons/lu';
import { VehicleContext } from '../../context/vehicle/VehicleContext';
import LabelForm from '../../components/admin/LabelForm';
import { PiWarningOctagonFill } from 'react-icons/pi';
const TicketPage: React.FC = () => {
  const {
    tickets,
    loading,
    error,
    deleteTicket,
    getAllTickets,
    filterTickets
  } = useContext(TicketContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedTicketId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedTicketId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);
  const { ticketCatalogs } = useContext(TicketCatalogContext);
  const { vehicleCatalogs } = useContext(VehicleCatalogContext);
  const { locations } = useContext(LocationContext);
  const { vehicles } = useContext(VehicleContext);

  //Filter
  const [ticketCatalog, setTicketCatalog] = useState<string>('');
  const [vehicleCatalog, setVehicleCatalog] = useState<string>('');
  const [departurePoint, setDeparturePoint] = useState<string>('');
  const [shouldSearch, setShouldSearch] = useState(false);

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

  const handleFilter = async () => {
    const filterParams = {
      ticket_catalog_name: ticketCatalog,
      vehicle_catalog_name: vehicleCatalog,
      departure_point_name: departurePoint
    };
    await filterTickets(filterParams);
  };
  //
  const navigate = useNavigate();
  const handleDeleteTicket = async () => {
    if (selectedTicketId) {
      try {
        await deleteTicket(selectedTicketId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá vé thành công', 201);
        getAllTickets();
        navigate('/admin/ticket');
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá vé thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };
  const [fillter, setFillter] = useState<string[]>([
    'STT',
    'Loại Vé',
    'Phương Tiện',
    'Khoang/Toa',
    'Chỗ Ngồi',
    'Điểm Khởi Hành',
    'Điểm Đến',
    'Thời Gian Đi',
    'Thời Gian Về',
    'Giá Vé',
    'Hành Động'
  ]);
  const list = [
    'STT',
    'Loại Vé',
    'Phương Tiện',
    'Khoang/Toa',
    'Chỗ Ngồi',
    'Điểm Khởi Hành',
    'Điểm Đến',
    'Thời Gian Đi',
    'Thời Gian Về',
    'Giá Vé',
    'Hành Động'
  ];
  const replaceItem = (index: number, newValue: string) => {
    setFillter(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = newValue;
      return newItems;
    });
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Các Vé" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Vé"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              {/*  */}
              <div className="dropdown dropdown-hover relative">
                <Button
                  color="error"
                  className="min-w-[100px] cursor-grab text-sm font-light text-white"
                >
                  <MdDeleteSweep className="text-xl" color="white" /> Xoá vé
                  phương tiện
                </Button>
                <div className="dropdown-content absolute top-[100%] z-10 flex min-w-[150px] flex-col gap-2 rounded-md bg-slate-50 p-2 shadow-headerMenu drop-shadow-md dark:bg-gray-900">
                  <p className="flex flex-row items-center gap-1 text-black dark:text-white">
                    <PiWarningOctagonFill className="text-lg text-warning" />
                    <strong>Lưu ý: </strong>
                    <span>Chỉ chọn 1 phương tiện duy nhất</span>
                  </p>
                  <div className="flex flex-col gap-2 xl:flex-row">
                    <div className="flex flex-col">
                      <LabelForm title="Tàu Hoả" />
                      <Select
                        defaultValue=""
                        className="min-w-[130px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full"
                      >
                        <option disabled value="">
                          Tàu Hoả
                        </option>
                        {vehicles
                          .filter(vehicle =>
                            vehicle.name.toLowerCase().includes('tàu')
                          )
                          .map(vehicle => (
                            <option value={vehicle._id}>{vehicle.name}</option>
                          ))}
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      {' '}
                      <LabelForm title="Xe Khách" />
                      <Select
                        defaultValue=""
                        className="min-w-[130px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full"
                      >
                        <option disabled value="">
                          Xe Khách
                        </option>
                        {vehicles
                          .filter(vehicle =>
                            vehicle.name.toLowerCase().includes('xe khách')
                          )
                          .map(vehicle => (
                            <option value={vehicle._id}>{vehicle.name}</option>
                          ))}
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      {' '}
                      <LabelForm title="Máy Bay" />
                      <Select
                        defaultValue=""
                        className="min-w-[130px] border border-gray-700 border-opacity-50 bg-white text-black focus:border-primary focus:outline-none dark:border-secondary dark:bg-gray-700 dark:text-white dark:focus:border-white md:w-[300px] lg:w-[400px] xl:w-full"
                      >
                        <option disabled value="">
                          Máy Bay
                        </option>
                        {vehicles
                          .filter(vehicle =>
                            vehicle.name.toLowerCase().includes('máy bay')
                          )
                          .map(vehicle => (
                            <option value={vehicle._id}>{vehicle.name}</option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <Button size="sm" color="error" className="text-white">
                    Xoá Vé Phương Tiện
                  </Button>
                </div>
              </div>
              {/* */}
              <div className="flex flex-row gap-2">
                <Button
                  color="success"
                  onClick={openModalCreateAdmin}
                  className="min-w-[100px] text-sm font-light text-white"
                >
                  <RiAddBoxLine className="text-xl" color="white" />
                  Thêm
                </Button>
                {/*  */}
                <div className="dropdown dropdown-hover relative flex h-12 min-w-[100px] cursor-grab flex-col items-center justify-center rounded-md bg-primary text-white">
                  <Button color="primary" className="text-white">
                    <LuFilter className="text-xl" color="white" />
                    Lọc
                  </Button>
                  <div className="dropdown-content absolute top-[100%] z-10 w-[350px] space-y-1 rounded-md bg-slate-50 p-2 shadow-headerMenu drop-shadow-md">
                    <div className="flex flex-row gap-4">
                      {/* Loại Vé */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary hover:text-secondary">
                          Loại Vé
                        </span>
                        {ticketCatalogs.map(item => (
                          <label
                            className="flex h-8 cursor-pointer items-center gap-2"
                            key={item.name}
                          >
                            <input
                              type="checkbox"
                              className="cursor-pointer"
                              checked={ticketCatalog === item.name}
                              onChange={() =>
                                handleCheckboxChange(
                                  setTicketCatalog,
                                  item.name,
                                  ticketCatalog
                                )
                              }
                            />
                            <span className="text-primary hover:text-secondary">
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Phương Tiện */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary hover:text-secondary">
                          Phương Tiện
                        </span>
                        {vehicleCatalogs.map(item => (
                          <label
                            className="flex h-8 cursor-pointer items-center gap-2"
                            key={item.name}
                          >
                            <input
                              type="checkbox"
                              className="cursor-pointer"
                              checked={vehicleCatalog === item.name}
                              onChange={() =>
                                handleCheckboxChange(
                                  setVehicleCatalog,
                                  item.name,
                                  vehicleCatalog
                                )
                              }
                            />
                            <span className="text-primary hover:text-secondary">
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* Điểm Khởi Hành */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary hover:text-secondary">
                          Điểm Khởi Hành
                        </span>
                        {locations.map(item => (
                          <label
                            className="flex h-8 cursor-pointer items-center gap-2"
                            key={item.name}
                          >
                            <input
                              type="checkbox"
                              className="cursor-pointer"
                              checked={departurePoint === item.name}
                              onChange={() =>
                                handleCheckboxChange(
                                  setDeparturePoint,
                                  item.name,
                                  departurePoint
                                )
                              }
                            />
                            <span className="text-primary hover:text-secondary">
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/*  */}
                <div className="dropdown dropdown-hover relative flex h-12 min-w-[100px] cursor-pointer flex-col items-center justify-center rounded-md bg-primary text-white">
                  <p className="">
                    <RiListSettingsLine className="text-xl" />
                  </p>
                  <div className="dropdown-content absolute top-[100%] z-10 w-52 space-y-1 rounded-md bg-slate-50 p-2 shadow-headerMenu drop-shadow-md">
                    {list.map((items, index) => (
                      <div className="flex" key={index}>
                        <label className="flex h-8 cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            onClick={() => {
                              if (items === fillter[index]) {
                                replaceItem(index, 'show');
                              } else {
                                replaceItem(index, list[index]);
                              }
                            }}
                          />
                          <span className="text-primary hover:text-secondary">
                            {items}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Vé (${tickets.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            {fillter[0] === 'STT' && <span>STT</span>}
            {fillter[1] === 'Loại Vé' && <span>Loại Vé</span>}
            {fillter[2] === 'Phương Tiện' && <span>Phương Tiện</span>}
            {fillter[3] === 'Khoang/Toa' && <span>Khoang/Toa</span>}
            {fillter[4] === 'Chỗ Ngồi' && <span>Chỗ Ngồi</span>}
            {fillter[5] === 'Điểm Khởi Hành' && <span>Điểm Khởi Hành</span>}
            {fillter[6] === 'Điểm Đến' && <span>Điểm Đến</span>}
            {fillter[7] === 'Thời Gian Đi' && <span>Thời Gian Đi</span>}
            {fillter[8] === 'Thời Gian Về' && <span>Thời Gian Về</span>}
            {fillter[9] === 'Giá Vé' && <span>Giá Vé</span>}
            {fillter[10] === 'Hành Động' && <span>Hành Động</span>}
          </Table.Head>
        }
        table_body={
          <Table.Body className="table-sm text-center text-sm">
            {tickets.map((ticket: ITicket, index: number) => (
              <Table.Row key={ticket._id}>
                {fillter[0] === 'STT' ? (
                  <span className="line-clamp-1">#{index + 1}</span>
                ) : (
                  <></>
                )}
                {fillter[1] === 'Loại Vé' ? (
                  <span className="line-clamp-1">
                    {ticket.ticket_catalog_id?.name}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[2] === 'Phương Tiện' ? (
                  <span>
                    <span>
                      {ticket.seat_id.map(seat => (
                        <span key={seat._id} className="line-clamp-1">
                          {seat.seat_catalog_id?.vehicle_id?.name}
                        </span>
                      ))}
                    </span>
                  </span>
                ) : (
                  <></>
                )}
                {fillter[3] === 'Khoang/Toa' ? (
                  <span className="line-clamp-1">
                    {ticket.seat_id.map(seat => (
                      <span key={seat._id}>{seat.seat_catalog_id?.name}</span>
                    ))}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[4] === 'Chỗ Ngồi' ? (
                  <span className="font-bold">
                    {ticket.seat_id.map(seat => (
                      <>
                        <span>{seat?.ordinal_numbers}</span>
                      </>
                    ))}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[5] === 'Điểm Khởi Hành' ? (
                  <span className="line-clamp-1">
                    {ticket.trip_id?.departure_point?.name}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[6] === 'Điểm Đến' ? (
                  <span className="line-clamp-1">
                    {ticket.trip_id?.destination_point?.name}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[7] === 'Thời Gian Đi' ? (
                  <span>
                    <span className="text-blue-500">
                      {ticket.trip_id?.departure_time}&nbsp;
                    </span>
                    {new Date(
                      ticket.trip_id?.departure_date
                    ).toLocaleDateString('vi-VN')}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[8] === 'Thời Gian Về' ? (
                  <span className="">
                    <span className="text-blue-500">
                      {ticket.trip_id?.return_time}&nbsp;
                    </span>
                    {new Date(ticket.trip_id?.return_date).toLocaleDateString(
                      'vi-VN'
                    )}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[9] === 'Giá Vé' ? (
                  <span className="line-clamp-1">
                    {(ticket.price * 1000).toLocaleString('vi-VN')}&nbsp;VND
                  </span>
                ) : (
                  <></>
                )}
                {fillter[10] === 'Hành Động' ? (
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Button
                          color="success"
                          onClick={() => openModalEditAdmin(ticket._id ?? '')}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => openModalDeleteAdmin(ticket._id ?? '')}
                          className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                        >
                          <MdDelete />
                          Xoá
                        </Button>
                      </div>
                    </details>
                  </span>
                ) : (
                  <></>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        }
      />
      <ModalCreateTicketPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteTicketPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteTicket}
      />
      <ModalEditTicketPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        ticketId={selectedTicketId ?? ''}
      />
    </div>
  );
};

export default TicketPage;
