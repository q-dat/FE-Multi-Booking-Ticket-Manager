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

interface ModalEditPostProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: Omit<Post, '_id'>) => Promise<void>;
  post: Post | null; // Có thể là null nếu không có post
}

const ModalEditPost: React.FC<ModalEditPostProps> = ({ isOpen, onClose, onUpdate, post }) => {
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

  const isValidJSON = (str: string) => {
    if (!str || typeof str !== 'string') {
      return false; // Trả về false nếu chuỗi không hợp lệ
    }

    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (isOpen && post) {
      // Hủy EditorJS trước khi khởi tạo lại
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      // Chờ DOM hoàn tất render trước khi khởi tạo EditorJS
      setTimeout(() => {
        const editorElement = document.getElementById('editorjs');
        console.log('EditorJS element:', editorElement); // Kiểm tra xem element có tồn tại không

        if (editorElement && isValidJSON(post.content)) {
          editorRef.current = new EditorJS({
            holder: 'editorjs',
            tools: {
              header: Header,
              list: List,
            },
            data: JSON.parse(post.content),
            onReady: () => {
              console.log('EditorJS is ready!');
            },
            onChange: async () => {
              const savedData = await editorRef.current?.save();
              console.log('EditorJS data changed:', savedData);
            },
          });
        } else {
          console.error('Invalid JSON content or editor element is missing.');
        }
      }, 100);
    }

    // Cleanup EditorJS khi modal đóng
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isOpen, post]);



  const onSubmit = async (data: FormData) => {
    try {
      const outputData = await editorRef.current?.save();
      const content = outputData && Object.keys(outputData).length > 0
        ? JSON.stringify(outputData)
        : '';

      const updatedPost: Omit<Post, '_id'> = {
        ...data,
        content,
        createAt: post?.createAt || new Date().toISOString(),
      };

      await onUpdate(updatedPost);
      reset(); // Chỉ reset form sau khi submit thành công
      onClose(); // Đóng modal sau khi xử lý thành công
    } catch (error) {
      console.error('Error saving EditorJS data:', error);
    }
  };



  if (!post) {
    return null; // Không hiển thị modal nếu không có post
  }

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <h2 className="text-2xl font-bold">Sửa Bài Viết</h2>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Tiêu đề:</label>
            <input
              type="text"
              defaultValue={post.title}
              {...register("title", { required: true })}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Nội dung:</label>
            <div id="editorjs" className="border border-gray-300 rounded-md p-2 text-black" />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-lg font-semibold">Danh mục:</label>
            <select
              {...register("post_catalog_id", { required: true })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={post.post_catalog_id._id} // Set default value to the current catalog
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
              defaultValue={post.img}
              {...register("img", { required: true })}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="submit" color="primary" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Cập nhật
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

export default ModalEditPost;
