import React, { useContext, useState, useEffect } from 'react';
import { TripContext } from '../../context/trip/TripContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine, RiListSettingsLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { ITrip } from '../../types/type/trip/trip';
import ModalDeleteTripPageAdmin from '../../components/admin/Modal/ModalTrip/ModalDeleteTripPageAdmin';
import ModalEditTripPageAdmin from '../../components/admin/Modal/ModalTrip/ModalEditTripPageAdmin';
import ModalCreateTripPageAdmin from '../../components/admin/Modal/ModalTrip/ModalCreateTripPageAdmin';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { VehicleContext } from '../../context/vehicle/VehicleContext';

const TripPage: React.FC = () => {
  const {
    trips,
    loading,
    error,
    deleteTrip,
    getAllTrips,
    filterTripsByVehicleId
  } = useContext(TripContext);
  const { vehicles } = useContext(VehicleContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [checkboxCategory, setCheckboxCategory] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedTripId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedTripId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);
  useEffect(() => {
    getAllTrips();
  }, [getAllTrips]);

  const handleDeleteTrip = async () => {
    if (selectedTripId) {
      try {
        await deleteTrip(selectedTripId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá chuyến đi thành công', 201);
        getAllTrips();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá chuyến đi thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };
  //Filter
  const handleSearchByCategory = async (vehicle: string) => {
    await filterTripsByVehicleId(vehicle);
  };
  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Chuyến Đi" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Chuyến Đi"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="success"
                onClick={openModalCreateAdmin}
                className="w-[100px] text-sm font-light text-white"
              >
                <RiAddBoxLine className="text-xl" color="white" />
                Thêm
              </Button>
              <div className="dropdown dropdown-hover relative flex h-12 min-w-[100px] cursor-pointer flex-col items-center justify-center rounded-md bg-primary">
                <p className="">
                  <RiListSettingsLine className="text-xl text-white" />
                </p>
                <div className="dropdown-content absolute top-[100%] z-10 w-52 space-y-1 rounded-md bg-slate-50 p-2 shadow-headerMenu drop-shadow-md">
                  {vehicles.map(vehicle => (
                    <label key={vehicle._id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={checkboxCategory === vehicle._id}
                        onChange={() => {
                          setCheckboxCategory(vehicle._id);
                          handleSearchByCategory(vehicle._id);
                        }}
                      />
                      <span className="ml-2">{vehicle?.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Chuyến Đi (${trips.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Chuyến Đi</span>
            <span>Danh Mục</span>
            <span>Thời Gian Đi</span>
            <span>Thời Gian Về</span>
            <span>Giá</span>
            <span>Mô Tả</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {trips.map((trip: ITrip, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="flex items-center justify-center gap-1">
                  {trip.departure_point?.name}
                  <p className="text-primary">-</p>
                  {trip.destination_point?.name}
                </span>
                <span>{trip?.vehicle_id?.name || 'Không có danh mục!'}</span>
                <span>
                    <span className="text-blue-500">
                      {trip?.departure_time}&nbsp;
                    </span>
                    {new Date(
                      trip?.departure_date
                    ).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="">
                    <span className="text-blue-500">
                      {trip?.return_time}&nbsp;
                    </span>
                    {new Date(trip?.return_date).toLocaleDateString(
                      'vi-VN'
                    )}
                  </span>
                <span>
                  {(trip?.price * 1000).toLocaleString('vi-VN')}&nbsp;VND
                </span>
                <span>{trip.des || 'Không có mô tả!'}</span>
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
                        onClick={() => openModalEditAdmin(trip._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(trip._id ?? '')}
                        className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                      >
                        <MdDelete />
                        Xoá
                      </Button>
                    </div>
                  </details>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        }
      />
      <ModalCreateTripPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteTripPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteTrip}
      />
      <ModalEditTripPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        tripId={selectedTripId ?? ''}
      />
    </div>
  );
};

export default TripPage;
