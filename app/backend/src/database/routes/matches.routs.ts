import * as express from 'express';
import MatchController from '../controller/matches.controller';

const matchesRouter = express.Router();
const controller = new MatchController();

matchesRouter.get('/', controller.returnMatches);

matchesRouter.get('/:matches', controller.returnMatchesByByProgress);

export default matchesRouter;
