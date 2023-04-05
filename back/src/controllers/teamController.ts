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
        throw "Error: not an Admin";
      }
      const team: ITeam = req.body;

      new NameValidator(team.name);
      new StringValidator(team.leader);

      const serviceResponse = await teamService.createTeam(team);

      response.message = "Team created successfully!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to create the team!";
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

      response.message = "Team deleted successfully!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to delete team!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async updateTeam(req: Request, res: Response) {
    const response: ApiResponse<ITeamResponse> = {
      message: "",
      data: null,
      error: null,
    };

    try {
      const body = req.body;
      const decoded: IDecode<IUserResponse> = body.decoded;

      if (
        !(
          decoded.user.is_leader && decoded.user.squad === req.params.team_id
        ) &&
        decoded.user.is_admin === false
      ) {
        throw "Not an informed team leader or admin";
      }

      if (decoded.user.id === req.params.user_id) {
        throw "Don't have permission to alter yourself";
      }

      const team: ITeam = req.body;

      new NameValidator(team.name);
      new StringValidator(team.leader);

      //não pode alterar si próprio
      if (decoded.user.id === team.leader) {
        throw "Don't have permission to alter yourself";
      }

      const serviceResponse = await teamService.updateTeam(
        req.params.team_id,
        team.name,
        team.leader
      );

      response.message = "Team updated successfully!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to update team!";
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

      if (
        !(
          decoded.user.is_leader && decoded.user.squad === req.params.team_id
        ) &&
        decoded.user.is_admin === false
      ) {
        throw "Not an informed team leader or admin";
      }

      if (decoded.user.id === req.params.user_id) {
        throw "Don't have permission to alter yourself";
      }

      const serviceResponse = await teamService.addMemberTeam(
        req.params.user_id,
        req.params.team_id
      );

      response.message = "User added to team successfully!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to add user to team!";
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
        !(
          decoded.user.is_leader && decoded.user.squad === req.params.team_id
        ) &&
        decoded.user.is_admin === false
      ) {
        throw "Not an informed team leader or admin";
      }

      if (decoded.user.id === req.params.user_id) {
        throw "Don't have permission to alter yourself";
      }

      const serviceResponse = await teamService.removeMemberTeam(
        req.params.user_id,
        req.params.team_id
      );

      response.message = "User successfully removed from the team!";
      response.data = serviceResponse;
      response.error = null;

      res.status(200).json(response);
    } catch (error) {
      console.log(TAG, "\n", error);

      response.message = "Unable to remove user from team!";
      response.data = null;
      response.error = error;

      res.status(500);
      res.json(response);
    }
  }

  public async getViewMembers(req: Request, res: Response){
    const response: ApiResponse<IUserResponse[]> = {
      message: "",
      data: null,
      error: null,
    }
    try{
      const { decoded }: any = req.body;
      const userId = decoded.user.id;
      const teamId = req.params.team_id;
      
      const members = await teamService.getViewMembers(userId, teamId);  

      response.message = "Membros da equipe encontrados!";
      response.data = members;
      response.error = null;

    }catch(err){
      console.log(TAG, "\n", err);

      response.message = "Não foi possível encontrar os membros da equipe!";
      response.data = null;
      response.error = err;

      res.status(500);
      res.json(response);
    }
  }
  
  public async getOneTeam(req: Request, res: Response){
    const response: ApiResponse<any> = {
      message: "",
      data: null,
      error: null,
    }
    try {
      
      const teamId = req.body.params.team_id;
      // const teamId = "ba8aa56e-8666-439e-868d-e54f93adf127"
      const team = teamService.getOneTeam(teamId, req.body.decoded.team)
      
      response.message = "Equipe encontrada!"
      if(team){
        response.data= team
      }
      response.error = null
      res.status(200).json(response);
    } catch (err) {
      console.log(TAG, "\n", err);

      response.message = "Não Foi Possivel Encontrar Equipe!";
      response.data = null;
      response.error = err;

      res.status(500);
      res.json(response);
    }
  }
  public async getAllTeams(req: Request, res: Response){
    const response: ApiResponse<ITeam[]> = {
      message: "",
      data: null,
      error: null,
    }
    try {
      const teamId = req.body.decoded
      const teams = await teamService.getAllTeams(teamId)
      if(teams){
        response.data= teams
      }
      response.message = "Equipes encontradas!"
     
      res.status(200).json(response);
    } catch (err) {
      console.log(TAG, "\n", err);

      response.message = "Não Foi Possivel Encontrar as Equipes!";
      response.data = null;
      response.error = err;

      res.status(500);
      res.json(response);
    }
  }
}
