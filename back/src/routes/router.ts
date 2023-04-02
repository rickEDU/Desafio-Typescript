import { Router } from "express";
import { TeamController } from "../controllers/teamController.js";
import {
  AccountsController,
  LoginController,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const route: Router = Router();
const accountsController = new AccountsController();
const loginController = new LoginController();
const teamController = new TeamController();
const Auth = new auth();

route.delete(
  "/users/:user_id",
  Auth.authenticated,
  accountsController.deleteUser
);
route.post("/users/", accountsController.createUser);
route.post("/login", loginController.login);

route.post("/teams/", Auth.authenticated, teamController.createTeam);
route.delete(
  "/teams/:team_id",
  Auth.authenticated,
  Auth.isAdmin,
  teamController.deleteTeam
);

route.get("/auth", Auth.authenticated);
// route.post("/accounts/login", accountsController.login);
// route.get('/getAll', accountsController.getAllUsers);
// route.patch('/accounts/', accountsController.updateUser);
// route.delete('/delete', accountsController.deleteUser);

export { route };
