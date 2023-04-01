import { Router } from "express";
import {
  AccountsController, LoginController
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const route: Router = Router();
const accountsController = new AccountsController();
const loginController = new LoginController();
const Auth = new auth();

route.post("/users", accountsController.createUser);
route.delete("/users/:user_id", Auth.authenticated,accountsController.deleteUser);
route.post("/login", loginController.login);

route.get('/auth', Auth.authenticated)
// route.post("/accounts/login", accountsController.login);
// route.get('/getAll', accountsController.getAllUsers);
// route.patch('/accounts/', accountsController.updateUser);
// route.delete('/delete', accountsController.deleteUser);

export { route };
