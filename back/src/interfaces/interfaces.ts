export interface IUserDataComplete {
    user_id: string;
    username: string;
    email: string;
    password: string;
  }
  
  export interface IUserData {
    user_id: string;
    username: string;
    email: string;
  }
  
  export interface IUser {
    username: string;
    email: string;
    password: string;
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
    user_id: any;
  }
  