import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, Select } from 'react-daisyui';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import axios from 'axios';
import { Post } from '../../../../types/post/post.type';
import { useNavigate } from 'react-router-dom';
import InputModal from '../../InputModal';

interface FormData {
  title: string;
  content: any;
  post_catalog_id: string;
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
  post: Post | null;
}

const ModalEditPost: React.FC<ModalEditPostProps> = ({
  isOpen,
  onClose,
  onUpdate,
  post
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const editorRef = useRef<EditorJS | null>(null);
  const [catalogs, setCatalogs] = useState<PostCatalog[]>([]);
  const navigate = useNavigate();

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
      return false;
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
      reset({
        title: post.title || '',
        post_catalog_id: post.post_catalog_id._id || '',
        img: post.img || ''
      });
    }
  }, [isOpen, post, reset]);

  useEffect(() => {
    if (isOpen && post && isValidJSON(post.content)) {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      const initializeEditor = () => {
        try {
          const data = JSON.parse(post.content);
          editorRef.current = new EditorJS({
            holder: 'editorjs',
            tools: {
              header: Header,
              list: List
            },
            data: data,
            onReady: () => {
              console.log('EditorJS is ready!');
            },
            onChange: async () => {
              const savedData = await editorRef.current?.save();
              console.log('EditorJS data changed:', savedData);
            }
          });
        } catch (error) {
          console.error('Failed to initialize EditorJS:', error);
        }
      };

      setTimeout(initializeEditor, 500);
    }

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
      const content =
        outputData && Object.keys(outputData).length > 0
          ? JSON.stringify(outputData)
          : '';

      const selectedCatalog = catalogs.find(
        catalog => catalog._id === data.post_catalog_id
      );

      const updatedPost: Omit<Post, '_id'> = {
        ...data,
        content,
        createAt: post?.createAt || new Date().toISOString(),
        post_catalog_id: selectedCatalog
          ? { _id: selectedCatalog._id, name: selectedCatalog.name }
          : { _id: '', name: '' }
      };

      await onUpdate(updatedPost);
      reset();
      onClose();
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving EditorJS data:', error);
    }
  };

  if (!post) {
    return null;
  }

  return (
    <Modal open={isOpen}>
      <Modal.Header>
        <h2 className="text-2xl font-bold">Sửa Bài Viết</h2>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề:
            </label>
            <InputModal
              placeholder={'ví dụ: địa điểm A'}
              type={'text'}
              {...register('title')}
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Nội dung:
            </label>
            <div
              id="editorjs"
              className="rounded-md border border-gray-300 p-2 text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Danh mục:
            </label>
            <Select
              {...register('post_catalog_id')}
              defaultValue={post?.post_catalog_id._id || ''}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {catalogs.map(catalog => (
                <option key={catalog._id} value={catalog._id}>
                  {catalog.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700">
              Hình ảnh:
            </label>
            <InputModal
              placeholder={'ví dụ: địa điểm A'}
              type={'text'}
              {...register('img')}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="submit"
              color="primary"
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Cập nhật
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Huỷ
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditPost;
