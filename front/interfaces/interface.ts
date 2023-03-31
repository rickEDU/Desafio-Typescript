export interface IUserData{
    id: string;
    email: string;
    username: string;
}
export interface IUser{
    username: string;
    email: string;
    password: string;
}
export interface IApiResponse<T>{
    data: T;
    errors: Array<string>
}

export interface ILoginData{
    id: any;
}