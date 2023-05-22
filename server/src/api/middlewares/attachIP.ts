import { INextFunction, IRequest, IResponse } from '../types/express';
import { getClientIp } from './utils/getClientIp';

const attachIP = (req: IRequest, res: IResponse, next: INextFunction) => {
  const ip = getClientIp(req);
  req['attachedIp'] = ip;
  return next();
};

export default attachIP;
