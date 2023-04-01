var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";
const TAG = "userRepository";
export class Accountsrepo {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificando se já está cadastrado no banco de dados
                const userVerify = yield connectDb(query.getUser, [
                    user.username,
                    user.password,
                ]);
                if (userVerify.length !== 0) {
                    throw "Usuário já cadastrado";
                }
                const response = yield connectDb(query.insertUser, [
                    user.username,
                    user.email,
                    user.firstName,
                    user.lastName,
                    user.isAdmin,
                    user.password,
                ]);
                const data = response[0];
                //     console.log(data, "response from DB")
                return data;
            }
            catch (error) {
                console.log(TAG, "error caught at createUser()");
                throw error;
            }
        });
    }
    SelectUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificando se já está cadastrado no banco de dados
                const user = yield connectDb(query.getUser, [username]);
                if (user.length === 0) {
                    throw "Usuário não está cadastrado";
                }
                //CONSERTAR DEPPOIS o tipo do data:
                //   const data: any = user[0];
                return user[0];
            }
            catch (error) {
                console.log(TAG, "error caught at createUser()");
                throw error;
            }
        });
    }
}
