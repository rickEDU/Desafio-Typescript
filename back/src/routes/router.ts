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

route.post(
  "/teams/:team_id/member/:user_id",
  Auth.authenticated,
  teamController.addMemberTeam
);
route.post("/users/", accountsController.createUser);
route.post("/login", loginController.login);
route.post("/teams/", Auth.authenticated, teamController.createTeam);

route.patch(
  "/users/:user_id",
  Auth.authenticated,
  accountsController.updateUser
);

route.delete(
  "/users/:user_id",
  Auth.authenticated,
  accountsController.deleteUser
);
route.delete(
  "/teams/:team_id",
  Auth.authenticated,
  Auth.isAdmin,
  teamController.deleteTeam
);

export { route };
