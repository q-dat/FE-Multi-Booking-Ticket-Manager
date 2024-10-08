import React, { useContext, useState } from 'react';
import { LocationContext } from '../../context/location/LocationContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { ILocation } from '../../types/type/location/location';
import ModalDeleteLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalDeleteLocationPageAdmin';
import ModalEditLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalEditLocationPageAdmin';
import ModalCreateLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalCreateLocationPageAdmin';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';

const LocationPage: React.FC = () => {
  const { locations, loading, error, deleteLocation, getAllLocations } =
    useContext(LocationContext);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);

  const openModalDeleteAdmin = (id: string) => {
    setSelectedLocationId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);

  const openModalEditAdmin = (id: string) => {
    setSelectedLocationId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const handleDeleteLocation = async () => {
    if (selectedLocationId) {
      try {
        await deleteLocation(selectedLocationId); // Xóa địa điểm
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá địa chỉ thành công', 201);
        getAllLocations(); // Cập nhật lại danh sách địa điểm
      } catch (error: unknown) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá địa chỉ thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 401);
      }
    }
  };

  if (loading) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavtitleAdmin
        Title_NavtitleAdmin="Quản Lý Địa Điểm"
        Btn_Create={
          <Button
            color="primary"
            onClick={openModalCreateAdmin}
            className="text-sm font-light text-white"
          >
            <div className="flex items-center space-x-1">
              <RiAddBoxLine className="text-xl" />
              <p>Tạo mới</p>
            </div>
          </Button>
        }
      />

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Địa Điểm (${locations.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Địa Điểm</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {locations.map((location: ILocation, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{location?.name}</span>
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
                        onClick={() => openModalEditAdmin(location._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => openModalDeleteAdmin(location._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
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
      <ModalCreateLocationPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteLocationPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteLocation}
      />
      <ModalEditLocationPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        locationId={selectedLocationId ?? ''}
      />
    </div>
  );
};

export default LocationPage;
