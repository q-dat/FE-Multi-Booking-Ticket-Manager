import React, { useContext, useState, useEffect } from 'react';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import ModalDeleteLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalDeleteLocationPageAdmin';
import ModalEditLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalEditLocationPageAdmin';
import ModalCreateLocationPageAdmin from '../../components/admin/Modal/ModalLocation/ModalCreateLocationPageAdmin';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';
import { SeatContext } from '../../context/seat/SeatContext';
import { ISeat } from '../../types/type/seat/seat';

const SeatPage: React.FC = () => {
    console.log('Seats rendering');
    const { seats, loading, error, deleteSeat, getAllSeats } =
      useContext(SeatContext);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedSeatId, setSelectedSeatId] = useState<string | null>(
      null
    );
    const openModalCreateAdmin = () => setIsModalCreateOpen(true);
    const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
    const openModalDeleteAdmin = (id: string) => {
        setSelectedSeatId(id);
      setIsModalDeleteOpen(true);
    };
    const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
    const openModalEditAdmin = (id: string) => {
        setSelectedSeatId(id);
      setIsModalEditOpen(true);
    };
    const closeModalEditAdmin = () => setIsModalEditOpen(false);
  
    useEffect(() => {
      getAllSeats();
    }, [getAllSeats]);
  
    const navigate = useNavigate();
    const handleDeleteSeat = async () => {
      if (selectedSeatId) {
        try {
          await deleteSeat(selectedSeatId);
          closeModalDeleteAdmin();
          Toastify('Bạn đã xoá phương tiện thành công', 201);
          getAllSeats();
          navigate('/admin/vehicle');
        } catch (error) {
          const errorMessage = isIErrorResponse(error)
            ? error.data?.message
            : 'Xoá phương tiện thất bại!';
          Toastify(`Lỗi: ${errorMessage}`, 401);
        }
      }
    };
  
    if (loading.getAll) return <LoadingLocal />;
    if (error) return <ErrorLoading />;
  
  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Ghế Ngồi" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Ghế Ngồi"
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
        Title_TableListAdmin={`Danh Sách Ghế Ngồi (${seats.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Ghế Ngồi</span>
            <span>Giá</span>
            <span>Mô Tả</span>
            <span>Trạng Thái</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {seats.map((seat: ISeat, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{seat?.name}</span>
                <span className="line-clamp-1">{seat?.name}</span>
                <span className="line-clamp-1">{seat?.name}</span>
                <span className="line-clamp-1">{seat?.name}</span>
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
                        onClick={() => openModalEditAdmin(seat._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(seat._id ?? '')}
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
      <ModalCreateLocationPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteLocationPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteSeat}
      />
      <ModalEditLocationPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        locationId={selectedSeatId ?? ''}
      />
    </div>
  )
}

export default SeatPage;
