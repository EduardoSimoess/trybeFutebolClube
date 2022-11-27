import { compareSync } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import IServiceReturn from '../Interfaces/IServiceReturn';
// import { IUser } from '../Interfaces/IUser';
import User from '../models/User';
import tokenGenerator from './utils/jwt.utils';
import verifyToken from './utils/jwt.verification';

type returnType = {
  type: number;
  message: string;
};

export default class UserService {
  login = async (email: string, password: string): Promise<returnType> => {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (user && compareSync(password, user?.password)) {
      const token = tokenGenerator(email, password);
      return { type: 200, message: token };
    }
    return { type: 401, message: 'Incorrect email or password' };
  };

  getUser = async (token: string): Promise<IServiceReturn> => {
    const data = verifyToken(token) as JwtPayload;
    const { email } = data;
    const user = await User.findOne({ where: { email } });
    console.log(user?.role);
    if (user) {
      const { role } = user;
      return { type: 200, message: role as unknown as string };
    }
    return { type: 404, message: 'Invalid user' };
  };
}
