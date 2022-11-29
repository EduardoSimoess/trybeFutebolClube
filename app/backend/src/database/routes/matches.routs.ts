import * as express from 'express';
import MatchController from '../controller/matches.controller';
import matchesMiddleware from '../middlewares/matches.middleware';
import tokenMiddleware from '../middlewares/token.middleware';

const matchesRouter = express.Router();
const controller = new MatchController();

matchesRouter.get('/', controller.returnMatchesByByProgress);

matchesRouter.post('/', matchesMiddleware, tokenMiddleware, controller.createNewMatch);

matchesRouter.patch('/:id', controller.updateScore);

matchesRouter.patch('/:id/finish', controller.updateToFinished);

export default matchesRouter;
