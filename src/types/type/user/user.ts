export interface IUser {
  _id: string;
  fullName: string;
  username: string;
  gender?: string;
  role?: string;
  bio?: string;
  profession?: string;
  profileImageUrl?: string;
}