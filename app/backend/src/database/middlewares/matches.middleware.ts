import { Request, Response, NextFunction } from 'express';
import TeamService from '../service/team.service';
import ITeam from '../Interfaces/ITeam';

const teamsService = new TeamService();

export default async function matchesMiddleware(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const teams: ITeam[] = await teamsService.getTeams();
  const home = teams.some((team: ITeam) => team.id === homeTeam);
  const away = teams.some((team: ITeam) => team.id === awayTeam);

  if (!home || !away) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
}
