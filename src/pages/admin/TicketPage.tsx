import React, { useContext, useState, useEffect } from 'react';
import { TicketContext } from '../../context/ticket/TicketContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine, RiListSettingsLine } from 'react-icons/ri';
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
              {/* <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={checkboxCategory === 'Tàu'}
                    onChange={() => {
                      setCheckboxCategory('Tàu');
                      handleSearchByCategory('Tàu');
                    }}
                  />
                  <span className="ml-2">Tàu</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={checkboxCategory === 'Máy Bay'}
                    onChange={() => {
                      setCheckboxCategory('Máy Bay');
                      handleSearchByCategory('Máy Bay');
                    }}
                  />
                  <span className="ml-2">Máy Bay</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={checkboxCategory === 'Xe khách'}
                    onChange={() => {
                      setCheckboxCategory('Xe khách');
                      handleSearchByCategory('Xe khách');
                    }}
                  />
                  <span className="ml-2">Xe Khách</span>
                </label>
              </div> */}

              <div className="flex flex-row gap-2">
                <Button
                  color="primary"
                  onClick={openModalCreateAdmin}
                  className="w-[100px] text-sm font-light text-white"
                >
                  <div className="flex items-center space-x-1">
                    <RiAddBoxLine className="text-xl" />
                    <p>Thêm</p>
                  </div>
                </Button>

                {/*  */}
                <div className="dropdown dropdown-hover relative flex h-12 w-[100px] cursor-pointer flex-col items-center justify-center rounded-md bg-primary text-white">
                  <p className="flex flex-row items-center justify-center gap-1">
                    <RiListSettingsLine className="text-xl" />
                  </p>
                  <div className="dropdown-content absolute top-[100%] z-10 w-52 space-y-1 rounded-md bg-slate-50 p-2 shadow-headerMenu drop-shadow-md">
                    {list.map((items, index) => (
                      <div className="flex" key={index}>
                        <label className="flex h-8 cursor-pointer items-center">
                          <input
                            className="h-5 w-5 hover:text-red-400"
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
          <Table.Body className="text-center text-sm">
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
                    {ticket.seat_id?.seat_catalog_id?.vehicle_id?.name}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[3] === 'Khoang/Toa' ? (
                  <span>{ticket.seat_id?.seat_catalog_id?.name}</span>
                ) : (
                  <></>
                )}
                {fillter[4] === 'Chỗ Ngồi' ? (
                  <span>{ticket.seat_id?.name}</span>
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
                  <span className="line-clamp-1">
                    {ticket.trip_id?.departure_time}-
                    {new Date(
                      ticket.trip_id?.departure_date
                    ).toLocaleDateString('vi-VN')}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[8] === 'Thời Gian Về' ? (
                  <span className="line-clamp-1">
                    {ticket.trip_id?.return_time}-
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
