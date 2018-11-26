import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { IUser } from '../../shared/IAuth';

const ALOGORITHM = 'aes-256-ctr';
const { CRYPTO_SECRET, JWT_SECRET } = process.env;

export const encrypt = (value: string) => {
  const cipher = crypto.createCipher(ALOGORITHM, CRYPTO_SECRET!);
  let crypted = cipher.update(value, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const decrypt = (value: string) => {
  const decipher = crypto.createDecipher(ALOGORITHM, CRYPTO_SECRET!);
  let dec = decipher.update(value, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

export const jwtSign = (user: Partial<IUser>) => {
  return new Promise((res, rej) => {
    jwt.sign(user, JWT_SECRET!, { expiresIn: '7d' }, (err, token) => {
      if (err) {
        return rej(err);
      }
      return res(token);
    });
  });
};

export const jwtVerify = (token: string) => {
  return new Promise((res, rej) => {
    jwt.verify(token, JWT_SECRET!, (err, decoded) => {
      if (err) {
        return rej(err);
      }
      return res(decoded);
    });
  });
};
