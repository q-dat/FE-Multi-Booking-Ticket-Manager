import React from 'react';
import { Button, Modal } from 'react-daisyui';
import { Post } from '../../../../types/post/post.type';

interface ModalDeletePostProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  post?: Post;
}

const ModalDeletePost: React.FC<ModalDeletePostProps> = ({ isOpen, onClose, onDelete, post }) => {
  if (!post) {
    return null;
  }

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <h2 className="text-2xl font-bold">Xóa Bài Viết</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn có chắc chắn muốn xóa bài viết: <strong>{post.title}</strong>?</p>
        <div>
          <Button color="primary" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={onDelete}>Xóa</Button>
          <Button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600" onClick={onClose}>Huỷ</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeletePost;
