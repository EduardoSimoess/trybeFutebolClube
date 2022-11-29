import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

const service = new LeaderboardService();

export default class LeaderboardController {
  returnClassification = async (req: Request, res: Response) => {
    const classification = await service.homeClassification();
    return res.status(200).json(classification);
  };
}
