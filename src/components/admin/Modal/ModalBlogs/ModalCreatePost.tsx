import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-daisyui';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

interface FormData {
  id: number;
  title: string;
  content: any;
  category: string;
  date?: string;
  img: string;
}

interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: FormData) => void;
}

const ModalCreatePost: React.FC<ModalCreatePostProps> = ({ isOpen, onClose, onCreate }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (isOpen) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isOpen]);

  const onSubmit = async (data: FormData) => {
    try {
      const outputData = await editorRef.current?.save();
      onCreate({ ...data, content: outputData });
      reset();
      onClose();
    } catch (error) {
      console.error('Error saving EditorJS data:', error);
    }
  };

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <h2 className="text-2xl font-bold">Thêm Bài Viết</h2>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Tiêu đề:</label>
            <input
              type="text"
              {...register("title", { required: true })}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Nội dung:</label>
            <div id="editorjs" className="border border-gray-300 rounded-md p-2" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Danh mục:</label>
            <input
              type="text"
              {...register("category", { required: true })}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Hình ảnh:</label>
            <input
              type="text"
              {...register("img", { required: true })}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="submit" color="primary" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Thêm
            </Button>
            <Button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
              Huỷ
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalCreatePost;
