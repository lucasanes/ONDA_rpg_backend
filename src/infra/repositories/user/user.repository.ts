import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserModel } from '@src/domain/model/user.model';
import { UserRepository } from '@src/domain/repositories/user/user.repository';
import { User } from '@src/infra/entities/user.entity';
import { RequestWithEntityManager } from '@src/infra/types/request-with-entity.manager';
import { DataSource } from 'typeorm';

import { FindUserByParams } from '@src/domain/repositories/user/types';
import { BaseRepository } from '../base.repository';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepository
  implements UserRepository
{
  constructor(
    @Inject('DATA_SOURCE')
    dataSource: DataSource,
    @Inject(REQUEST) req: RequestWithEntityManager,
  ) {
    super(dataSource, req);
  }

  async findUserBy(params: FindUserByParams): Promise<UserModel | null> {
    const user = await this.getRepository(User).findOneBy({
      email: params.email,
    });

    if (!user) {
      return null;
    }

    return new UserModel(user);
  }
}
