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

route.get("/users/me",Auth.authenticated, accountsController.getProfile);
route.get("/users/", Auth.authenticated,Auth.isAdmin, accountsController.getAllUsers);
route.get("/users/:user_id", Auth.authenticated, accountsController.getOneUser);
route.get("/teams/", Auth.authenticated,Auth.isAdminOrLeader, teamController.getAllTeams);
route.get("/teams/:team_id", Auth.authenticated, teamController.getOneTeam);
route.get("/teams/:team_id/members", Auth.authenticated, teamController.getViewMembers);

route.patch(
  "/users/:user_id",
  Auth.authenticated,
  Auth.isSelf,
  accountsController.updateUser
);
route.patch("/teams/:team_id", Auth.authenticated, teamController.updateTeam);

route.delete(
  "/users/:user_id",
  Auth.authenticated,
  Auth.isAdmin,
  accountsController.deleteUser
);
route.delete(
  "/teams/:team_id",
  Auth.authenticated,
  Auth.isAdmin,
  teamController.deleteTeam
);
route.delete(
  "/teams/:team_id/member/:user_id",
  Auth.authenticated,
  teamController.removeMemberTeam
);
route.delete("/logout", loginController.logout);

export { route };
