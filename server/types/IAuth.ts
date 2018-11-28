import { Request } from 'express';
import { User } from '../src/entity/User';
export interface IRequest extends Request {
  username?: string;
  user?: User;
  error?: string;
}
