import { TeamService } from "../services/teamService.js";
import { Response, Request } from "express";
import { NameValidator, StringValidator } from "../middlewares/validators.js";
import { ITeam } from "../interfaces/teamInterfaces.js";
import { ApiResponse, ApiResponseData } from "../interfaces/userInterfaces.js";

const TAG = "team controller";

const teamService = new TeamService();

export class TeamController {
  public async createTeam(req: Request, res: Response) {
    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const { decoded }: any = req.body;
      if (!decoded.user.is_admin) {
        throw "Error: não é um Administrador";
      }
      const team: ITeam = req.body;

      new NameValidator(team.name);
      new StringValidator(team.leader);

      const serviceResponse = await teamService.createTeam(team);

      response.message = "Equipe criada com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível criar a Equipe!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async deleteTeam(req: Request, res: Response) {
    // Padronizar a resposta
    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const serviceResponse = await teamService.deleteTeam(req.params.team_id);

      response.message = "Equipe deletada com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível deletar o time!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async addMemberTeam(req: Request, res: Response) {
    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      // const id_regex: string = req.params.user_id.replace(/ /g, "");
      const { decoded }: any = req.body;
      // const id_regex: string = req.params.user_id.replace(/ /g, "");
      if (!decoded.user.is_admin) {
        throw "Error: não é um Administrador";
      }

      const serviceResponse = await teamService.addMemberTeam(
        decoded.user.id,
        decoded.user.is_admin,
        req.params.user_id,
        req.params.team_id
      );

      response.message = "Equipe deletada com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível deletar o time!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }
  public async removeMemberTeam(req: Request, res: Response) {
    const response: ApiResponse<ApiResponseData> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      // const id_regex: string = req.params.user_id.replace(/ /g, "");
      const { decoded }: any = req.body;

      const serviceResponse = await teamService.removeMemberTeam(
        decoded.user.id,
        decoded.user.is_admin,
        req.params.user_id,
        req.params.team_id
      );

      response.message = "Usuário removido do time com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível remover o usuário do time!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }
}
