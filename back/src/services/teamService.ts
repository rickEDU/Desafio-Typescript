 import { TeamRepo } from "../repository/teamRepository.js";
import { ITeam } from "../interfaces/teamInterfaces.js";
import { IUser } from "../interfaces/userInterfaces.js";

const teamRepo = new TeamRepo();

const TAG = "userService";

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
}

