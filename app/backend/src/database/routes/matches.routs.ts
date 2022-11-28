import * as express from 'express';
import MatchController from '../controller/matches.controller';

const matchesRouter = express.Router();
const controller = new MatchController();

matchesRouter.get('/', controller.returnMatches);

export default matchesRouter;
