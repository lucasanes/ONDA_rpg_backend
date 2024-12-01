import { UserModel } from '@src/domain/model/user.model';

import { FindUserByParams } from './types';

export abstract class UserRepository {
  abstract findUserBy(params: FindUserByParams): Promise<UserModel | null>;
}
