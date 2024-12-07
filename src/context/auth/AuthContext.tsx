// auth.ts (context)
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../../config/axiosConfig'; // Assuming axios is configured
import { AuthContextType, RegisterData, User } from '../../types/auth/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        username,
        email: username,
        password
      });
      setUser(data.user);
      setToken(data.token);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      await axios.post('/api/auth/register', registerData);
      setOtpSent(true);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const { data } = await axios.post('/api/auth/verify-otp', { email, otp });
      if (data.message === 'Xác thực OTP thành công!') {
        setIsOtpVerified(true);
      } else {
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setIsOtpVerified(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      setToken(null);

      // Clear user and token from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        otpSent,
        isOtpVerified,
        login,
        logout,
        register,
        verifyOtp
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
