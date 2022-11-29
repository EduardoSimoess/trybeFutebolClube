import { Request, Response } from 'express';
import MatchService from '../service/matches.service';

const service = new MatchService();

export default class MatchController {
  returnMatches = async (req: Request, res: Response) => {
    const matches = await service.getMatches();
    return res.status(200).json(matches);
  };

  returnMatchesByByProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await service.getMatchesByProgrees(inProgress as unknown as string);
    return res.status(200).json(matches);
  };
}
