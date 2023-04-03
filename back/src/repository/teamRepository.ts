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
        throw "Usuário já é lider de uma equipe";
      }
      const verifyUser: Array<IUserResponse> = await connectDb(
        teamQuery.getUser,
        [team.leader]
      );
      if (verifyUser.length === 0) {
        throw "Usuário não está cadastrado";
      }

      if (verifyUser[0].is_admin) {
        throw "Usuário é administrador, portanto não pode ser líder";
      }

      const response = await connectDb(teamQuery.insertTeam, [
        team.name,
        team.leader,
      ]);

      const data: ITeamResponse = response[0];

      const result: Array<IUserResponse> = await connectDb(
        teamQuery.updateUserSquad,
        [data.id, data.leader]
      );

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
        throw "Equipe não cadastrada";
      }

      if (userVerifySquad.length > 1) {
        throw "Existe usuários na equipe";
      } else {
        await connectDb(query.updateUserSquad, [userVerifySquad[0].id, null]);
      }

      const response: Array<ITeamResponse> = await connectDb(
        teamQuery.deleteTeam,
        [idSquad]
      );
      const data: ITeamResponse = response[0];
      return data;
    } catch (error) {
      console.log(TAG, "error caught at deleteUser()");
      throw error;
    }
  }

  public async addMemberTeam(
    userLogin: string,
    userIsAdmin: boolean,
    userId: string,
    teamId: string
  ) {
    try {
      const userVerifyLeader: Array<ITeamResponse> = await connectDb(
        teamQuery.getLeaderTeam,
        [teamId, userLogin]
      );
      if (userVerifyLeader.length === 0 && userIsAdmin === false) {
        throw "Não tem permissão";
      }

      // Tem que consertar a query para não retornar o password
      const userIsMember: Array<IUser> = await connectDb(query.getUserById, [
        userId,
      ]);
      if (userIsMember[0].squad !== null) {
        throw "Usuário já pertence a uma equipe";
      }

      if (userLogin === userId) {
        throw "Não tem permissão para alterar a si próprio";
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
  public async removeMemberTeam(
    userLogin: string,
    userIsAdmin: boolean,
    userId: string,
    teamId: string
  ) {
    try {
      const userVerifyLeader: Array<ITeamResponse> = await connectDb(
        teamQuery.getLeaderTeam,
        [teamId, userLogin]
      );

      if (userVerifyLeader.length === 0 && userIsAdmin === false) {
        throw "Não tem permissão";
      }

      if (userLogin === userId) {
        throw "Não tem permissão para alterar a si próprio";
      }

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
}
