import React, { useState } from 'react';
import NavbarMobile from '../../components/admin/Reponsive/Mobile/NavbarMobile';
import NavtitleAdmin from '../../components/admin/NavtitleAdmin';
import { Button, Table } from 'react-daisyui';
import { RiAddBoxLine } from 'react-icons/ri';
import ModalCreatePost from '../../components/admin/Modal/ModalBlogs/ModalCreatePost.tsx';
import ModalDeletePost from '../../components/admin/Modal/ModalBlogs/ModalDeletePost.tsx';
import ModalEditPost from '../../components/admin/Modal/ModalBlogs/ModalEditPost.tsx';
import { MdDelete } from 'react-icons/md';
import { FaPenToSquare } from 'react-icons/fa6';

interface Post {
  id: number;
  title: string;
  content: any;
  category: string;
  date?: string;
  img: string;
}

const initialPosts: Post[] = [
  { id: 1, title: 'Bài viết A', date: '12-12-2024', category: 'Train', content: 'aaaa', img: 'a' },
  { id: 2, title: 'Bài viết B', date: '12-12-2024', category: 'Train', content: 'aaaa', img: 'a' },
  { id: 3, title: 'Bài viết C', date: '12-12-2024', category: 'Train', content: 'aaaa', img: 'a' },
];

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
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

  const handleCreate = (data: Omit<Post, 'id'>) => {
    const newPost = { ...data, id: posts.length + 1 }; // Tự động tạo ID mới
    setPosts([...posts, newPost]);
  };

  const handleEdit = (data: Omit<Post, 'id'>) => {
    if (selectedPost) {
      setPosts(posts.map(post => (post.id === selectedPost.id ? { ...post, ...data } : post)));
    }
  };

  const handleDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter(post => post.id !== selectedPost.id));
      setSelectedPost(null);
    }
  };

  return (
    <div className="w-full">
      <NavbarMobile Title_NavbarMobile="Blog" />
      <div className="px-2 xl:px-0">
        <NavtitleAdmin
          Title_NavtitleAdmin={'Quản lý Bài Viết'}
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
            {posts.map((post, index) => (
              <Table.Row key={post.id}>
                <span className="line-clamp-1">{index + 1}</span>
                <span className="line-clamp-1">{post.title}</span>
                <span className="line-clamp-1">{post.date}</span>
                <span className="line-clamp-1">{post.content}</span>
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
      <ModalCreatePost
        isOpen={isModalCreateOpen}
        onClose={() => closeModal(setIsModalCreateOpen)}
        onCreate={handleCreate}
      />
      <ModalEditPost
        isOpen={isModalEditOpen}
        onClose={() => closeModal(setIsModalEditOpen)}
        onEdit={handleEdit}
        defaultValues={
          selectedPost || {
            id: 0,
            title: '',
            content: '',
            img: '',
            category: '',
            date: ''
          }
        }
      />

      <ModalDeletePost
        isOpen={isModalDeleteOpen}
        onClose={() => closeModal(setIsModalDeleteOpen)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BlogPage;
