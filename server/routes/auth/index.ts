import express from 'express';
import { IUser } from '../../../shared/IAuth';
import { decrypt, encrypt, jwtSign, jwtVerify } from '../../helpers/auth';
import verifyCookie from '../../middlewares/verifyCookie';
import { IRequest } from '../../types/IAuth';

const routes = express.Router();

let prev = '';
routes.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const cryptedPassword = encrypt(password);
  prev = cryptedPassword;
  res.json({
    success: true,
  });
});

routes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const decryptedPassword = decrypt(prev);
  const success = () => {
    return res.json({
      username,
      success: true,
    });
  };
  const failure = (error: string) => {
    return res.status(401).json({
      success: false,
      error,
    });
  };
  if (decryptedPassword === password) {
    try {
      const token = await jwtSign({ username });
      res.cookie('jwt_token', token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      });
      return success();
    } catch (err) {
      return failure('Cannot sign in token.');
    }
  }
  return failure('Invalid ID or password.');
});

routes.get('/verify', verifyCookie, (req, res) => {
  const customReq = req as IRequest;
  const success = (user: IUser) => {
    return res.json({
      success: true,
      user,
    });
  };
  const failure = (error: string) => {
    return res.status(401).json({
      success: false,
      error,
    });
  };
  if (customReq.user) {
    return success(customReq.user);
  }
  return failure('Cannot verify user.');
});

routes.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.json({
    success: true,
  });
});
export default routes;
