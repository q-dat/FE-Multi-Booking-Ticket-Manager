import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../config/axiosConfig';

interface User {
  _id: string;
  fullName: string;
  username: string;
  gender?: string;
  role?: string;
  bio?: string;
  profession?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateUserProfile: (id: string, data: UpdateUserProfileData) => Promise<void>;
  changePassword: (id: string, oldPassword: string, newPassword: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User>;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  gender: string;
  profileImage?: File | null;
}

interface UpdateUserProfileData {
  username: string;
  email: string;
  phone: string;
  fullName: string;
  gender: string;
  profileImage?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data from the backend if authenticated
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/users');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUser();
  }, []);

  // Đăng nhập người dùng
  const login = async (username: string, password: string) => {
    const { data } = await axios.post('/api/auth/login', { username, password });
    setUser(data.user);
  };

  // Đăng ký người dùng mới
  const register = async (registerData: RegisterData) => {
    await axios.post('/api/auth/register', registerData);
  };

  // Đăng xuất người dùng
  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
  };

  // Cập nhật hồ sơ người dùng
  const updateUserProfile = async (id: string, updateData: UpdateUserProfileData) => {
    const { data } = await axios.put(`/api/users/${id}/profile`, updateData);
    setUser(data.user);
  };

  // Đổi mật khẩu
  const changePassword = async (id: string, oldPassword: string, newPassword: string) => {
    await axios.put(`/api/users/${id}/password`, { oldPassword, newPassword });
  };

  // Lấy danh sách tất cả người dùng
  const getAllUsers = async (): Promise<User[]> => {
    const { data } = await axios.get('/api/users');
    return data.users;
  };

  // Lấy thông tin người dùng theo ID
  const getUserById = async (id: string): Promise<User> => {
    const { data } = await axios.get(`/api/users/${id}`);
    return data.user;
  };

  // Lấy dữ liệu thì lấy dưới này qua phía trang cần dùng
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUserProfile,
        changePassword,
        getAllUsers,
        getUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
