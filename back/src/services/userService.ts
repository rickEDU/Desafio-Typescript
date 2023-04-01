import { Accountsrepo } from "../repository/userRepository.js";
import { IUser } from "../interfaces/userInterfaces.js";
import bcrypt from "bcrypt";

const accountsRepo = new Accountsrepo();

// import JWT from "jsonwebtoken";
// import { config } from "dotenv";

const TAG = "userService";

export class AccountsService {
  public async createUser(user: IUser) {
    try {
      const dbResponse = await accountsRepo.createUser(user);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
}

export class LoginService {
  public async LoginUser(username: string, password: string) {
    try {
      //CONSERTAR DEPOIS: TEM QUE FAZER O HASH DA SENHA AQUI
      // const hashedPassword = bcrypt.hashSync(password, 10);
      const dbResponse = await accountsRepo.SelectUser(username);

      //// Verifica se a senha está correta
      const isPasswordValid = bcrypt.compareSync(password, dbResponse.password);
      if (!isPasswordValid) {
        throw "Senha inválida";
      }
      const data = {
        id:dbResponse.id,
        username:dbResponse.username,
        email:dbResponse.email,
        first_name:dbResponse.first_name,
        last_name:dbResponse.last_name,
        is_admin:dbResponse.id_admin,
      };
      return data;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
}
