import { Request, Response } from 'express';
import TeamService from '../service/team.service';

const service = new TeamService();

export default class TeamController {
  returnTeams = async (req: Request, res: Response) => {
    const teams = await service.getTeams();
    return res.status(200).json(teams);
  };
}
