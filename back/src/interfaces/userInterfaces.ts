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
  firstName: string;
  lastName: string;
  squad?: UUID;
  isAdmin: string;
}

export interface IUser {
  id?: UUID;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  squad?: UUID;
  isAdmin: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T | null;
  error: any;
}

export interface ILoginData {
  id: UUID;
}
