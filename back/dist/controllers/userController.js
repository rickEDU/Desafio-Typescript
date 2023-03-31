var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AccountsService } from "../services/userService.js";
import { NameValidator, EmailValidator, PasswordValidator } from "../middlewares/validators.js";
const TAG = "users controller";
const accountsService = new AccountsService();
export class AccountsController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("req.body", req.body);
            const response = {
                message: "",
                data: null,
                error: null,
            };
            try {
                const { username, email, password } = req.body;
                new NameValidator(username);
                new EmailValidator(email);
                new PasswordValidator(password);
                const serviceResponse = yield accountsService.createUser({ username,
                    email,
                    password });
                // console.log(serviceResponse, "resposta");            
                response.message = "Usuário criado com sucesso!";
                response.data = serviceResponse;
                response.error = null;
                res.status(200).json(response);
            }
            catch (error) {
                console.log(TAG, "\n", error);
                response.message = "Não foi possível criar um usuário!";
                response.data = null;
                response.error = error;
                res.status(500);
                res.json(JSON.stringify(response));
            }
        });
    }
}
