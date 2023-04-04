import {
  ILogin,
  ILoginData,
  IUser,
  IUserDataComplete,
  ApiResponseData,
  IUserResponse,
  IUserRequest,
} from "../interfaces/userInterfaces";
import { ITeamResponse } from "../interfaces/teamInterfaces";
import { connectDb } from "./data/connection.js";
import { query } from "./data/queries.js";

const TAG = "userRepository";

export class Accountsrepo {
  public async createUser(user: IUser) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const userVerify: Array<IUser> = await connectDb(query.getUser, [
        user.username,
      ]);
      if (userVerify.length !== 0) {
        throw "User is already registered";
      }

      const response = await connectDb(query.insertUser, [
        user.username,
        user.email,
        user.first_name,
        user.last_name,
        user.password,
        user.is_admin,
      ]);

      const data: IUser = response[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at createUser()");
      throw error;
    }
  }

  public async updateUser(user: IUserRequest, id: string) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const usuarioDB: Array<IUser> = await connectDb(query.getUserById, [id]);
      if (usuarioDB.length === 0) {
        throw "User not found.";
      }
      //Verifica se o username passado pela requisição já está sendo usado por outro cadastro.
      if (
        user.username !== undefined &&
        user.username !== usuarioDB[0].username
      ) {
        const verifyUsername: IUser[] = await connectDb(query.getUser, [
          user.username,
        ]);
        if (verifyUsername.length !== 0) {
          throw "This username is already being used.";
        }
      }
      // Verifica se o usuário que o autor quer fazer update faz parte de uma equipe
      // e se o autor está tentando transformar o cadastro em administrador
      if (usuarioDB[0].squad !== null && user.is_admin == true) {
        throw "This user is part of a team, so he cannot become an admin.";
      }
      //Impede um Administrador "demotar" outro ou ele mesmo para um usuário comum.
      if (usuarioDB[0].is_admin && user.is_admin == false) {
        throw "This column cannot be changed";
      }

      Object.assign(usuarioDB[0], user);

      const response: Array<IUserResponse> = await connectDb(query.updateUser, [
        id,
        usuarioDB[0].username,
        usuarioDB[0].email,
        usuarioDB[0].first_name,
        usuarioDB[0].last_name,
        usuarioDB[0].password,
        usuarioDB[0].is_admin,
      ]);

      const data: IUserResponse = response[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at updateUser()");
      throw error;
    }
  }

  public async deleteUser(id: string) {
    try {
      // Verificando o usuário é lider de uma equipe
      const userVerifyLeader: Array<ITeamResponse> = await connectDb(
        query.leaderSquad,
        [id]
      );
      if (userVerifyLeader.length !== 0) {
        throw "This User is a team leader";
      }
      const response: Array<IUserResponse> = await connectDb(query.deleteUser, [
        id,
      ]);
      if (response.length === 0) {
        throw "User not found";
      }
      const data: IUserResponse = response[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at deleteUser()");
      throw error;
    }
  }

  public async SelectUser(username: string) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const user: Array<ILogin> = await connectDb(query.getLogin, [username]);
      if (user.length === 0) {
        throw "User not found";
      }

      return user[0];
    } catch (error) {
      console.log(TAG, "error caught at createUser()");
      throw error;
    }
  }
}
