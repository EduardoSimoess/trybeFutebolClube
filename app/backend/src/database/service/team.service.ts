import Team from '../models/Team';

export default class TeamService {
  getTeams = async () => {
    const teams = await Team.findAll();
    return teams;
  };
}
