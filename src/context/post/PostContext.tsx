import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import axios from '../../config/axiosConfig';
import { Post } from '../../types/post/post.type';

interface PostContextType {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  createPost: (newPost: Omit<Post, '_id'>) => Promise<void>;
  updatePost: (id: string, updatedPost: Omit<Post, '_id'>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

// Hook sử dụng context
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};

export const PostProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/blogs/posts');
      setPosts(response.data.post);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message, error.config);
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  const createPost = async (newPost: Omit<Post, '_id'>) => {
    try {
      const response = await axios.post('/api/blogs/posts', newPost);
      setPosts(prev => [...prev, response.data.savedPost]);
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
    }
  };

  const updatePost = async (id: string, updatedPost: Omit<Post, '_id'>) => {
    try {
      const response = await axios.put(`/api/blogs/posts/${id}`, updatedPost);
      setPosts(prev =>
        prev.map(post => (post._id === id ? response.data.updatedPost : post))
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật bài viết:', error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`/api/blogs/posts/${id}`);
      setPosts(prev => prev.filter(post => post._id !== id));
    } catch (error) {
      console.error('Lỗi khi xoá bài viết:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, fetchPosts, createPost, updatePost, deletePost }}
    >
      {children}
    </PostContext.Provider>
  );
};
