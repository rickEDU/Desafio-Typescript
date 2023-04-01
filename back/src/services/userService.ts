import {Accountsrepo} from "../repository/userRepository.js";
import { IUser } from "../interfaces/userInterfaces.js";


const accountsRepo = new Accountsrepo();


// import JWT from "jsonwebtoken";
// import { config } from "dotenv";

const TAG = "userService";

export class AccountsService{
  public async createUser(user:IUser){
      try {
        const dbResponse = await accountsRepo.createUser(
          user
        );
        return dbResponse;
      } catch (error) {
        console.log(TAG, "error caught at");
        throw error;
      }
    }
}

export class LoginService{
  public async LoginUser(username:string, password:string){
    try{
      //CONSERTAR DEPOIS: TEM QUE FAZER O HASH DA SENHA AQUI
      const dbResponse = await accountsRepo.SelectUser(username, password)
      return dbResponse;
    }catch (error){
      console.log(TAG, "error caught at");
      throw error;
    }
  }
}


