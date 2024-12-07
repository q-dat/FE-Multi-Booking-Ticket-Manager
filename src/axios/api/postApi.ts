import axios from '../../config/axiosConfig';
import { IPost } from '../../types/type/post/post';

// Get All Posts
export const getAllPostsApi = () => {
  return axios.get<{ posts: IPost[] }>('/api/posts');
};

// Get Post By ID
export const getPostByIdApi = (_id: string) => {
  return axios.get<{ post: IPost }>(`/api/posts/${_id}`);
};

// Create Post
export const createPostApi = (formData: FormData) => {
  return axios.post('/api/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update Post
export const updatePostApi = async (_id: string, postData: FormData) => {
  const response = await axios.put(`/api/posts/${_id}`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete Post
export const deletePostApi = (id: string) => {
  return axios.delete(`/api/posts/${id}`);
};
