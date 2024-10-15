// src/pages/admin/TripPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-daisyui';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import ModalCreateTripPageAdmin from '../../components/admin/Modal/ModalTrip/ModalCreateTripPageAdmin';
import ModalDeleteTripPageAdmin from '../../components/admin/Modal/ModalTrip/ModalDeleteTripPageAdmin';
import ModalEditTripPageAdmin from '../../components/admin/Modal/ModalTrip/ModalEditTripPageAdmin';
import { ITrip } from '../../types/type/trip/trip';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { TripContext } from '../../context/trip/TripContext';

const TripPage: React.FC = () => {
  const { trips, loading, error, deleteTrip, getAllTrips } = useContext(TripContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

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
        Toastify('Xoá chuyến đi thất bại!', 401);
      }
    }
  };

  if (loading) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavtitleAdmin
        Title_NavtitleAdmin="Quản Lý Chuyến Đi"
        Btn_Create={
          <Button
            color="primary"
            onClick={openModalCreateAdmin}
            className="text-sm font-light text-white"
          >
            Thêm Chuyến Đi
          </Button>
        }
      />
      <Table>
        <Table.Head>
          <span>STT</span>
          <span>Điểm Khởi Hành</span>
          <span>Điểm Đến</span>
          <span>Ngày Khởi Hành</span>
          <span>Ngày Đến</span>
          <span>Giá</span>
          <span>Hành Động</span>
        </Table.Head>
        <Table.Body>
          {trips.map((trip: ITrip, index: number) => (
            <Table.Row key={trip._id}>
              <span>#{index + 1}</span>
              <span>{trip.departure_point.name}</span>
              <span>{trip.destination_point.name}</span>
              <span>{new Date(trip.departure_date).toLocaleDateString('vi-VN')}</span>
              <span>{new Date(trip.arrivalDate).toLocaleDateString('vi-VN')}</span>
              <span>{trip.price.toLocaleString('vi-VN')} VNĐ</span>
              <span>
                <Button onClick={() => openModalEditAdmin(trip._id)}>Cập Nhật</Button>
                <Button onClick={() => openModalDeleteAdmin(trip._id)}>Xoá</Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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