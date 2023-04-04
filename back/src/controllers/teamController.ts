import { TeamService } from "../services/teamService.js";
import { Response, Request } from "express";
import { NameValidator, StringValidator } from "../middlewares/validators.js";

import { ITeam, ITeamResponse } from "../interfaces/teamInterfaces.js";
import {
  ApiResponse,
  ApiResponseData,
  IDecode,
  IUserResponse,
} from "../interfaces/userInterfaces.js";

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
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

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
    const response: ApiResponse<ITeamResponse> = {
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

  public async updateTeam(req: Request, res: Response) {
    // Padronizar a resposta

    const response: ApiResponse<ITeamResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      if (
        decoded.user.id === undefined ||
        decoded.user.is_admin === undefined
      ) {
        throw "Usuário não logado";
      }

      const team: ITeam = req.body;

      new NameValidator(team.name);
      new StringValidator(team.leader);

      const serviceResponse = await teamService.updateTeam(
        decoded.user.id,
        decoded.user.is_admin,
        req.params.team_id,
        team.name,
        team.leader
      );

      response.message = "Time atualizado com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível atualizar o time!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async addMemberTeam(req: Request, res: Response) {
    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      // Creio que seja melhor olhando o cookie de sessão, eu acho que Eduardo já fez essa verificação
      if (
        decoded.user.id === undefined ||
        decoded.user.is_admin === undefined
      ) {
        throw "Usuário não logado";
      }

      if (
        !(
          decoded.user.is_leader && decoded.user.squad === req.params.team_id
        ) &&
        decoded.user.is_admin === false
      ) {
        throw "Not an informed team leader";
      }

      if (decoded.user.id === req.params.user_id) {
        throw "Não tem permissão para alterar a si próprio";
      }

      const serviceResponse = await teamService.addMemberTeam(
        req.params.user_id,
        req.params.team_id
      );

      response.message = "Usuário adicionado à equipe com sucesso!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Não foi possível adicionar o usuário à equipe!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }
  public async removeMemberTeam(req: Request, res: Response) {
    const response: ApiResponse<IUserResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      if (
        decoded.user.id === undefined ||
        decoded.user.is_admin === undefined
      ) {
        throw "Usuário não logado";
      }

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
