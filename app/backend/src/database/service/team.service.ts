import ITeam from '../Interfaces/ITeam';
import Team from '../models/Team';

export default class TeamService {
  getTeams = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  getTeamById = async (id: string): Promise<Team> => {
    const team = await Team.findByPk(id);
    if (team) {
      return team;
    }
    throw new Error('Time not found');
  };
}
