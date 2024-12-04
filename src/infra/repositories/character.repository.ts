import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';

import { CharacterModel } from '@src/domain/model/character.model';
import { ItemModel } from '@src/domain/model/item.model';
import { SessionModel } from '@src/domain/model/session.model';
import {
  SaveCharacterParams,
  UpdateCharacterParams,
  UpdateMainParams,
  UpdateStatusParams,
} from '@src/domain/repositories/character/types';
import { Character } from '../entities/character.entity';
import { MainCharacter } from '../entities/main-character.entity';
import { StatusCharacter } from '../entities/status-character.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CharacterRepositoryImpl
  extends BaseRepository
  implements CharacterRepository
{
  async findByUserId(userId: number): Promise<CharacterModel[]> {
    const characters = await this.getRepository(Character).find({
      order: {
        mainCharacter: {
          name: 'ASC',
        },
      },
      relations: {
        mainCharacter: true,
        session: true,
        statusCharacter: true,
      },
      where: {
        userId,
      },
    });

    return characters.map(
      (character) =>
        new CharacterModel({
          ...character,
          items: [],
          session: new SessionModel({
            ...character.session,
            characters: [],
            items: [],
          }),
        }),
    );
  }

  async getById(id: number): Promise<CharacterModel | null> {
    const character = await this.getRepository(Character).findOne({
      relations: {
        items: true,
        mainCharacter: true,
        session: {
          characters: {
            mainCharacter: true,
          },
        },
        statusCharacter: true,
      },
      where: {
        id,
      },
    });

    if (!character) {
      return null;
    }

    return new CharacterModel({
      ...character,
      items: character.items
        .map((item) => new ItemModel(item))
        .sort((a, b) => a.name.localeCompare(b.name)),
      session: character.session
        ? new SessionModel({
            ...character.session,
            characters: character.session.characters.map(
              (character) =>
                new CharacterModel({
                  ...character,
                  items: [],
                  session: undefined,
                }),
            ),
            items: [],
          })
        : null,
    });
  }

  async save(params: SaveCharacterParams): Promise<CharacterModel> {
    const {
      age,
      class: characterClass,
      divinity,
      hp,
      mp,
      name,
      origin,
      race,
      portrait,
      userId,
      xp,
    } = params;

    const newCharacter = await this.getRepository(Character).save({
      isPublic: false,
      userId,
    });

    await this.getRepository(MainCharacter).save({
      age,
      characterId: newCharacter.id,
      class: characterClass,
      divinity,
      name,
      origin,
      race,
      xp,
    });

    await this.getRepository(StatusCharacter).save({
      characterId: newCharacter.id,
      currentHp: hp,
      currentMp: mp,
      hp,
      mp,
      portrait,
    });

    const character = await this.getRepository(Character).findOne({
      relations: {
        mainCharacter: true,
        statusCharacter: true,
      },
      where: {
        id: newCharacter.id,
      },
    });

    return new CharacterModel({ ...character, items: [], session: null });
  }

  async update(params: UpdateCharacterParams): Promise<void> {
    const { id, ...rest } = params;

    await this.getRepository(Character).update(
      {
        id,
      },
      {
        ...rest,
      },
    );
  }

  async updateMain(params: UpdateMainParams): Promise<void> {
    const { id, ...rest } = params;

    await this.getRepository(MainCharacter).update(
      {
        characterId: id,
      },
      {
        ...rest,
      },
    );
  }

  async updateStatus(params: UpdateStatusParams): Promise<void> {
    const { id, ...rest } = params;

    await this.getRepository(StatusCharacter).update(
      {
        characterId: id,
      },
      {
        ...rest,
      },
    );
  }

  async delete(id: number): Promise<void> {
    await this.getRepository(Character).delete(id);
  }
}
