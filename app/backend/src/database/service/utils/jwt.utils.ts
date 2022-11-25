import * as jwt from 'jsonwebtoken';

export default function tokenGenerator(email: string, password: string): string {
  const secret = process.env.JWT_SECRET || 'mySecret';

  const token = jwt.sign({ email, password }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  return token;
}
