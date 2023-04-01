import pool from "../pool/index.js";
import {
  ILogin,
  ILoginData,
  IUser,
  IUserDataComplete,
  ApiResponseData,
} from "../interfaces/userInterfaces";
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";
import bcrypt from "bcrypt";

const TAG = "userRepository";

export class Accountsrepo {
  public async createUser(user: IUser) {
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

  public async SelectUser(username: string, password: string) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const user = await connectDb(query.getUser, [username]);
      if (user.length === 0) {
        throw "Usuário não está cadastrado";
      }
      //// Verifica se a senha está correta
      const isPasswordValid = bcrypt.compareSync(password, user[0].password);
      if (!isPasswordValid) {
        throw "Senha inválida";
      }
      const data = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        first_name: user[0].first_name,
        last_name: user[0].last_name,
        is_admin: user[0].id_admin,
      };

      //CONSERTAR DEPPOIS o tipo do data:
      //   const data: any = user[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at createUser()");
      throw error;
    }
  }
}
