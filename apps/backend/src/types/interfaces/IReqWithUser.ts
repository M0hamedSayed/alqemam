import { Request } from 'express';
import { IUser } from '@alqemam/shared';

export interface IReqWithUser extends Request {
  user: IUser;
}
