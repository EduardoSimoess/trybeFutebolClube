import * as express from 'express';
import MatchController from '../controller/matches.controller';

const matchesRouter = express.Router();
const controller = new MatchController();

matchesRouter.get('/', controller.returnMatchesByByProgress);

matchesRouter.post('/', controller.createNewMatch);

matchesRouter.patch('/:id/finish', controller.updateToFinished);

export default matchesRouter;
