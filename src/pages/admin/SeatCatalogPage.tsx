import React, { useContext, useState, useEffect } from 'react';
import { SeatCatalogContext } from '../../context/seatCatalog/SeatCatalogContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import ModalDeleteSeatCatalogPageAdmin from '../../components/admin/Modal/ModalSeatCatalog/ModalDeleteSeatCatalogPageAdmin';
import ModalEditSeatCatalogPageAdmin from '../../components/admin/Modal/ModalSeatCatalog/ModalEditSeatCatalogPageAdmin';
import ModalCreateSeatCatalogPageAdmin from '../../components/admin/Modal/ModalSeatCatalog/ModalCreateSeatCatalogPageAdmin';
import { ISeatCatalog } from '../../types/type/seat-catalog/seat-catalog';

const SeatCatalogPage: React.FC = () => {
  const {
    seatCatalogs,
    loading,
    error,
    deleteSeatCatalog,
    getAllSeatCatalogs
  } = useContext(SeatCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedSeatCatalogId, setSelectedSeatCatalogId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedSeatCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedSeatCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllSeatCatalogs();
  }, [getAllSeatCatalogs]);

  const navigate = useNavigate();
  const handleDeleteSeatCatalog = async () => {
    if (selectedSeatCatalogId) {
      try {
        await deleteSeatCatalog(selectedSeatCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá loại ghế thành công', 201);
        getAllSeatCatalogs();
        navigate('/admin/seat-catalog');
      } catch (error) {
        Toastify('Xoá loại ghế thất bại!', 401);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Loại Ghế" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Loại Ghế"
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
        Title_TableListAdmin={`Danh Sách loại ghế (${seatCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Loại Ghế</span>
            <span>Danh Mục</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {seatCatalogs.map((catalog: ISeatCatalog, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{catalog?.name}</span>
                <span className="line-clamp-1">{catalog?.vehicle_id.name}</span>
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

      <ModalCreateSeatCatalogPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteSeatCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteSeatCatalog}
      />
      <ModalEditSeatCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        seatCatalogId={selectedSeatCatalogId ?? ''}
      />
    </div>
  );
};

export default SeatCatalogPage;
