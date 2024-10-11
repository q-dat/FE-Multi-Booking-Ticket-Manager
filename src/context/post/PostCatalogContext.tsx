import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

interface PostCatalog {
  _id: string;
  name: string;
  img?: string;
  createAt: Date;
  updateAt: Date;
}

interface PostCatalogContextType {
  postCatalogs: PostCatalog[];
  getAllPostCatalogs: () => Promise<void>;
  createPostCatalog: (data: Omit<PostCatalog, '_id' | 'createAt' | 'updateAt'>) => Promise<void>;
  updatePostCatalog: (id: string, data: Partial<PostCatalog>) => Promise<void>;
  deletePostCatalog: (id: string) => Promise<void>;
}

const PostCatalogContext = createContext<PostCatalogContextType | undefined>(undefined);

export const PostCatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [postCatalogs, setPostCatalogs] = useState<PostCatalog[]>([]);

  // Get all post catalogs
  const getAllPostCatalogs = async () => {
    try {
      const response = await axios.get('/api/cate-blogs/post-catalogs');
      setPostCatalogs(response.data.postCatalogs);
    } catch (error) {
      console.error('Error fetching post catalogs:', error);
    }
  };

  // Create post catalog
  const createPostCatalog = async (data: Omit<PostCatalog, '_id' | 'createAt' | 'updateAt'>) => {
    try {
      const response = await axios.post('/api/cate-blogs/post-catalogs', data);
      setPostCatalogs((prev) => [...prev, response.data.savedPostCatalog]);
    } catch (error) {
      console.error('Error creating post catalog:', error);
    }
  };

  // Update post catalog
  const updatePostCatalog = async (id: string, data: Partial<PostCatalog>) => {
    try {
      const response = await axios.put(`/api/cate-blogs/post-catalogs/${id}`, data);
      setPostCatalogs((prev) =>
        prev.map((catalog) => (catalog._id === id ? response.data.updatedPostCatalog : catalog))
      );
    } catch (error) {
      console.error('Error updating post catalog:', error);
    }
  };

  // Delete post catalog
  const deletePostCatalog = async (id: string) => {
    try {
      await axios.delete(`/api/cate-blogs/post-catalogs/${id}`);
      setPostCatalogs((prev) => prev.filter((catalog) => catalog._id !== id));
    } catch (error) {
      console.error('Error deleting post catalog:', error);
    }
  };

  useEffect(() => {
    getAllPostCatalogs();
  }, []);

  return (
    <PostCatalogContext.Provider
      value={{
        postCatalogs,
        getAllPostCatalogs,
        createPostCatalog,
        updatePostCatalog,
        deletePostCatalog,
      }}
    >
      {children}
    </PostCatalogContext.Provider>
  );
};

export const usePostCatalog = () => {
  const context = useContext(PostCatalogContext);
  if (context === undefined) {
    throw new Error('usePostCatalog must be used within a PostCatalogProvider');
  }
  return context;
};
