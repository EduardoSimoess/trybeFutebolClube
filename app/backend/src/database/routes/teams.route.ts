import * as express from 'express';
import TeamController from '../controller/teams.controller';

const teamsRouter = express.Router();
const controller = new TeamController();

teamsRouter.get('/', controller.returnTeams);

export default teamsRouter;
