import React, { useState } from 'react';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import ModalCreatePost from '../../components/admin/Modal/ModalBlogs/ModalCreatePost';
import ModalDeletePost from '../../components/admin/Modal/ModalBlogs/ModalDeletePost';
import ModalEditPost from '../../components/admin/Modal/ModalBlogs/ModalEditPost';
import { MdDelete } from 'react-icons/md';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import { usePostContext } from '../../context/post/PostContext';
import { Post } from '../../types/post/post.type';
import TableListAdmin from '../../components/admin/TablelistAdmin';

const BlogPage: React.FC = () => {
  const { posts, createPost, updatePost, deletePost, fetchPosts } =
    usePostContext();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    modalSetter(true);
  };

  const closeModal = (
    modalSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    modalSetter(false);
  };

  const handleCreate = async (data: Omit<Post, '_id'>) => {
    await createPost(data);
    await fetchPosts();
    closeModal(setIsModalCreateOpen);
  };

  const handleEdit = async (data: Omit<Post, '_id'>) => {
    if (selectedPost) {
      await updatePost(selectedPost._id, data);
      await fetchPosts();
      closeModal(setIsModalEditOpen);
      setSelectedPost(null);
    }
  };

  const handleDelete = async () => {
    if (selectedPost) {
      await deletePost(selectedPost._id);
      await fetchPosts();
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
        <TableListAdmin
          Title_TableListAdmin={`Danh Sách Bài Viết (${posts.length})`}
          table_head={
            <Table.Head className="bg-primary text-center text-white">
              <span>STT</span>
              <span>Tiêu đề</span>
              <span>Ngày đăng</span>
              <span>Danh mục</span>
              <span>Hành động</span>
            </Table.Head>
          }
          table_body={
            <Table.Body className="text-center text-sm">
              {posts?.map((post, index) => (
                <Table.Row key={post._id}>
                  <span className="line-clamp-1">#{index + 1}</span>
                  <span className="line-clamp-1">{post.title}</span>
                  <span className="line-clamp-1">
                    {new Date(post.createAt).toLocaleDateString()}
                  </span>
                  <span className="line-clamp-1">
                    {post.post_catalog_id.name}
                  </span>
                  <span>
                    <details>
                      <summary className="inline cursor-pointer text-base text-warning">
                        <div className="flex items-center justify-center px-[55px] py-2">
                          <FaCircleInfo />
                        </div>
                      </summary>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Button
                          color="success"
                          onClick={() => {
                            setSelectedPost(post);
                            openModal(setIsModalEditOpen);
                          }}
                          className="w-full max-w-[140px] text-sm font-light text-white"
                        >
                          <FaPenToSquare />
                          Cập Nhật
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedPost(post);
                            openModal(setIsModalDeleteOpen);
                          }}
                          className="w-full max-w-[140px] bg-red-600 text-sm font-light text-white"
                        >
                          <MdDelete />
                          Xoá
                        </Button>
                      </div>
                    </details>
                  </span>
                </Table.Row>
              ))}
            </Table.Body>
          }
        />
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
