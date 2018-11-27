import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { jwtVerify } from '../helpers/auth';
import UserRepository, { User } from '../repositories/UserRepository';
import { IRequest } from '../types/IAuth';

const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepo = getCustomRepository(UserRepository);
  const customReq = req as IRequest;
  const token = req.cookies.jwt_token;
  const success = (user: User) => {
    customReq.user = user;
    return next();
  };
  const failure = (error: string) => {
    customReq.username = undefined;
    customReq.user = undefined;
    customReq.error = error;
    return next();
  };
  if (!token) {
    return failure('Cannot verify token');
  }
  try {
    const decoded = await jwtVerify(token);
    const user = await userRepo.findByUsername(decoded.username);
    if (!user) {
      return failure('Cannot find user');
    }
    return success(user);
  } catch (err) {
    return failure('Cannot decode token');
  }
};

export default verifyCookie;
