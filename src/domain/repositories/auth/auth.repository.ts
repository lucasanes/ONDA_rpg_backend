import { UserModel } from '@src/domain/model/user.model';

import { RecoveryModel } from '@src/domain/model/recovery.model';
import {
  ChangePasswordParams,
  FindRecoveryByParams,
  FindUserByParams,
  SaveRecoveryParams,
  SaveUserParams,
  UpdateUserParams,
} from './types';

export abstract class AuthRepository {
  abstract getUserById(id: number): Promise<UserModel | null>;
  abstract getUserBy(params: FindUserByParams): Promise<UserModel | null>;
  abstract saveUser(params: SaveUserParams): Promise<UserModel>;
  abstract changePassword(params: ChangePasswordParams): Promise<void>;
  abstract updateUser(params: UpdateUserParams): Promise<void>;
  abstract findRecoveryBy(
    params: FindRecoveryByParams,
  ): Promise<RecoveryModel | null>;
  abstract upsertRecovery(params: SaveRecoveryParams): Promise<void>;
  abstract deleteRecovery(id: number): Promise<void>;
}
