import { compareSync } from 'bcryptjs';
import User from '../models/User';
import tokenGenerator from './utils/jwt.utils';

export default class UserService {
  login = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (user && compareSync(password, user?.password)) {
      const token = tokenGenerator(email, password);
      return token;
    }
    throw new Error('Incorrect email or password');
  };
}
