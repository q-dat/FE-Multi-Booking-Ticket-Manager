import React, { useState, useEffect, useContext } from 'react';
import { Toastify } from '../../helper/Toastify';
import LoadingLocal from '../../components/orther/loading/LoadingLocal';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { RiAddBoxLine } from 'react-icons/ri';
import { Button, Table } from 'react-daisyui';
import { MdDelete } from 'react-icons/md';
import ErrorLoading from '../../components/orther/error/ErrorLoading';
import { FaCircleInfo, FaPenToSquare } from 'react-icons/fa6';
import TableListAdmin from '../../components/admin/TablelistAdmin';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import ModalCreatePostPageAdmin from '../../components/admin/Modal/ModalPost/ModalCreatePostPageAdmin';
import ModalDeletePostPageAdmin from '../../components/admin/Modal/ModalPost/ModalDeletePostPageAdmin';
import ModalEditPostPageAdmin from '../../components/admin/Modal/ModalPost/ModalEditPostPageAdmin';
import { IPost } from '../../types/type/post/post';
import { PostContext } from '../../context/post/PostContext';
import { isIErrorResponse } from '../../types/error/error';

const PostManagerPage: React.FC = () => {
  const { loading, posts, deletePost, getAllPosts, error } =
    useContext(PostContext);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const openModalCreateAdmin = () => setIsModalCreateOpen(true);
  const closeModalCreateAdmin = () => setIsModalCreateOpen(false);
  const openModalDeleteAdmin = (id: string) => {
    setSelectedPostId(id);
    setIsModalDeleteOpen(true);
  };
  const closeModalDeleteAdmin = () => setIsModalDeleteOpen(false);
  const openModalEditAdmin = (id: string) => {
    setSelectedPostId(id);
    setIsModalEditOpen(true);
  };
  const closeModalEditAdmin = () => setIsModalEditOpen(false);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleDeletePost = async () => {
    if (selectedPostId) {
      try {
        await deletePost(selectedPostId);
        closeModalDeleteAdmin();
        Toastify('Bạn đã xoá bài viết thành công', 201);
        getAllPosts();
      } catch (error) {
        const errorMessage = isIErrorResponse(error)
          ? error.data?.message
          : 'Xoá bài viết thất bại!';
        Toastify(`Lỗi: ${errorMessage}`, 500);
      }
    }
  };

  if (loading.getAll) return <LoadingLocal />;
  if (error) return <ErrorLoading />;

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Bài Viết" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin="Quản Lý Danh Sách Bài Viết"
          Btn_Create={
            <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-end">
              <Button
                color="primary"
                onClick={openModalCreateAdmin}
                className="w-[100px] text-sm font-light text-white"
              >
                <RiAddBoxLine className="text-xl" color="white" />
                Thêm
              </Button>
            </div>
          }
        />
      </div>

      <TableListAdmin
        Title_TableListAdmin={`Danh Sách Bài Viết (${posts.length})`}
        table_head={
          <Table.Head className="bg-primary text-center text-white">
            <span>STT</span>
            <span>Tiêu Đề</span>
            <span>Ảnh Đại Diện</span>
            <span>Danh Mục</span>
            <span>Ngày Tạo</span>
            {/* <span>Ngày Cập Nhật</span> */}
            <span>Nội dung</span>
            <span>Hành Động</span>
          </Table.Head>
        }
        table_body={
          <Table.Body className="text-center text-sm">
            {posts.map((post: IPost, index: number) => (
              <Table.Row key={index}>
                <span>#{index + 1}</span>
                <span className="line-clamp-2">{post?.title}</span>
                <span className="flex items-center justify-center">
                  <img
                    src={post?.imageUrl}
                    alt="Ảnh đại diện"
                    className="h-12 w-12 object-cover"
                  />
                </span>
                <span className="line-clamp-1">{post?.catalog}</span>
                {/* <span>{new Date(post?.createdAt).toLocaleString('vi-VN')}</span> */}
                <span>
                  {new Date(post?.updatedAt).toLocaleDateString('vi-VN')}
                </span>
                <span
                  className="line-clamp-2 max-w-[500px]"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></span>
                <span>
                  <details>
                    <summary className="inline cursor-pointer text-base text-warning">
                      <div className="flex items-center justify-center px-[55px] py-2">
                        <FaCircleInfo />
                      </div>
                    </summary>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Button
                        color="primary"
                        onClick={() => openModalEditAdmin(post?._id ?? '')}
                        className="w-full max-w-[140px] text-sm font-light text-white"
                      >
                        <FaPenToSquare />
                        Cập Nhật
                      </Button>
                      <Button
                        onClick={() => openModalDeleteAdmin(post?._id ?? '')}
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
      <ModalCreatePostPageAdmin
        isOpen={isModalCreateOpen}
        onClose={closeModalCreateAdmin}
      />
      <ModalDeletePostPageAdmin
        isOpen={isModalDeleteOpen}
        onClose={closeModalDeleteAdmin}
        onConfirm={handleDeletePost}
      />
      <ModalEditPostPageAdmin
        isOpen={isModalEditOpen}
        onClose={closeModalEditAdmin}
        postId={selectedPostId ?? ''}
      />
    </div>
  );
};

export default PostManagerPage;
