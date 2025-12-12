export interface LoginRequest {
  identifier: string;
  password: string;
  remember?: boolean;
}

export interface Permission {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface LoginResponse {
  jwt: string;
  user: User;
  permissions: Permission[];
  errorMessage: null;
  error: string | null;
  status: number;
}
export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  creatorName: string;
  updaterName: string;
  firstName: string;
  lastName: string;
  userName: string;
  status: boolean;
  isVerified: boolean;
  resetCode: null;
  email: string;
  phoneNumber: null;
  address: null;
  avatarUrl: null;
  identification: string;
  userPolicy: unknown[];
  config: null;
  lastLogin: Date;
  verified: boolean;
}
