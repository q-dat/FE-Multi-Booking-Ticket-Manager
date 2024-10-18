import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IPayment, PaymentStatus } from '../../../../types/type/payment/payment';
import { PaymentContext } from '../../../../context/payment/PaymentContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';

interface ModalEditPaymentPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string | null;
}

const ModalEditPaymentPageAdmin: React.FC<ModalEditPaymentPageAdminProps> = ({ isOpen, onClose, paymentId }) => {
  const { getPaymentById, updatePaymentStatus, payments } = useContext(PaymentContext);
  const { register, handleSubmit, reset, setValue } = useForm<IPayment>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paymentId) {
      const paymentData = payments.find(payment => payment._id === paymentId);
      if (paymentData) {
        setValue('status', paymentData.status);
      } else {
        getPaymentById(paymentId);
      }
    }
  }, [paymentId, payments, getPaymentById, setValue]);

  const onSubmit: SubmitHandler<IPayment> = async formData => {
    setLoading(true);
    try {
      await updatePaymentStatus(paymentId!, formData.status as PaymentStatus);
      Toastify('Cập nhật trạng thái thanh toán thành công!', 200);
      reset();
      onClose();
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi cập nhật trạng thái thanh toán!';
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
          <p className="text-xl font-bold text-black dark:text-white">Chỉnh sửa trạng thái thanh toán</p>
          <div>
            <LabelForm title="Trạng Thái Thanh Toán" />
            <select {...register('status')} className="mt-1 p-2 border rounded">
              {Object.values(PaymentStatus).map(status => (
                <option className='' key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
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

export default ModalEditPaymentPageAdmin;
