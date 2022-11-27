import * as express from 'express';
import UserController from '../controller/user.controller';
import userMiddleware from '../middlewares/user.middleware';

const userRouter = express.Router();

const controller = new UserController();

userRouter.post('/login', userMiddleware, controller.returnLogin);

userRouter.get('/login', controller.returnUser);

export default userRouter;
