import React, { useContext } from 'react';
import { Button } from 'react-daisyui';
import { useForm, SubmitHandler } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IPost } from '../../../../types/type/post/post';
import { Toastify } from '../../../../helper/Toastify';
import InputModal from '../../InputModal';
import { PostContext } from '../../../../context/post/PostContext';

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

interface ModalCreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePostPageAdmin: React.FC<ModalCreatePostProps> = ({
  isOpen,
  onClose
}) => {
  const { createPost, getAllPosts } = useContext(PostContext);
  const { register, handleSubmit, reset } = useForm<IPost>();
  const [editorValue, setEditorValue] = React.useState<string>('');

  //
  const onSubmit: SubmitHandler<IPost> = async formData => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('catalog', formData.catalog);
    data.append('content', editorValue);
    if (formData.imageUrl) {
      data.append('image', formData.imageUrl[0]);
    }

    try {
      await createPost(data);
      reset();
      getAllPosts();
      Toastify('Tạo bài viết thành công!', 201);
      onClose();
    } catch (err) {
      Toastify(`Lỗi khi tạo bài viết`, 500);
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
          className="mx-2 flex w-full xl:w-1/2 flex-col rounded-lg bg-white p-5 text-start shadow dark:bg-gray-800"
        >
          <div>
            <p className="font-bold text-black dark:text-white">
              Tạo bài viết mới
            </p>
            <InputModal
              type="text"
              {...register('title', { required: true })}
              placeholder="Tiêu đề bài viết"
            />
              <InputModal
              type="text"
              {...register('catalog', { required: true })}
              placeholder="Danh mục"
            />
            <ReactQuill
              value={editorValue}
              onChange={setEditorValue}
              theme="snow"
              modules={modules}
              className="mb-4 h-[400px] overflow-auto rounded-md border scrollbar-hide"
              placeholder="Nội dung bài viết"
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

export default ModalCreatePostPageAdmin;

