import { Request, Response } from 'express';
import MatchService from '../service/matches.service';

const service = new MatchService();

export default class MatchController {
  returnMatchesByByProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await service.getMatches();
      return res.status(200).json(matches);
    }
    const matches = await service.getMatchesByProgrees(inProgress as unknown as string);
    return res.status(200).json(matches);
  };

  createNewMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { authorization } = req.headers;
    const newObj = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
    const newTeam = await service.createMatchInPogress(
      newObj,
      authorization as unknown as string,
    );

    return res.status(201).json(newTeam);
  };

  updateToFinished = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await service.updateTofinished(id);
    return res.status(200).json({ message });
  };
}
