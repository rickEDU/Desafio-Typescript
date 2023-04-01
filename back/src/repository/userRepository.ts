import pool from "../pool/index.js";
import {
        ILogin,
        ILoginData,
        IUser,
        IUserDataComplete,
        ApiResponseData
      } from "../interfaces/userInterfaces";
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";

const TAG = "userRepository";

export class Accountsrepo{
    public async createUser(user:IUser){
        try {
            // Verificando se já está cadastrado no banco de dados
                const userVerify = await connectDb(query.getUser, [
                        user.username,
                        user.password,
                ]);
                if (userVerify.length !== 0) {
                        throw "Usuário já cadastrado";
                }
            const response = await connectDb(query.insertUser, [
                user.username,
                user.email,
                user.firstName, 
                user.lastName,
                user.isAdmin,
                user.password, 
            ]);

            const data: IUser = response[0];
        //     console.log(data, "response from DB")
            return data;
        } catch (error) {
            console.log(TAG, "error caught at createUser()");
            throw error;
        }
    }

    public async SelectUser(username:string, password:string){
        try {
            // Verificando se já está cadastrado no banco de dados
                const userVerify = await connectDb(query.getUser, [
                        username,
                        password,
                ]);
                if (userVerify.length === 0) {
                    throw "Usuário não está cadastrado ou senha";
                }
        //CONSERTAR DEPPOIS o tipo do data:
            const data: any = userVerify[0];
        //  console.log(data, "response from DB")
            return data;
        } catch (error) {
            console.log(TAG, "error caught at createUser()");
            throw error;
        }
    }
}

