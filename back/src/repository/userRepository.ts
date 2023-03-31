import pool from "../pool/index.js";
import {
        ILogin,
        ILoginData,
        IUser,
        IUserData,
        IUserDataComplete,
      } from "../interfaces/interfaces.js";
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";

const TAG = "userRepository";

export class Accountsrepo{
    public async createUser({username, email, password}:IUser){
        try {
            // Verificando se já está cadastrado no banco de dados
                const userVerify = await connectDb(query.getUser, [
                        email,
                        password,
                ]);
                if (userVerify.length !== 0) {
                        throw "Usuário já cadastrado";
                }
            const response = await connectDb(query.insertUser, [
              username,
              email,
              password,
            ]);
            const data: IUserData = response[0];
        //     console.log(data, "response from DB")
            return data;
        } catch (error) {
        console.log(TAG, "error caught at createUser()");
        throw error;
        }
    }
}

