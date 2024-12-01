import { Injectable } from '@nestjs/common';
import { UserModel } from '@src/domain/model/user.model';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import { User } from '@src/infra/entities/user.entity';

import {
  FindUserByParams,
  SaveUserParams,
} from '@src/domain/repositories/auth/types';
import { BaseRepository } from '../base.repository';

@Injectable()
export class AuthRepositoryImpl
  extends BaseRepository
  implements AuthRepository
{
  // constructor(
  //   @Inject('DATA_SOURCE')
  //   dataSource: DataSource,
  //   @Inject(REQUEST) req: RequestWithEntityManager,
  // ) {
  //   super(dataSource, req);
  // }

  async findById(id: number): Promise<UserModel | null> {
    const user = await this.getRepository(User).findOneBy({
      id,
    });

    if (!user) {
      return null;
    }

    return new UserModel(user);
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

  async save(params: SaveUserParams): Promise<UserModel> {
    const user = await this.getRepository(User).save(params);

    return new UserModel(user);
  }
}
