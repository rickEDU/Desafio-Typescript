import { UUID } from "crypto";

export type ApiResponseData = IUser | ILoginData | null;

export interface IUserDataComplete {
  user_id: string;
  username: string;
  email: string;
  password: string;
}

// export interface IUserData {
//   id: string;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   password:string;
//   squad?: string;
//   is_admin: boolean;
// }

export interface IUser {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  squad?: string;
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
  id: any;
}
