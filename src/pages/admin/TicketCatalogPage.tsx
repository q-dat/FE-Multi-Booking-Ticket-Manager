import React, { useContext, useState } from 'react';
import { TicketCatalogContext } from '../../context/ticketCatalog/TicketCatalogContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { ITicketCatalog } from '../../types/type/ticket-catalog/ticket-catalog';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import ModalCreateTicketCatalogPageAdmin from '../../components/admin/Modal/ModalTicketCatalog/ModalCreateTicketCatalogPageAdmin';
import ModalDeleteTicketCatalogPageAdmin from '../../components/admin/Modal/ModalTicketCatalog/ModalDeleteTicketCatalogPageAdmin';
import ModalEditTicketCatalogPageAdmin from '../../components/admin/Modal/ModalTicketCatalog/ModalEditTicketCatalogPageAdmin';

const TicketCatalogPage: React.FC = () => {
  const {
    ticketCatalogs,
    loading,
    error,
    deleteTicketCatalog,
    getAllTicketCatalogs
  } = useContext(TicketCatalogContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedTicketCatalogId, setSelectedTicketCatalogId] = useState<
    string | null
  >(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedTicketCatalogId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedTicketCatalogId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  const navigate = useNavigate();
  const handleDeleteTicketCatalog = async () => {
    if (selectedTicketCatalogId) {
      try {
        await deleteTicketCatalog(selectedTicketCatalogId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá loại vé thành công', 201);
        getAllTicketCatalogs();
        navigate('/admin/ticket-catalog');
      } catch (error) {
        Toastify('Xoá loại vé thất bại!', 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Loại Vé" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Loại Vé"
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
        Title_TableListAdmin={`Danh Sách Loại Vé (${ticketCatalogs.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Loại Vé</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {ticketCatalogs.map((catalog: ITicketCatalog, index: number) => (
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

      <ModalCreateTicketCatalogPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteTicketCatalogPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteTicketCatalog}
      />
      <ModalEditTicketCatalogPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        ticketCatalogId={selectedTicketCatalogId ?? ''}
      />
    </div>
  );
};

export default TicketCatalogPage;
