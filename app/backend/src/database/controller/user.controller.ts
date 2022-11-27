import { Request, Response } from 'express';
import UserService from '../service/user.service';

const service = new UserService();

// type ILogin = { email: string, password: string };

export default class UserController {
  returnLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await service.login(email, password);
    if (type === 200) {
      return res.status(type).json({ token: message });
    }
    return res.status(type).json({ message });
  };

  returnUser = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      const status = await service.getUser(authorization);
      const { type, message } = status;
      return res.status(type).json({ role: message });
    }
  };
}
