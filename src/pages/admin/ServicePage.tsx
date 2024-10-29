import React, { useContext, useState, useEffect } from 'react';
import { ServiceContext } from '../../context/service/ServiceContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { IService } from '../../types/type/service/service';
import ModalDeleteServicePageAdmin from '../../components/admin/Modal/ModalService/ModalDeleteServicePageAdmin';
import ModalEditServicePageAdmin from '../../components/admin/Modal/ModalService/ModalEditServicePageAdmin';
import ModalCreateServicePageAdmin from '../../components/admin/Modal/ModalService/ModalCreateSevicePageAdmin';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { isIErrorResponse } from '../../types/error/error';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { useNavigate } from 'react-router-dom';

const ServicePage: React.FC = () => {
  const { services, loading, error, deleteService, getAllServices } =
    useContext(ServiceContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedServiceId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedServiceId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const navigate = useNavigate();
  const handleDeleteService = async () => {
    if (selectedServiceId) {
      try {
        await deleteService(selectedServiceId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá dịch vụ thành công', 201);
        getAllServices();
        navigate('/admin/service');
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá dịch vụ thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Dịch Vụ" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Dịch Vụ"
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
        Title_TableListAdmin={`Danh Sách Dịch Vụ (${services.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Dịch Vụ</span>
            <span>Giá</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {services.map((service: IService, index: number) => (
              <Table.Row key={index}>
                <span className="line-clamp-1">#{index + 1}</span>
                <span className="line-clamp-1">{service?.name}</span>
                <span className="line-clamp-1">
                  {(service?.price * 1000).toLocaleString('vi-VN')}&nbsp;VND
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
                        onClick={() => openModalEditAdmin(service._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(service._id ?? '')}
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
      <ModalCreateServicePageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeleteServicePageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeleteService}
      />
      <ModalEditServicePageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        serviceId={selectedServiceId ?? ''}
      />
    </div>
  );
};

export default ServicePage;
