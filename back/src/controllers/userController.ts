import {AccountsService} from "../services/userService.js";
import { Response, Request } from "express";
import { NameValidator, EmailValidator, PasswordValidator } from "../middlewares/validators.js";
import {
    IUserData,
    IUser,
    ApiResponse,
    ILoginData,
    ILogin,
  } from "../interfaces/interfaces.js";
const TAG = "users controller";

const accountsService = new AccountsService();

export class AccountsController{
    public async createUser(req: Request, res: Response){
        // console.log("req.body", req.body);
        
        // Padronizar a resposta
        type ApiResponseData = IUser | IUserData | ILoginData | null;

        const response: ApiResponse<ApiResponseData> = {
            message: "",
            data: null,
            error: null,
          };
      
        
        try {
            const { username, email, password }: IUser = req.body;

            new NameValidator(username);
            new EmailValidator(email);
            new PasswordValidator(password);
      
            const serviceResponse = await accountsService.createUser(
                {username,
                email,
                password}
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

 
