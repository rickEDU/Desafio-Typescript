import { ITeam, ITeamResponse } from "../interfaces/teamInterfaces.js";
import { connectDb } from "./data/connection.js";
import { teamQuery } from "./data/teamQueries.js";
import { query } from "./data/queries.js";
import { IUserResponse } from "../interfaces/userInterfaces.js";

import { UUID } from "crypto";
import { ILoginData } from "../interfaces/userInterfaces.js";
import { IUser } from "../interfaces/userInterfaces.js";

const TAG = "teamRepository";

export class TeamRepo {
  public async createTeam(team: ITeam) {
    try {
      // Verificando se já está cadastrado no banco de dados
      const teamVerifyLeader: Array<IUserResponse> = await connectDb(
        teamQuery.getLeader,
        [team.leader]
      );

      if (teamVerifyLeader.length !== 0) {
        throw "User is already a team leader";
      }
      const verifyUser: Array<IUserResponse> = await connectDb(
        teamQuery.getUser,
        [team.leader]
      );
      if (verifyUser.length === 0) {
        throw "User is not registered";
      }

      if (verifyUser[0].is_admin) {
        throw "User is an administrator, so he cannot be a leader";
      }

      const response = await connectDb(teamQuery.insertTeam, [
        team.name,
        team.leader,
      ]);

      const data: ITeamResponse = response[0];

      await connectDb(teamQuery.updateUserSquad, [data.id, data.leader]);

      return data;
    } catch (error) {
      console.log(TAG, "error caught at createTeam()");
      throw error;
    }
  }

  public async deleteTeam(idSquad: string) {
    try {
      const userVerifySquad: Array<ILoginData> = await connectDb(
        query.selectUserSquad,
        [idSquad]
      );
      if (userVerifySquad.length === 0) {
        throw "Team is not registered";
      }

      if (userVerifySquad.length > 1) {
        throw "There are users in the team";
      }
      await connectDb(query.updateUserSquad, [userVerifySquad[0].id, null]);
      const responseDelete: Array<ITeamResponse> = await connectDb(
        teamQuery.deleteTeam,
        [idSquad]
      );

      const data: ITeamResponse = responseDelete[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at deleteUser()");
      throw error;
    }
  }

  public async updateTeam(teamId: string, team: any) {
    try {
      //verify if
      const teamDB: Array<ITeamResponse> = await connectDb(teamQuery.getTeam, [
        teamId,
      ]);
      if (teamDB.length === 0) {
        throw "Team not found.";
      }
      //Verifica se o name passado pela requisição já está sendo usado por outro cadastro.
      if (team.name !== undefined && team.name !== teamDB[0].name) {
        const verifyName: IUser[] = await connectDb(teamQuery.getTeambyName, [
          team.name,
        ]);
        if (verifyName.length !== 0) {
          throw "This team name is already being used.";
        }
      }

      if (team.leader !== undefined) {
        const newLeader: Array<IUser> = await connectDb(query.getUserById, [
          team.leader,
        ]);

        //membros de outras equipes não podem ser líderes
        if (newLeader[0].squad !== teamId) {
          throw "The new leader must be a member of the team";
        }
      }

      console.log(teamDB[0], "teamDB");
      console.log(team, "team");
      Object.assign(teamDB[0], team);

      const response: Array<ITeamResponse> = await connectDb(
        teamQuery.updateTeam,
        [teamId, teamDB[0].name, teamDB[0].leader]
      );

      const data: ITeamResponse = response[0];
      return data;
    } catch (error) {
      console.log("error caught at update", TAG);
      throw error;
    }
  }

  public async addMemberTeam(userId: string, teamId: string) {
    try {
      // Tem que consertar a query para não retornar o password (Feito)
      const userIsMember: Array<IUser> = await connectDb(query.getUserById, [
        userId,
      ]);
      if (userIsMember[0].squad !== null) {
        throw "User already belongs to a team";
      }
      if (userIsMember[0].is_admin) {
        throw "Admins can't join teams";
      }

      const response: Array<IUserResponse> = await connectDb(
        query.updateUserSquad,
        [userId, teamId]
      );

      const data: IUserResponse = response[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at addMemberTeamRepository()");
      throw error;
    }
  }

  public async removeMemberTeam(userId: string, teamId: string) {
    try {
      const response: Array<IUserResponse> = await connectDb(
        query.updateUserSquad,
        [userId, null]
      );

      const data: IUserResponse = response[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at deleteUser()");
      throw error;
    }
  }

  public async getAllTeams(user: any) {
    try {
      let teams: ITeam[] = [];
        teams = await connectDb(teamQuery.getAllTeams, []);
        if(user.is_admin){
          return teams;
        }else{
          const response2 = await connectDb(teamQuery.getLeader, [user.id]);
          if(response2.length != 0){
            return teams;
          }else{
            throw 'Error usuário não tem permissão!';
          }
        }

    } catch (error) {
      console.log(TAG, "error caught at getAllTeams()");
      throw error;
    }
  }
  
  public async getOneTeam(teamId: string, object1: any){
    try{
      if(object1.is_admin){
        const response1 = await connectDb(teamQuery.getOneTeam, [teamId]);
        return response1[0];
      }else if(object1.squad== null){
        console.log(object1.squad);
        throw 'Error usuário não faz parte de uma equipe';
      }else{
        const response2 = await connectDb(teamQuery.getLeader, [object1.id]);
        if(response2.length != 0){
          const response = await connectDb(teamQuery.getOneTeam, [teamId]);
          if (response.length === 0) {
            throw 'Erro ao acessar essa informação';
          }
          return response[0];
        }else if(teamId == object1.squad){
          const response3 = await connectDb(teamQuery.getOneTeam, [teamId]);
          return response3[0];
        }else{
          throw 'Error usuário não tem permissão!';
        }
      }

    } catch (error) {
      console.log(TAG, "error caught at getAllTeams()");
      throw error;
    }
  }
  
  public async getViewMembers(teamId: any, object1: any){
    try{
      const teams: IUserResponse[] = await connectDb(query.getAllUserMembers, [teamId]);
      if(object1.is_admin){
        return teams;
      }else if(object1.squad== null){
        throw 'Error usuário não faz parte de uma equipe';
      }else{
        const response2 = await connectDb(teamQuery.getLeader, [object1.id]);
        if(teamId == object1.squad){
          return teams;
        }else{
          throw 'Error usuário não tem permissão!';
        }
      }
    } catch (error) {
      console.log(TAG, "error caught at getAllTeams()");
      throw error;
    }
  }
}
