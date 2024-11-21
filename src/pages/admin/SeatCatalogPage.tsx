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
import ModalDeleteSeatCatalogPageAdmin from '../../components/admin/Modal/ModalSeatCatalog/ModalDeleteSeatCatalogPageAdmin';
import ModalEditSeatCatalogPageAdmin from '../../components/admin/Modal/ModalSeatCatalog/ModalEditSeatCatalogPageAdmin';
import ModalCreateSeatCatalogPageAdmin from '../../components/admin/Modal/ModalSeatCatalog/ModalCreateSeatCatalogPageAdmin';
import { ISeatCatalog } from '../../types/type/seat-catalog/seat-catalog';
import { isIErrorResponse } from '../../types/error/error';

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
  const [selectedSeatCatalogId, setSelectedSeatCatalogId] = useState<
    string | null
  >(null);

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

  const handleDeleteSeatCatalog = async () => {
    if (selectedSeatCatalogId) {
      try {
        await deleteSeatCatalog(selectedSeatCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá danh mục chỗ ngồi thành công', 201);
        getAllSeatCatalogs();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá danh mục chỗ ngồi thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Khoang/Toa" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Khoang/Toa"
          Btn_Create={
            <Button
              color="success"
              onClick={openModalCreateAdmin}
              className="w-[100px] text-sm font-light text-white"
            >
              <RiAddBoxLine className="text-xl" color="white" />
              Thêm
            </Button>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Danh Mục Chỗ Ngồi (${seatCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Khoang/Toa</span>
            <span>Danh Mục</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {seatCatalogs.map((seatCatalog: ISeatCatalog, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{seatCatalog?.name}</span>
                <span className="line-clamp-1">
                  {seatCatalog?.vehicle_id?.name || 'Không có danh mục!'}
                  <sup
                    className={`mx-1 rounded-sm px-1 font-bold text-white ${
                      seatCatalog?.vehicle_id?.des?.includes('1')
                        ? 'bg-red-500'
                        : seatCatalog?.vehicle_id?.des?.includes('2')
                          ? 'bg-blue-500'
                          : seatCatalog?.vehicle_id?.des?.includes('3')
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                    }`}
                  >
                    {seatCatalog?.vehicle_id?.des}
                  </sup>
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
                        onClick={() =>
                          openModalEditAdmin(seatCatalog._id ?? '')
                        }
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() =>
                          openModalDeleteAdmin(seatCatalog._id ?? '')
                        }
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
