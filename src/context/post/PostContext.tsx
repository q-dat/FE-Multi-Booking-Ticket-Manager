import {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useEffect
} from 'react';
import {
  getAllPostsApi,
  createPostApi,
  updatePostApi,
  deletePostApi
} from '../../axios/api/postApi';
import { IPost } from '../../types/type/post/post';
import { AxiosResponse } from 'axios';

interface PostContextType {
  posts: IPost[];
  loading: {
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
  error: string | null;
  getAllPosts: () => void;
  getPostById: (_id: string) => IPost | undefined;
  createPost: (post: FormData) => Promise<AxiosResponse<any>>;
  updatePost: (id: string, post: FormData) => Promise<AxiosResponse<any>>;
  deletePost: (id: string) => Promise<AxiosResponse<any>>;
}

const defaultContextValue: PostContextType = {
  posts: [],
  loading: {
    getAll: false,
    create: false,
    update: false,
    delete: false
  },
  error: null,
  getAllPosts: () => {},
  getPostById: () => undefined,
  createPost: async () => ({ data: { post: null } }) as AxiosResponse,
  updatePost: async () => ({ data: { post: null } }) as AxiosResponse,
  deletePost: async () => ({ data: { deleted: true } }) as AxiosResponse
};

export const PostContext = createContext<PostContextType>(defaultContextValue);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<{
    getAll: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>({
    getAll: false,
    create: false,
    update: false,
    delete: false
  });
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    setError(err.response?.data?.message || 'Lỗi cục bộ!');
  };

  const fetchData = async (
    apiCall: () => Promise<AxiosResponse<any>>,
    onSuccess: (data: any) => void,
    requestType: keyof typeof loading
  ): Promise<AxiosResponse<any>> => {
    setLoading(prev => ({ ...prev, [requestType]: true }));
    setError(null);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      return response;
    } catch (err: any) {
      handleError(err);
      throw err;
    } finally {
      setLoading(prev => ({ ...prev, [requestType]: false }));
    }
  };

  // Get All
  const getAllPosts = useCallback(() => {
    fetchData(getAllPostsApi, data => setPosts(data.posts || []), 'getAll');
  }, []);

  // Get By Id
  const getPostById = useCallback(
    (id: string) => {
      return posts.find(post => post._id === id);
    },
    [posts]
  );

  // Create
  const createPost = useCallback(
    async (post: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => createPostApi(post),
        data => {
          if (data.post) {
            setPosts(prevPosts => [...prevPosts, data.post]);
          }
        },
        'create'
      );
    },
    []
  );

  // Update
  const updatePost = useCallback(
    async (id: string, post: FormData): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => updatePostApi(id, post),
        data => {
          if (data.post) {
            setPosts(prevPosts =>
              prevPosts.map(existingPost =>
                existingPost._id === id ? data.post : existingPost
              )
            );
          }
        },
        'update'
      );
    },
    []
  );

  // Delete
  const deletePost = useCallback(
    async (id: string): Promise<AxiosResponse<any>> => {
      return await fetchData(
        () => deletePostApi(id),
        () => setPosts(prevPosts => prevPosts.filter(post => post._id !== id)),
        'delete'
      );
    },
    []
  );

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        getAllPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
