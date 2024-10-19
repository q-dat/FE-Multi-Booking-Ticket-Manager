import React, { useContext, useState } from 'react';
import { VehicleCatalogContext } from '../../context/vehicleCatalog/VehicleCatalogContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { IVehicleCatalog } from '../../types/type/vehicle-catalog/vehicle-catalog';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import ModalCreateVehicleCatalogPageAdmin from '../../components/admin/Modal/ModalVehicleCatalog/ModalCreateVehicleCatalogPageAdmin';
import ModalDeleteVehicleCatalogPageAdmin from '../../components/admin/Modal/ModalVehicleCatalog/ModalDeleteVehicleCatalogPageAdmin';
import ModalEditVehicleCatalogPageAdmin from '../../components/admin/Modal/ModalVehicleCatalog/ModalEditVehicleCatalogPageAdmin';

const VehicleCatalogPage: React.FC = () => {
  const {
    vehicleCatalogs,
    loading,
    error,
    deleteVehicleCatalog,
    getAllVehicleCatalogs
  } = useContext(VehicleCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedVehicleCatalogId, setSelectedVehicleCatalogId] = useState<
    string | null
  >(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedVehicleCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedVehicleCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const navigate = useNavigate();
  const handleDeleteVehicleCatalog = async () => {
    if (selectedVehicleCatalogId) {
      try {
        await deleteVehicleCatalog(selectedVehicleCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá loại phương tiện thành công', 201);
        getAllVehicleCatalogs();
        navigate('/admin/vehicle-catalog');
      } catch (error) {
        Toastify('Xoá loại phương tiện thất bại!', 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Loại Phương Tiện" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Loại Phương Tiện"
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
        Title_TableListAdmin={`Danh Sách Loại Phương Tiện (${vehicleCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Phương Tiện</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {vehicleCatalogs.map((catalog: IVehicleCatalog, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{catalog?.name}</span>
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
                        onClick={() => openModalEditAdmin(catalog._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(catalog._id ?? '')}
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

      <ModalCreateVehicleCatalogPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteVehicleCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteVehicleCatalog}
      />
      <ModalEditVehicleCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        vehicleCatalogId={selectedVehicleCatalogId ?? ''}
      />
    </div>
  );
};

export default VehicleCatalogPage;
