import React, { useContext, useEffect, useState } from 'react';
import { PaymentContext } from '../../context/payment/PaymentContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { IPayment } from '../../types/type/payment/payment';
import ModalEditPaymentPageAdmin from '../../components/admin/Modal/ModalPayment/ModalEditPaymentPageAdmin';
import ModalDeletePaymentPageAdmin from '../../components/admin/Modal/ModalPayment/ModalDeletePaymentPageAdmin';

const PaymentPage: React.FC = () => {
  const { payments, loading, error, deletePayment, getAllPayments } =
    useContext(PaymentContext);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(
    null
  );

  useEffect(() => {
    getAllPayments();
  }, [getAllPayments]);

  const handleDeletePayment = async () => {
    if (selectedPaymentId) {
      try {
        await deletePayment(selectedPaymentId);
        Toastify('Bạn đã xoá thanh toán thành công', 201);
        closeModalDeletePayment();
        getAllPayments();
      } catch {
        Toastify('Lỗi khi xoá thanh toán', 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  const openModalEditPayment = (payment: IPayment) => {
    setSelectedPaymentId(payment._id);
    setIsModalEditOpen(true);
  };

  const closeModalEditPayment = () => {
    setIsModalEditOpen(false);
    setSelectedPaymentId(null);
  };

  const closeModalDeletePayment = () => {
    setIsModalDeleteOpen(false);
    setSelectedPaymentId(null);
  };

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Thanh Toán" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Thanh Toán"
          Btn_Create={null}
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Thanh Toán (${payments.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Người Dùng</span>
            <span>Số Tiền</span>
            <span>Trạng Thái</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center">
            {payments.map((payment, index) => (
              <Table.Row key={payment._id}>
                <span>#{index + 1}</span>
                <span>{payment.userId.fullName}</span>
                <span>{payment.amount}</span>
                <span>{payment.status}</span>
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
                        onClick={() => openModalEditPayment(payment)}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare /> Cập nhật
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedPaymentId(payment._id);
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

      <ModalEditPaymentPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditPayment}
        paymentId={selectedPaymentId}
      />
      <ModalDeletePaymentPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeletePayment}
        paymentId={selectedPaymentId}
        onDelete={handleDeletePayment}
      />
    </div>
  );
};

export default PaymentPage;
