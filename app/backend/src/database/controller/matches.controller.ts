import { Request, Response } from 'express';
import MatchService from '../service/matches.service';

const service = new MatchService();

export default class MatchController {
  returnMatches = async (req: Request, res: Response) => {
    const matches = await service.getMatches();
    return res.status(200).json(matches);
  };
}
