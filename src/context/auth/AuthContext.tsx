import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../../config/axiosConfig';
import {
  AuthContextType,
  RegisterData,
  UpdateUserProfileData,
  User
} from '../../types/auth/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Đăng nhập người dùng
  const login = async (username: string, password: string) => {
    const { data } = await axios.post('/api/auth/login', {
      username,
      password
    });

    setUser(data.user);
    setToken(data.token);

    // Lưu user và token vào localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  // Đăng ký người dùng mới
  const register = async (registerData: RegisterData) => {
    await axios.post('/api/auth/register', registerData);
  };

  // Đăng xuất người dùng
  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    setToken(null);

    // Xóa user và token khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Cập nhật hồ sơ người dùng
  const updateUserProfile = async (
    id: string,
    updateData: UpdateUserProfileData
  ) => {
    const { data } = await axios.put(`/api/users/${id}/profile`, updateData);

    setUser(data.user);

    // Cập nhật user trong localStorage
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  // Đổi mật khẩu
  const changePassword = async (
    id: string,
    oldPassword: string,
    newPassword: string
  ) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        updateUserProfile,
        changePassword,
        getAllUsers,
        getUserById
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
