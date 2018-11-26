import { Request } from 'express';
import { IUser } from '../../shared/IAuth';

export interface IRequest extends Request {
  user?: IUser;
  error?: string;
}
