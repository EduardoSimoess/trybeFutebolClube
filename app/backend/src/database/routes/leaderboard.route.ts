import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const leaderboardRouter = express.Router();
const controller = new LeaderboardController();

leaderboardRouter.get('/home', controller.returnClassification);

leaderboardRouter.get('/away', controller.returnClassificationAway);

leaderboardRouter.get('/', controller.returnClassificationGeneral);

export default leaderboardRouter;
