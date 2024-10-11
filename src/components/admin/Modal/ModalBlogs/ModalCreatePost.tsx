import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from 'react-daisyui';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import axios from 'axios';
import { Post } from '../../../../types/post/post.type';

interface FormData {
  title: string;
  content: any;
  post_catalog_id: {
    _id: string;
    name: string;
  };
  img: string;
}

interface PostCatalog {
  _id: string;
  name: string;
}

interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: Omit<Post, '_id'>) => Promise<void>;
}

const ModalCreatePost: React.FC<ModalCreatePostProps> = ({ isOpen, onClose, onCreate }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const editorRef = useRef<EditorJS | null>(null);
  const [catalogs, setCatalogs] = useState<PostCatalog[]>([]);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get('/api/cate-blogs/post-catalogs');
        setCatalogs(response.data.postCatalogs);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      }
    };

    fetchCatalogs();
  }, []);

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
      const content = outputData ? JSON.stringify(outputData) : '';

      const newPost: Omit<Post, '_id'> = {
        ...data,
        content,
        createAt: new Date().toISOString(),
      };

      await onCreate(newPost);
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
            <select
              {...register("post_catalog_id", { required: true })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Chọn danh mục</option>
              {catalogs.map((catalog) => (
                <option key={catalog._id} value={catalog._id}>
                  {catalog.name}
                </option>
              ))}
            </select>
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
