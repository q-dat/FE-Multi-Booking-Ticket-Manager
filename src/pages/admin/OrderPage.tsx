import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../../context/order/OrderContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import ModalDeleteOrderPageAdmin from '../../components/admin/Modal/ModalOrder/ModalDeleteOrderPageAdmin';
import ModalEditOrderPageAdmin from '../../components/admin/Modal/ModalOrder/ModalEditOrderPageAdmin';
import { IOrder } from '../../types/type/order/order';

const OrderPage: React.FC = () => {
  const { orders, loading, error, deleteOrder, getAllOrders } =
    useContext(OrderContext);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const handleDeleteOrder = async () => {
    if (selectedOrderId) {
      try {
        await deleteOrder(selectedOrderId);
        Toastify('Bạn đã xoá đơn hàng thành công', 201);
        closeModalDeleteAdmin();
        getAllOrders();
      } catch {
        Toastify('Lỗi khi xoá đơn hàng', 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  const openModalEditAdmin = (order: IOrder) => {
    setSelectedOrderId(order._id);
    setIsModalEditOpen(true);
  };

  const closeModalEditAdmin = () => {
    setIsModalEditOpen(false);
    setSelectedOrderId(null);
  };

  const closeModalDeleteAdmin = () => {
    setIsModalDeleteOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Đơn Hàng" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Đơn Hàng"
          Btn_Create={null}
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Đơn Hàng (${orders.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Người Dùng</span>
            <span>Tổng Tiền</span>
            <span>Trạng Thái</span>
            <span>Ngày Đi</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center">
            {orders.map((order, index) => (
              <Table.Row key={order._id}>
                <span>#{index + 1}</span>
                <span>{order.userId.fullName}</span>
                <span>{order.totalPrice}</span>
                <span>{order.status}</span>
                <span>
                  {new Date(order.travelDate).toLocaleDateString('vi-VN')}
                </span>
                <span>
                  <details>
                    <summary className="inline cursor-pointer text-base text-warning">
                      <div className="flex items-center justify-center px-[55px] py-2">
                        <FaCircleInfo />
                      </div>
                    </summary>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        color="success"
                        onClick={() => openModalEditAdmin(order)}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare /> Cập nhật
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedOrderId(order._id);
                          setIsModalDeleteOpen(true);
                        }}
                        className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                      >
                        <MdDelete /> Xoá
                      </Button>
                    </div>
                  </details>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        }
      />

      <ModalEditOrderPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        orderId={selectedOrderId}
      />
      <ModalDeleteOrderPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        orderId={selectedOrderId}
        onDelete={handleDeleteOrder}
      />
    </div>
  );
};

export default OrderPage;
