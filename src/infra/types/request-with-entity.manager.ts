import { Request } from 'express';

export const ENTITY_MANAGER_KEY = 'ENTITY_MANAGER';
export interface RequestWithEntityManager extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ENTITY_MANAGER_KEY]?: any;
}
