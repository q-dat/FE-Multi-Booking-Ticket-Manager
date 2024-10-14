import React, { useContext, useState, useEffect } from 'react';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine, RiListSettingsLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import ModalDeleteSeatPageAdmin from '../../components/admin/Modal/ModalSeat/ModalDeleteSeatPageAdmin';
import ModalEditSeatPageAdmin from '../../components/admin/Modal/ModalSeat/ModalEditSeatPageAdmin';
import ModalCreateSeatPageAdmin from '../../components/admin/Modal/ModalSeat/ModalCreateSeatPageAdmin';
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
  const { seats, loading, error, deleteSeat, getAllSeats, searchSeatsByName } =
    useContext(SeatContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [checkboxCategory, setCheckboxCategory] = useState<string | null>(null);

  //
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
  //
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
        navigate('/admin/seat');
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá phương tiện thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 401);
      }
    }
  };
  const [fillter, setFillter] = useState<string[]>([
    'STT',
    'Tên',
    'Giá',
    'Số Ghế',
    'Danh Mục',
    'Trạng Thái',
    'Mô Tả',
    'Hành Động'
  ]);
  const list = [
    'STT',
    'Tên',
    'Giá',
    'Số Ghế',
    'Danh Mục',
    'Trạng Thái',
    'Mô Tả',
    'Hành Động'
  ];
  const replaceItem = (index: number, newValue: string) => {
    setFillter(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = newValue;
      return newItems;
    });
  };
  //
  const handleSearchByCategory = async (category: string) => {
    await searchSeatsByName(category);
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
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <div className="flex gap-4">
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
              </div>

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
                <div className="dropdown dropdown-hover relative flex h-12 w-[100px] flex-col items-center justify-center rounded-md bg-primary text-white">
                  <p className="flex flex-row items-center justify-center gap-1">
                    <RiListSettingsLine className="text-xl" />
                  </p>
                  <div className="dropdown-content absolute top-[100%] z-10 w-52 space-y-1 bg-slate-50 drop-shadow-md">
                    {list.map((items, index) => (
                      <div className="flex">
                        <label key={index} className="flex h-8 items-center">
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

                              console.log(items);
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
        Title_TableListAdmin={`Danh Sách Ghế Ngồi (${seats.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            {fillter[0] === 'STT' && <span>STT</span>}
            {fillter[1] === 'Tên' && <span>Tên</span>}
            {fillter[2] === 'Giá' && <span>Giá</span>}
            {fillter[3] === 'Số Ghế' && <span>Số Ghế</span>}
            {fillter[4] === 'Danh Mục' && <span>Danh Mục</span>}
            {fillter[5] === 'Trạng Thái' && <span>Trạng Thái</span>}
            {fillter[6] === 'Mô Tả' && <span>Mô Tả</span>}
            {fillter[7] === 'Hành Động' && <span>Hành Động</span>}
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {seats.map((seat: ISeat, index: number) => (
              <Table.Row key={index}>
                {fillter[0] === 'STT' ? (
                  <span className="line-clamp-1">#{index + 1}</span>
                ) : (
                  <></>
                )}
                {fillter[1] === 'Tên' ? (
                  <span className="line-clamp-1">{seat?.name}</span>
                ) : (
                  <></>
                )}
                {fillter[2] === 'Giá' ? (
                  <span className="line-clamp-1">{seat?.price}</span>
                ) : (
                  <></>
                )}
                {fillter[3] === 'Số Ghế' ? (
                  <span className="line-clamp-1">{seat?.ordinal_numbers}</span>
                ) : (
                  <></>
                )}
                {fillter[4] === 'Danh Mục' ? (
                  <span className="line-clamp-1">
                    {seat?.seat_catalog_id.name}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[5] === 'Trạng Thái' ? (
                  <span
                    className={`inline-block w-[140px] rounded-lg px-4 py-2 font-medium text-white ${
                      seat?.status === 'Còn chỗ'
                        ? 'border border-green-600 bg-[#a6e3d5] text-green-600'
                        : seat?.status === 'Đang bảo trì'
                          ? 'border border-yellow-600 bg-yellow-200 text-yellow-600'
                          : 'border border-red-700 bg-red-300 text-red-700'
                    }`}
                  >
                    {seat?.status}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[6] === 'Mô Tả' ? (
                  <span className="line-clamp-1">
                    {seat.des || 'Không có mô tả!'}
                  </span>
                ) : (
                  <></>
                )}
                {fillter[7] === 'Hành Động' ? (
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
                ) : (
                  <></>
                )}
              </Table.Row>
            ))}
          </Table.Body>
        }
      />
      <ModalCreateSeatPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteSeatPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteSeat}
      />
      <ModalEditSeatPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        seatId={selectedSeatId ?? ''}
      />
    </div>
  );
};

export default SeatPage;
