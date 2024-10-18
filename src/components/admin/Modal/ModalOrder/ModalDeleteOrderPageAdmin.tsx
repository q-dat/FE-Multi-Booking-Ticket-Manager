import React from 'react';
import { Button } from 'react-daisyui';

interface ModalDeleteOrderPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
  onDelete: (id: string) => Promise<void>;
}

const ModalDeleteOrderPageAdmin: React.FC<ModalDeleteOrderPageAdminProps> = ({ isOpen, onClose, orderId, onDelete }) => {
  if (!isOpen || !orderId) return null;

  const handleDelete = async () => {
    await onDelete(orderId);
    onClose();
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div className="modal-content flex flex-col rounded-lg bg-white p-10 text-start shadow dark:bg-gray-800">
        <h2 className="text-xl font-bold">Xoá Đơn Hàng</h2>
        <p className="mt-4">Bạn có chắc chắn muốn xoá đơn hàng này?</p>
        <div className="mt-4 space-x-5 text-center">
          <Button onClick={onClose} className="border-gray-50 text-black">Huỷ bỏ</Button>
          <Button color="error" onClick={handleDelete} className="text-white">Xoá</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteOrderPageAdmin;
