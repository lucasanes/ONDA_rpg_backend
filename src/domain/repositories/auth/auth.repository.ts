import { UserModel } from '@src/domain/model/user.model';

import { FindUserByParams, SaveUserParams } from './types';

export abstract class AuthRepository {
  abstract findById(id: number): Promise<UserModel | null>;
  abstract findUserBy(params: FindUserByParams): Promise<UserModel | null>;
  abstract save(user: SaveUserParams): Promise<UserModel>;
}
