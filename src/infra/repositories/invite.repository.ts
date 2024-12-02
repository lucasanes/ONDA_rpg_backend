import { Injectable } from '@nestjs/common';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';

import { InviteModel } from '@src/domain/model/invite.model';
import { Invite } from '../entities/invite.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class InviteRepositoryImpl
  extends BaseRepository
  implements InviteRepository
{
  async findByUserId(userId: number): Promise<InviteModel[]> {
    const invites = await this.getRepository(Invite).find({
      where: {
        userId,
      },
    });

    return invites.map((invite) => new InviteModel(invite));
  }
}
