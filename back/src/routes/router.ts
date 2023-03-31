import { Router } from "express";
import {
  AccountsController
} from "../controllers/userController.js";

const route: Router = Router();
const accountsController = new AccountsController();

route.post("/accounts", accountsController.createUser);
// route.post("/accounts/login", accountsController.login);
// route.get('/getAll', accountsController.getAllUsers);
// route.patch('/accounts/', accountsController.updateUser);
// route.delete('/delete', accountsController.deleteUser);

export { route };
