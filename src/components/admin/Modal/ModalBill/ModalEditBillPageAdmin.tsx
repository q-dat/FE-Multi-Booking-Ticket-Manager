import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IBill } from '../../../../types/type/bill/bill';
import { BillContext } from '../../../../context/bill/BillContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';

interface ModalEditBillPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  billId: string | null;
}

const ModalEditBillPageAdmin: React.FC<ModalEditBillPageAdminProps> = ({ isOpen, onClose, billId }) => {
  const { getBillById, updateBill, bills } = useContext(BillContext);
  const { register, handleSubmit, reset, setValue } = useForm<IBill>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (billId) {
      const billData = bills.find(bill => bill._id === billId);
      if (billData) {
        setValue('amount', billData.amount);
        setValue('orderId', billData.orderId);
        setValue('paymentId', billData.paymentId);
        setValue('userId', billData.userId);
      } else {
        getBillById(billId);
      }
    }
  }, [billId, bills, getBillById, setValue]);

  const onSubmit: SubmitHandler<IBill> = async formData => {
    if (!billId) return;
    setLoading(true);
    try {
      await updateBill(billId, formData);
      Toastify('Cập nhật hóa đơn thành công!', 200);
      reset();
      onClose();
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi cập nhật hóa đơn!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
        <div className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800" onClick={e => e.stopPropagation()}>
          <p className="text-xl font-bold text-black dark:text-white">Chỉnh sửa hóa đơn</p>

          <div>
            <LabelForm title="Số tiền" />
            <input
              {...register('amount')}
              type="number"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Nhập số tiền"
            />
          </div>

          <div>
            <LabelForm title="Người dùng" />
            <input
              {...register('userId.fullName')}
              type="text"
              className="mt-1 p-2 border rounded w-full"
              placeholder="ID người dùng"
            />
          </div>

          <div>
            <LabelForm title="Đơn hàng" />
            <input
              {...register('orderId.totalPrice')}
              type="text"
              className="mt-1 p-2 border rounded w-full"
              placeholder="ID đơn hàng"
            />
          </div>


          <div>
            <LabelForm title="Phương thức thanh toán" />
            <input
              {...register('paymentId.method')}
              type="text"
              className="mt-1 p-2 border rounded w-full"
              placeholder="ID phương thức thanh toán"
            />
          </div>

          <div className="mt-4 space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">Huỷ bỏ</Button>
            <Button color="primary" type="submit" className="text-white" disabled={loading}>
              {loading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditBillPageAdmin;
