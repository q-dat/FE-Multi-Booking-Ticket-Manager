import React from 'react';
import { Button, Modal } from 'react-daisyui';

interface ModalDeletePostProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDeletePost: React.FC<ModalDeletePostProps> = ({
  isOpen,
  onClose,
  onDelete
}) => {
  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <h2 className="text-2xl font-bold">Xoá Bài Viết</h2>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <p className="text-lg text-gray-700">
          Bạn có chắc chắn muốn xoá bài viết này không?
        </p>
        <div className="flex justify-end space-x-4">
          <Button
            color="secondary"
            onClick={onDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Xoá
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Huỷ
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeletePost;
