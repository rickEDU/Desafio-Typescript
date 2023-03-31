import {Accountsrepo} from "../repository/userRepository.js";
import { IUser } from "../interfaces/interfaces.js";


const accountsRepo = new Accountsrepo();


// import JWT from "jsonwebtoken";
// import { config } from "dotenv";

const TAG = "userService";


export class AccountsService{
  public async createUser({username, email, password}:IUser){
      try {
        const dbResponse = await accountsRepo.createUser(
          {username,
          email,
          password}
        );
        return dbResponse;
      } catch (error) {
        console.log(TAG, "error caught at");
        throw error;
      }
    }
}


