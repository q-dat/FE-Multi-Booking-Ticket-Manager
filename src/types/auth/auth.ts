export interface User {
  _id: string;
  fullName: string;
  username: string;
  gender?: string;
  role?: string;
  bio?: string;
  profession?: string;
  profileImageUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  updateUserProfile: (id: string, data: UpdateUserProfileData) => Promise<void>;
  changePassword: (id: string, oldPassword: string, newPassword: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User>;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
  fullName: string;
  gender: string;
  profileImage?: File | null;
  profileImageUrl?: string;
}

export interface UpdateUserProfileData {
  username: string;
  email: string;
  phone: string;
  fullName: string;
  gender: string;
  profileImage?: File | null;
  profileImageUrl?: string;
}
