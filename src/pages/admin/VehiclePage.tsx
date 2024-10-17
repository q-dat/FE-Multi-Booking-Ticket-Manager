import React, { useContext, useState, useEffect } from 'react';
import { VehicleContext } from '../../context/vehicle/VehicleContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { IVehicle } from '../../types/type/vehicle/vehicle';
import ModalDeleteVehiclePageAdmin from '../../components/admin/Modal/ModalVehicle/ModalDeleteVehiclePageAdmin';
import ModalEditVehiclePageAdmin from '../../components/admin/Modal/ModalVehicle/ModalEditVehiclePageAdmin';
import ModalCreateVehiclePageAdmin from '../../components/admin/Modal/ModalVehicle/ModalCreateVehiclePageAdmin';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';

const VehiclePage: React.FC = () => {
  const { vehicles, loading, error, deleteVehicle, getAllVehicles } =
    useContext(VehicleContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedVehicleId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedVehicleId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllVehicles();
  }, [getAllVehicles]);

  const navigate = useNavigate();
  const handleDeleteVehicle = async () => {
    if (selectedVehicleId) {
      try {
        await deleteVehicle(selectedVehicleId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá phương tiện thành công', 201);
        getAllVehicles();
        navigate('/admin/vehicle');
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá phương tiện thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Phương Tiện" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Phương Tiện"
          Btn_Create={
            <Button
              color="primary"
              onClick={openModalCreateAdmin}
              className="text-sm font-light text-white"
            >
              <div className="flex items-center space-x-1">
                <RiAddBoxLine className="text-xl" />
                <p>Thêm</p>
              </div>
            </Button>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Phương Tiện (${vehicles.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Phương Tiện</span>
            <span>Trạng Thái</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {vehicles.map((vehicle: IVehicle, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{vehicle?.name}</span>
                <span
                  className={`inline-block w-[150px] rounded-lg px-4 py-2 font-medium text-white ${
                    vehicle?.status === 'Đang hoạt động'
                      ? 'border border-green-600 bg-[#a6e3d5] text-green-700'
                      : vehicle?.status === 'Đang bảo trì'
                        ? 'border border-yellow-600 bg-yellow-200 text-yellow-700'
                        : 'border border-red-600 bg-red-200 text-red-600'
                  }`}
                >
                  {vehicle?.status}
                </span>
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
                        onClick={() => openModalEditAdmin(vehicle._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(vehicle._id ?? '')}
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
      <ModalCreateVehiclePageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteVehiclePageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteVehicle}
      />
      <ModalEditVehiclePageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        vehicleId={selectedVehicleId ?? ''}
      />
    </div>
  );
};

export default VehiclePage;
