import React, { useContext, useState, useEffect } from 'react';
import { AgeContext } from '../../context/age/AgeContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { IAge } from '../../types/type/age/age';
import ModalDeleteAgePageAdmin from '../../components/admin/Modal/ModalAge/ModalDeleteAgePageAdmin';
import ModalEditAgePageAdmin from '../../components/admin/Modal/ModalAge/ModalEditAgePageAdmin';
import ModalCreateAgePageAdmin from '../../components/admin/Modal/ModalAge/ModalCreateAgePageAdmin';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';

const AgePage: React.FC = () => {
  const { ages, loading, error, deleteAge, getAllAges,searchAgesByName } =
    useContext(AgeContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedAgeId, setSelectedAgeId] = useState<string | null>(null);
  const [checkboxCategory, setCheckboxCategory] = useState<string | null>(null);


  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedAgeId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedAgeId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllAges();
  }, [getAllAges]);

  const navigate = useNavigate();
  const handleDeleteAge = async () => {
    if (selectedAgeId) {
      try {
        await deleteAge(selectedAgeId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá độ tuổi thành công', 201);
        getAllAges();
        navigate('/admin/age');
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá độ tuổi thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 401);
      }
    }
  };
  //
  const handleSearchByCategory = async (category: string) => {
    await searchAgesByName(category);}
    
  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Độ Tuổi" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Độ Tuổi"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
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
                    checked={checkboxCategory === 'Xe khách'}
                    onChange={() => {
                      setCheckboxCategory('Xe khách');
                      handleSearchByCategory('Xe khách');
                    }}
                  />
                  <span className="ml-2">Xe khách</span>
                </label>
              </div>
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
              </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Độ Tuổi (${ages.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Độ Tuổi</span>
            <span>Giá</span>
            <span>Mô Tả</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {ages.map((age: IAge, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{age?.name}</span>
                <span className="line-clamp-1">{age?.price}</span>
                <span className="line-clamp-1">{age?.des}</span>
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
                        onClick={() => openModalEditAdmin(age._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(age._id ?? '')}
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
      <ModalCreateAgePageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteAgePageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteAge}
      />
      <ModalEditAgePageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        ageId={selectedAgeId ?? ''}
      />
    </div>
  );
};

export default AgePage;
