import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../shared/IAuth';
import { jwtVerify } from '../helpers/auth';
import { IRequest } from '../types/IAuth';

const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const customReq = req as IRequest;
  const token = req.cookies.jwt_token;
  const success = (user: IUser) => {
    customReq.user = user;
    return next();
  };
  const failure = (error: string) => {
    customReq.user = undefined;
    customReq.error = error;
    return next();
  };
  if (!token) {
    return failure('Cannot verify token');
  }
  try {
    const decoded = await jwtVerify(token);
    return success(decoded as IUser);
  } catch (err) {
    return failure('Cannot decode token');
  }
};

export default verifyCookie;
