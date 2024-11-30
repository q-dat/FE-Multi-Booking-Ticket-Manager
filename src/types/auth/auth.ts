// types/auth/auth.ts
export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  role: 'admin' | 'user';
  isVerified: boolean;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  password: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  otpSent: boolean;
  isOtpVerified: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (registerData: RegisterData) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
}
