import { Accountsrepo } from "../repository/userRepository.js";
import { IUser, IUserResponse } from "../interfaces/userInterfaces.js";
import bcrypt from "bcrypt";

const accountsRepo = new Accountsrepo();

// import JWT from "jsonwebtoken";
// import { config } from "dotenv";

const TAG = "userService";

export class AccountsService {
  public async createUser(user: IUser) {
    try {
      const hashedPassword = bcrypt.hashSync(user.password, 10);

      const data: IUser = {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: hashedPassword,
        is_admin: false,
      };

      const dbResponse = await accountsRepo.createUser(data);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async updateUser(user: any, id:string) {
    try {
      const data: any = {};
      
      for(let key in user){
        if(key === 'decoded' || key === 'id'){
          continue
        }
        data[key] = user[key]
      }
      if(user.password !== undefined){
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        data.password = hashedPassword
      }
      //verifica se a única chave enviada no corpo foi 'squad'
      //ela não pode ser alterada nessa rota
      if(Object.keys(data).length ==1 && Object.keys(data)[0]=='squad'){
        throw "Não é possível alterar o squad nessa rota"
      }
      //Verifica se o corpo da requisição veio vazia
      if(Object.keys(data).length == 0){
        throw "O requisição está sem corpo"
      }
      const dbResponse:IUserResponse = await accountsRepo.updateUser(data, id);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
  
  public async deleteUser(id: string) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse:IUserResponse = await accountsRepo.deleteUser(id);
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
      const dbResponse:IUser = await accountsRepo.SelectUser(username);

      //// Verifica se a senha está correta
      const isPasswordValid:boolean = bcrypt.compareSync(password, dbResponse.password);
      if (!isPasswordValid) {
        throw "Senha inválida";
      }
      const data:IUserResponse = {
        id: dbResponse.id,
        username: dbResponse.username,
        email: dbResponse.email,
        first_name: dbResponse.first_name,
        last_name: dbResponse.last_name,
        squad: dbResponse.squad,
        is_admin: dbResponse.is_admin,
      };
      return data;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
}
