export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  verified: boolean;
  likedProperties: any[];
  location: string;
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};