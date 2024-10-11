import React, { useState } from 'react';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import ModalCreatePost from '../../components/admin/Modal/ModalBlogs/ModalCreatePost';
import ModalDeletePost from '../../components/admin/Modal/ModalBlogs/ModalDeletePost';
import ModalEditPost from '../../components/admin/Modal/ModalBlogs/ModalEditPost';
import { MdDelete } from 'react-icons/md';
import { FaPenToSquare } from 'react-icons/fa6';
import { usePostContext } from '../../context/post/PostContext';
import { Post } from '../../types/post/post.type';

const BlogPage: React.FC = () => {
  const { posts, createPost, updatePost, deletePost } = usePostContext();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    modalSetter(true);
  };

  const closeModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    modalSetter(false);
  };

  const handleCreate = async (data: Omit<Post, '_id'>) => {
    await createPost(data);
    closeModal(setIsModalCreateOpen);
  };

  const handleEdit = async (data: Omit<Post, '_id'>) => {
    if (selectedPost) {
      await updatePost(selectedPost._id, data);
      closeModal(setIsModalEditOpen);
      setSelectedPost(null);
    }
  };

  const handleDelete = async () => {
    if (selectedPost) {
      await deletePost(selectedPost._id);
      setSelectedPost(null);
      closeModal(setIsModalDeleteOpen);
    }
  };

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Blog" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản lý Bài Viết"
          Btn_Create={
            <Button
              color="primary"
              onClick={() => openModal(setIsModalCreateOpen)}
              className="text-sm font-light text-white"
            >
              <div className="flex items-center space-x-1">
                <RiAddBoxLine className="text-xl" />
                <p> Thêm Bài Viết</p>
              </div>
            </Button>
          }
        />
      </div>
      <div>
        <Table>
          <Table.Head className="bg-primary text-center text-white">
            <span>NO.</span>
            <span>Tiêu đề</span>
            <span>Ngày đăng</span>
            <span>Danh mục</span>
            <span>Thao tác</span>
          </Table.Head>
          <Table.Body className="text-center text-sm">
            {posts?.map((post, index) => (
              <Table.Row key={post._id}>
                <span className="line-clamp-1">{index + 1}</span>
                <span className="line-clamp-1">{post.title}</span>
                <span className="line-clamp-1">{new Date(post.createAt).toLocaleDateString()}</span>
                <span className="line-clamp-1">{post.post_catalog_id.name}</span>
                <span className="space-x-3">
                  <Button
                    color="info"
                    onClick={() => {
                      setSelectedPost(post);
                      openModal(setIsModalEditOpen);
                    }}
                  >
                    <FaPenToSquare />
                  </Button>
                  <Button
                    color="error"
                    onClick={() => {
                      setSelectedPost(post);
                      openModal(setIsModalDeleteOpen);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Modals */}
      <ModalCreatePost
        isOpen={isModalCreateOpen}
        onClose={() => closeModal(setIsModalCreateOpen)}
        onCreate={handleCreate}
      />
      <ModalEditPost
        isOpen={isModalEditOpen}
        onClose={() => closeModal(setIsModalEditOpen)}
        onUpdate={handleEdit}
        post={selectedPost!}
      />
      <ModalDeletePost
        isOpen={isModalDeleteOpen}
        onClose={() => closeModal(setIsModalDeleteOpen)}
        onDelete={handleDelete}
        post={selectedPost!}
      />
    </div>
  );
};

export default BlogPage;
