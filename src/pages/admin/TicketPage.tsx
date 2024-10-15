import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../context/ticket/TicketContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { ITicket } from '../../types/type/ticket/ticket';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import ModalCreateTicketPageAdmin from '../../components/admin/Modal/ModalTicket/ModalCreateTicketPageAdmin';
import ModalDeleteTicketPageAdmin from '../../components/admin/Modal/ModalTicket/ModalDeleteTicketPageAdmin';
import ModalEditTicketPageAdmin from '../../components/admin/Modal/ModalTicket/ModalEditTicketPageAdmin';

const TicketPage: React.FC = () => {
  const { tickets, loading, error, deleteTicket, getAllTickets } =
    useContext(TicketContext);
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
        Toastify(`Lỗi: ${errorMessage}`, 401);
      }
    }
  };

  if (loading) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Các Vé" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Vé"
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
        Title_TableListAdmin={`Danh Sách Vé (${tickets.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Loại Vé</span>
            <span>Phương Tiện</span>
            <span>Khoang(Toa)</span>
            <span>Chỗ Ngồi</span>
            <span>Điểm Khởi Hành</span>
            <span>Điểm Đến</span>
            <span>Thời gian đi</span>
            <span>Thời gian về</span>
            <span>Giá Vé</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {tickets.map((ticket: ITicket, index: number) => (
              <Table.Row key={ticket._id}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">
                  {ticket.ticket_catalog_id?.name}
                </span>
                <span>{ticket.seat_id?.seat_catalog_id?.vehicle_id?.name}</span>
                <span>{ticket.seat_id?.seat_catalog_id?.name}</span>
                <span>{ticket.seat_id?.name}</span>

                <span className="line-clamp-1">
                  {ticket.trip_id?.departure_point?.name}
                </span>
                <span className="line-clamp-1">
                  {ticket.trip_id?.destination_point?.name}
                </span>
                <span className="line-clamp-1">
                  {ticket.trip_id?.departure_time}-
                  {new Date(ticket.trip_id?.departure_date).toLocaleDateString(
                    'vi-VN'
                  )}
                </span>
                <span className="line-clamp-1">
                  {ticket.trip_id?.return_time}-
                  {new Date(ticket.trip_id?.return_date).toLocaleDateString(
                    'vi-VN'
                  )}
                </span>
                <span className="line-clamp-1">
                  {(ticket.price * 1000).toLocaleString('vi-VN')}&nbsp;VND
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

