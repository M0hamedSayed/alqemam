import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

export const signJWT = (payload: object, expiresIn: string) => {
  const privateKey = fs.readFileSync(path.join(__dirname, '../../assets/certs/private.pem'));

  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}; // create JWT

export const verifyJWT = (token: string) => {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../assets/certs/public.pem'));

  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error: unknown) {
    return { payload: null, expired: true };
  }
}; // verify token
