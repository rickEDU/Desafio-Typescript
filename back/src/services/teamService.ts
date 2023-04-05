import { TeamRepo } from "../repository/teamRepository.js";
import { ITeam } from "../interfaces/teamInterfaces.js";
import { UUID } from "crypto";

const teamRepo = new TeamRepo();

const TAG = "teamService";

export class TeamService {
  public async createTeam(team: ITeam) {
    try {
      const dbResponse = await teamRepo.createTeam(team);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async deleteTeam(idSquad: string) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.deleteTeam(idSquad);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async updateTeam(teamId: string, team: any) {
    try {
      //consertar os tipos da resposta dbResponse
      const data: any = {};
      console.log(team, "teamsvc");

      for (let key in team) {
        if (key === "name" || key === "leader") {
          data[key] = team[key];
        }
        continue;
      }

      if (Object.keys(data).length == 0) {
        throw "The request has no body";
      }

      const dbResponse = await teamRepo.updateTeam(teamId, data);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async addMemberTeam(userId: string, teamId: string) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.addMemberTeam(userId, teamId);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async removeMemberTeam(userId: string, teamId: string) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.removeMemberTeam(userId, teamId);
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }

  public async getAllTeams(user: any) {
    try {
      const teams = await teamRepo.getAllTeams(user);
      return teams;
    } catch (error) {
      console.log(TAG, "Não foi Possivel encontrar as equipes!");
    }
  }
  public async getOneTeam(teamId: string, object1: any) {
    try {
      const teams = await teamRepo.getOneTeam(teamId, object1);
      return teams;
    } catch (error) {
      console.log(TAG, "Não foi Possivel encontrar a equipe!");
      throw error;
    }
  }

  public async getViewMembers(teamId: string, object1: any) {
    try {
      const members = await teamRepo.getViewMembers(teamId, object1);
      return members;
    } catch (error) {
      console.log(TAG, "Não foi Possivel encontrar a equipe!");
      throw error;
    }
  }
}
