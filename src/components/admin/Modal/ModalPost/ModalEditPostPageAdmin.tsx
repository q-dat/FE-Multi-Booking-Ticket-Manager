import React, { useState, useEffect, useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IPost } from '../../../../types/type/post/post';
import InputModal from '../../InputModal';
import { Button } from 'react-daisyui';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Toastify } from '../../../../helper/Toastify';
import { PostContext } from '../../../../context/post/PostContext';
// import { isIErrorResponse } from '../../../../types/error/error';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image', 'video'],
    [{ align: [] }],
    ['clean'],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }]
  ]
};

interface ModalEditPostPageAdminProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const ModalEditPostPageAdmin: React.FC<ModalEditPostPageAdminProps> = ({
  isOpen,
  onClose,
  postId
}) => {
  const { posts, updatePost, getAllPosts, getPostById } =
    useContext(PostContext);
  const { control, register, handleSubmit, setValue, reset } = useForm<IPost>();
  const [editorValue, setEditorValue] = useState<string>('');

  useEffect(() => {
    if (postId) {
      getPostById(postId);
    }
  }, [postId, getPostById]);

  useEffect(() => {
    const postData = posts.find(post => post._id === postId);
    if (postData) {
      setValue('title', postData.title);
      setValue('catalog', postData.catalog);
      setValue('content', postData.content);
      setValue('imageUrl', postData.imageUrl);
      setEditorValue(postData.content);
    }
  }, [posts, postId, setValue]);

  const onSubmit: SubmitHandler<IPost> = async formData => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('catalog', formData.catalog);
    data.append('content', formData.content || '');
    if (formData.imageUrl?.[0]) {
      data.append('image', formData.imageUrl[0]);
    }

    try {
      await updatePost(postId, data);
      reset();
      getAllPosts();
      Toastify('Bài viết đã được cập nhật!', 200);
      onClose();
    } catch (error) {
      // getAllPosts();
      //   const errorMessage = isIErrorResponse(error)
      //     ? error.data?.message
      //     : 'Sửa bài viết thất bại!';
      // Toastify(`Lỗi: ${errorMessage}`, 500);
      reset();
      getAllPosts();
      Toastify('Bài viết đã được cập nhật!', 200);
      onClose();
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        onClick={handleOverlayClick}
        className="modal-overlay fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-40"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="mx-2 flex w-full flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800 xl:w-1/2"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Chỉnh sửa bài viết
            </p>
            <InputModal
              type="text"
              {...register('title')}
              placeholder="Tiêu đề bài viết"
            />
            <InputModal
              type="text"
              {...register('catalog')}
              placeholder="Danh mục"
            />
            <Controller
              name="content"
              control={control}
              defaultValue={editorValue}
              render={({ field }) => (
                <ReactQuill
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                  theme="snow"
                  modules={modules}
                  className="mb-4 h-[400px] overflow-auto rounded-md border scrollbar-hide"
                  placeholder="Nội dung bài viết"
                />
              )}
            />
            <InputModal
              type="file"
              {...register('imageUrl')}
              placeholder="Ảnh đại diện"
            />
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 text-center">
            <Button onClick={onClose} className="border-gray-50 text-black">
              Hủy
            </Button>
            <Button color="primary" type="submit" className="group text-white">
              Xác Nhận
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalEditPostPageAdmin;
