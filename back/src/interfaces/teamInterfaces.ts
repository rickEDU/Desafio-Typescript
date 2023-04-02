import { UUID } from "crypto";

export interface ITeam {
  name: string;
  leader: UUID;
}
export interface ITeamResponse {
  id: UUID;
  name: string;
  leader: UUID;
}
