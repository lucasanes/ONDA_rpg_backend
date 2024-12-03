import { Injectable } from '@nestjs/common';
import { SessionRepository } from '@src/domain/repositories/session/session.repository';

import { CharacterModel } from '@src/domain/model/character.model';
import { ItemModel } from '@src/domain/model/item.model';
import { SessionModel } from '@src/domain/model/session.model';
import {
  SaveSessionParams,
  UpdateSessionParams,
} from '@src/domain/repositories/session/types';
import { Session } from '../entities/session.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class SessionRepositoryImpl
  extends BaseRepository
  implements SessionRepository
{
  async findByUserId(userId: number): Promise<SessionModel[]> {
    const sessions = await this.getRepository(Session).find({
      relations: {
        characters: {
          user: true,
        },
      },
      where: {
        userId,
      },
    });

    return sessions.map(
      (session) =>
        new SessionModel({
          ...session,
          characters: [],
          items: [],
          players: session.characters.map(
            (character) => character.user.username,
          ),
        }),
    );
  }

  async getById(id: number): Promise<SessionModel | null> {
    const session = await this.getRepository(Session).findOne({
      relations: {
        characters: {
          mainCharacter: true,
          statusCharacter: true,
        },
        items: true,
      },
      where: {
        id,
      },
    });

    if (!session) {
      return null;
    }

    return new SessionModel({
      ...session,
      characters: session.characters.map(
        (character) =>
          new CharacterModel({ ...character, items: [], session: undefined }),
      ),
      items: session.items.map((item) => new ItemModel(item)),
    });
  }

  async save(params: SaveSessionParams): Promise<SessionModel> {
    const session = await this.getRepository(Session).save(params);

    return new SessionModel({
      ...session,
      characters: [],
      items: [],
    });
  }

  async update(params: UpdateSessionParams): Promise<void> {
    const { id, ...updateFields } = params;

    await this.getRepository(Session).update(id, updateFields);
  }

  async delete(id: number): Promise<void> {
    await this.getRepository(Session).delete(id);
  }
}
