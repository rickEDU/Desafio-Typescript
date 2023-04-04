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

  public async updateTeam(
    userLogin: UUID,
    userIsAdmin: boolean,
    teamId: string,
    teamName: string,
    teamLeaderId: UUID
  ) {
    try {
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.updateTeam(
        userLogin,
        userIsAdmin,
        teamId,
        teamName,
        teamLeaderId
      );
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
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
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.addMemberTeam(
        userLogin,
        userIsAdmin,
        userId,
        teamId
      );
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
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
      //consertar os tipos da resposta dbResponse
      const dbResponse = await teamRepo.removeMemberTeam(
        userLogin,
        userIsAdmin,
        userId,
        teamId
      );
      return dbResponse;
    } catch (error) {
      console.log(TAG, "error caught at");
      throw error;
    }
  }
}
