import * as jwt from 'jsonwebtoken';

// type dados = {
//   email: string;
//   password: string;
//   iat: string;
//   exp: string;
// };
export default function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'mySecret';
  const data = jwt.verify(token, secret);
  return data;
}
