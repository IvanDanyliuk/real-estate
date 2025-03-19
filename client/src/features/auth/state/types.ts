export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location?: string;
  profilePhoto?: string;
};

export interface LoginData {
  email: string;
  password: string;
};