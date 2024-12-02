import { Injectable } from '@nestjs/common';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';

import { InviteModel } from '@src/domain/model/invite.model';
import { SessionModel } from '@src/domain/model/session.model';
import { SaveInviteParams } from '@src/domain/repositories/invite/types';
import { Invite } from '../entities/invite.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class InviteRepositoryImpl
  extends BaseRepository
  implements InviteRepository
{
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

    const players: string[] = invites.reduce(
      (acc: string[], invite) => [
        ...acc,
        ...invite.session.characters.map((c) => c.user.username),
      ],
      [],
    );

    return invites.map(
      (invite) =>
        new InviteModel({
          ...invite,
          session: new SessionModel({
            ...invite.session,
            characters: [],
            items: [],
            players,
          }),
        }),
    );
  }

  async save(params: SaveInviteParams): Promise<InviteModel> {
    const { email, sessionId } = params;

    const newInvite = await this.getRepository(Invite).save({
      email,
      sessionId,
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
