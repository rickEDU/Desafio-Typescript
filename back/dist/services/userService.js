var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Accountsrepo } from "../repository/userRepository.js";
import bcrypt from "bcrypt";
const accountsRepo = new Accountsrepo();
// import JWT from "jsonwebtoken";
// import { config } from "dotenv";
const TAG = "userService";
export class AccountsService {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbResponse = yield accountsRepo.createUser(user);
                return dbResponse;
            }
            catch (error) {
                console.log(TAG, "error caught at");
                throw error;
            }
        });
    }
}
export class LoginService {
    LoginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //CONSERTAR DEPOIS: TEM QUE FAZER O HASH DA SENHA AQUI
                // const hashedPassword = bcrypt.hashSync(password, 10);
                const dbResponse = yield accountsRepo.SelectUser(username);
                //// Verifica se a senha está correta
                const isPasswordValid = bcrypt.compareSync(password, dbResponse.password);
                if (!isPasswordValid) {
                    throw "Senha inválida";
                }
                const data = {
                    id: dbResponse.id,
                    username: dbResponse.username,
                    email: dbResponse.email,
                    first_name: dbResponse.first_name,
                    last_name: dbResponse.last_name,
                    is_admin: dbResponse.id_admin,
                };
                return data;
            }
            catch (error) {
                console.log(TAG, "error caught at");
                throw error;
            }
        });
    }
}
