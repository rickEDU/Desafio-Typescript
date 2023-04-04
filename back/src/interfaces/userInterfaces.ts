import { UUID } from "crypto";

export type ApiResponseData = IUser | ILoginData | null;

export interface IUserDataComplete {
  user_id: UUID;
  username: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id?: UUID;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  squad?: UUID;
  is_admin: boolean;
  is_leader: boolean;
}
export interface IUserRequest {
  id?: UUID;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  squad?: UUID;
  password?: string;
  is_admin?: boolean;
}
export interface IDecode<T> {
  user: T;
  iat: number;
}

export interface IUser {
  id?: UUID;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  squad?: UUID;
  is_admin: boolean;
}

export interface ILogin {
  id: UUID;
  username: string;
  squad: UUID;
  is_admin: boolean;
  password: string;
  leader: UUID;
}
export interface ILoginResponse {
  id: UUID;
  username: string;
  squad: UUID;
  is_admin: boolean;
  is_leader?: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T | null;
  error: any;
}

export interface ILoginData {
  id: UUID;
}
