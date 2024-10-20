import React, { useContext, useEffect, useState } from 'react';
import { BillContext } from '../../context/bill/BillContext';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import { IBill } from '../../types/type/bill/bill';
import ModalEditBillPageAdmin from '../../components/admin/Modal/ModalBill/ModalEditBillPageAdmin';
import ModalDeleteBillPageAdmin from '../../components/admin/Modal/ModalBill/ModalDeleteBillPageAdmin';

const BillPage: React.FC = () => {
  const { bills, loading, error, deleteBill, getAllBills } =
    useContext(BillContext);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);

  useEffect(() => {
    getAllBills();
  }, [getAllBills]);

  const handleDeleteBill = async () => {
    if (selectedBillId) {
      try {
        await deleteBill(selectedBillId);
        Toastify('Bạn đã xoá hóa đơn thành công', 201);
        closeModalDeleteBill();
        getAllBills();
      } catch {
        Toastify('Lỗi khi xoá hóa đơn', 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  const openModalEditBill = (bill: IBill) => {
    setSelectedBillId(bill._id);
    setIsModalEditOpen(true);
  };

  const closeModalEditBill = () => {
    setIsModalEditOpen(false);
    setSelectedBillId(null);
  };

  const closeModalDeleteBill = () => {
    setIsModalDeleteOpen(false);
    setSelectedBillId(null);
  };

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Hóa Đơn" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Hóa Đơn"
          Btn_Create={null}
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Hóa Đơn (${bills.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tên Người Dùng</span>
            <span>Tổng Tiền</span>
            <span>PTTT</span>
            <span>Ngày Lập Hoá Đơn</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center">
            {bills.map((bill, index) => (
              <Table.Row key={bill._id}>
                <span>#{index + 1}</span>
                <span>{bill.userId.fullName}</span>
                <span>{bill.amount}</span>
                <span>{bill.paymentId.method}</span>
                <span>
                  {new Date(bill.billingDate).toLocaleDateString('vi-VN')}
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
                        onClick={() => openModalEditBill(bill)}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare /> Cập nhật
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedBillId(bill._id);
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

      <ModalEditBillPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditBill}
        billId={selectedBillId}
      />
      <ModalDeleteBillPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteBill}
        billId={selectedBillId}
        onDelete={handleDeleteBill}
      />
    </div>
  );
};

export default BillPage;
