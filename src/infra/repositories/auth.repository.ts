import { Injectable } from '@nestjs/common';
import { UserModel } from '@src/domain/model/user.model';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import { User } from '@src/infra/entities/user.entity';

import { RecoveryModel } from '@src/domain/model/recovery.model';
import {
  ChangePasswordParams,
  FindRecoveryByParams,
  FindUserByParams,
  SaveRecoveryParams,
  SaveUserParams,
} from '@src/domain/repositories/auth/types';
import { Recovery } from '../entities/recovery.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class AuthRepositoryImpl
  extends BaseRepository
  implements AuthRepository
{
  async getUserById(id: number): Promise<UserModel | null> {
    const user = await this.getRepository(User).findOneBy({
      id,
    });

    if (!user) {
      return null;
    }

    return new UserModel(user);
  }

  async getUserBy(params: FindUserByParams): Promise<UserModel | null> {
    const user = await this.getRepository(User).findOneBy({
      ...params,
    });

    if (!user) {
      return null;
    }

    return new UserModel(user);
  }

  async saveUser(params: SaveUserParams): Promise<UserModel> {
    const user = await this.getRepository(User).save(params);

    return new UserModel(user);
  }

  async changePassword(params: ChangePasswordParams): Promise<void> {
    await this.getRepository(User).update(
      {
        id: params.userId,
      },
      {
        password: params.password,
      },
    );
  }

  async findRecoveryBy(
    params: FindRecoveryByParams,
  ): Promise<RecoveryModel | null> {
    const user = await this.getRepository(User).findOneBy({
      email: params.email,
    });

    if (!user) {
      return null;
    }

    const recovery = await this.getRepository(Recovery).findOneBy({
      code: params.code,
      userId: user.id,
    });

    if (!recovery) {
      return null;
    }

    return new RecoveryModel(recovery);
  }

  async upsertRecovery(params: SaveRecoveryParams): Promise<void> {
    await this.getRepository(Recovery).upsert(
      {
        code: params.code,
        userId: params.userId,
      },
      ['userId'],
    );
  }

  async deleteRecovery(id: number): Promise<void> {
    await this.getRepository(Recovery).delete({
      id,
    });
  }
}
