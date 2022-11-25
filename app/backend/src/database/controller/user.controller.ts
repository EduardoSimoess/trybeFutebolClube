import { Request, Response } from 'express';
import UserService from '../service/user.service';

const service = new UserService();

// type ILogin = { email: string, password: string };

export default class UserController {
  returnLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    if (token) {
      return res.status(200).json({ token });
    }
  };
}
