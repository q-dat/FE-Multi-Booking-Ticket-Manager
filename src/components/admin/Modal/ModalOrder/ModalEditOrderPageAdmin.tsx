import React, { useEffect, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IOrder, OrderStatus } from '../../../../types/type/order/order';
import { OrderContext } from '../../../../context/order/OrderContext';
import { Toastify } from '../../../../helper/Toastify';
import { isIErrorResponse } from '../../../../types/error/error';
import { Button } from 'react-daisyui';
import LabelForm from '../../LabelForm';

interface ModalEditOrderPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

const ModalEditOrderPageAdmin: React.FC<ModalEditOrderPageAdminProps> = ({
  isOpen,
  onClose,
  orderId
}) => {
  const { getOrderById, updateOrderStatus, orders } = useContext(OrderContext);
  const { register, handleSubmit, reset, setValue } = useForm<IOrder>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      const orderData = orders.find(order => order._id === orderId);
      if (orderData) {
        setValue('status', orderData.status);
      } else {
        getOrderById(orderId);
      }
    }
  }, [orderId, orders, getOrderById, setValue]);

  const onSubmit: SubmitHandler<IOrder> = async formData => {
    setLoading(true);
    try {
      await updateOrderStatus(orderId!, formData.status as OrderStatus);
      Toastify('Cập nhật đơn hàng thành công!', 200);
      reset();
      onClose();
    } catch (error) {
      const errorMessage = isIErrorResponse(error)
        ? error.data?.message
        : 'Lỗi khi cập nhật đơn hàng!';
      Toastify(`Lỗi: ${errorMessage}`, 500);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
        onClick={onClose}
      >
        <div
          className="flex flex-col space-y-10 rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800"
          onClick={e => e.stopPropagation()}
        >
          <p className="text-xl font-bold text-black dark:text-white">
            Chỉnh sửa đơn hàng
          </p>
          <div>
            <LabelForm title="Trạng Thái Đơn Hàng" />
            <select {...register('status')} className="mt-1 rounded border p-2">
              {Object.values(OrderStatus).map(status => (
                <option className="" key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Huỷ bỏ
            </Button>
            <Button
              color="primary"
              type="submit"
              className="text-white"
              disabled={loading}
            >
              {loading ? 'Đang cập nhật...' : 'Xác nhận'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditOrderPageAdmin;
