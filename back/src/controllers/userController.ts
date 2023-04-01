import {AccountsService, LoginService} from "../services/userService.js";
import { Response, Request } from "express";
import { NameValidator, EmailValidator, PasswordValidator } from "../middlewares/validators.js";
import {
    ApiResponseData,
    IUser,
    ApiResponse,
    ILoginData,
    ILogin,
  } from "../interfaces/userInterfaces.js";
import jwt from 'jsonwebtoken'

const TAG = "users controller";

const accountsService = new AccountsService();
const loginService = new LoginService();

export class AccountsController{
    public async createUser(req: Request, res: Response){
        // console.log("req.body", req.body);
        
        // Padronizar a resposta
        

        const response: ApiResponse<ApiResponseData> = {
            message: "",
            data: null,
            error: null,
          };
      
        
        try {
            const  user: IUser = req.body;

            new NameValidator(user.username);
            new EmailValidator(user.email);
            new PasswordValidator(user.password);
      
            const serviceResponse = await accountsService.createUser(
                user
            );
                
            // console.log(serviceResponse, "resposta");            
            response.message = "Usuário criado com sucesso!";
            response.data = serviceResponse;
            response.error = null;
        
            res.status(200).json(response);
        } catch (error) {
            console.log(TAG, "\n", error);
        
            response.message = "Não foi possível criar um usuário!";
            response.data = null;
            response.error = error;
        
            res.status(500);
            res.json(JSON.stringify(response));
        }
    }    
}

export class LoginController{

    public async login(req:Request, res: Response){
        type ApiResponseData = IUser | IUser | ILoginData | null;

        const response: ApiResponse<ApiResponseData> = {
            message: "",
            data: null,
            error: null,
          };

        interface IDataLogin{
            id:string|number,
            email: string,
            password: string
        }
        try{
            const {username, password} = req.body
            // new EmailValidator(email)
            new PasswordValidator(password)

            const responseLogin = await loginService.LoginUser(username, password);


            const secretKey:string | undefined = process.env.JWTSECRET 
            if(!secretKey){
                throw 'Error: SecretKey is not a string.'
            }
            const jwt_cookie = jwt.sign( {user: responseLogin}, secretKey)
            res.cookie("session", jwt_cookie)
            response.message = 'Sucess'
            response.data = responseLogin
            return res.status(200).json(response)
        }catch(error:any){
            console.log(TAG,error)
            response.message = 'Error'
            response.error =  error;
            return res.status(400).json(response)
        }
    }
}
