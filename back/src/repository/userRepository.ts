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
        user.username
      ]);
      if (userVerify.length !== 0) {
        throw "Usuário já cadastrado";
      }
      const response = await connectDb(query.insertUser, [
        user.username,
        user.email,
        user.firstName,
        user.lastName,
        user.password,
        user.isAdmin,
      ]);

      const data: IUser = response[0];
      //     console.log(data, "response from DB")
      return data;
    } catch (error) {
      console.log(TAG, "error caught at createUser()");
      throw error;
    }
  }

  public async deleteUser(id: string) {
    try {
      // Verificando o usuário é lider de uma equipe
      const userVerifyLeader = await connectDb(query.leaderSquad, [id]);
      if (userVerifyLeader.length !== 0) {
        throw "Usuário é lider de uma equipe";
      }
      const response = await connectDb(query.deleteUser, [id]);
      if(response.length === 0){
        throw 'Usuário não encontrado'
      }
      const data: IUser = response[0];
      //     console.log(data, "response from DB")
      return data;
    } catch (error) {
      console.log(TAG, "error caught at deleteUser()");
      throw error;
    }
  }

  public async SelectUser(username: string) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const user = await connectDb(query.getUser, [username]);
      if (user.length === 0) {
        throw "Usuário não está cadastrado";
      }

      //CONSERTAR DEPPOIS o tipo do data:
      //   const data: any = user[0];
      return user[0];
    } catch (error) {
      console.log(TAG, "error caught at createUser()");
      throw error;
    }
  }
}
