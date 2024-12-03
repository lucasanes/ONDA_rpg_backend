import { Injectable } from '@nestjs/common';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';

import { InviteModel } from '@src/domain/model/invite.model';
import { SessionModel } from '@src/domain/model/session.model';
import { SaveInviteParams } from '@src/domain/repositories/invite/types';
import { Invite } from '../entities/invite.entity';
import { User } from '../entities/user.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class InviteRepositoryImpl
  extends BaseRepository
  implements InviteRepository
{
  async getById(id: number): Promise<InviteModel | null> {
    const invite = await this.getRepository(Invite).findOne({
      where: {
        id,
      },
    });

    if (!invite) {
      return null;
    }

    return new InviteModel({
      ...invite,
      session: undefined,
    });
  }

  async findByUserId(userId: number): Promise<InviteModel[]> {
    const invites = await this.getRepository(Invite).find({
      relations: {
        session: {
          characters: {
            user: true,
          },
        },
      },
      where: {
        userId,
      },
    });

    return invites.map(
      (invite) =>
        new InviteModel({
          ...invite,
          session: new SessionModel({
            ...invite.session,
            characters: [],
            items: [],
            players: invite.session.characters.map(
              (character) => character.user.username,
            ),
          }),
        }),
    );
  }

  async save(params: SaveInviteParams): Promise<InviteModel> {
    const { email, sessionId } = params;

    const user = await this.getRepository(User).findOneBy({
      email,
    });

    const newInvite = await this.getRepository(Invite).save({
      sessionId,
      userId: user.id,
    });

    const invite = await this.getRepository(Invite).findOne({
      relations: {
        session: true,
      },
      where: {
        id: newInvite.id,
      },
    });

    return new InviteModel({
      ...invite,
      session: new SessionModel({
        ...invite.session,
        characters: [],
        items: [],
      }),
    });
  }

  async delete(id: number): Promise<void> {
    await this.getRepository(Invite).delete(id);
  }
}
