import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';

import { CharacterModel } from '@src/domain/model/character.model';
import { ItemModel } from '@src/domain/model/item.model';
import {
  SaveCharacterParams,
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
      relations: {
        mainCharacter: true,
        statusCharacter: true,
      },
      where: {
        userId,
      },
    });

    return characters.map(
      (character) => new CharacterModel({ ...character, items: [] }),
    );
  }

  async getById(id: number): Promise<CharacterModel | null> {
    const character = await this.getRepository(Character).findOne({
      relations: {
        items: true,
        mainCharacter: true,
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
      items: character.items.map((item) => new ItemModel(item)),
    });
  }

  async save(params: SaveCharacterParams): Promise<CharacterModel> {
    const newCharacter = await this.getRepository(Character).save(params);

    const character = await this.getRepository(Character).findOne({
      relations: {
        mainCharacter: true,
        statusCharacter: true,
      },
      where: {
        id: newCharacter.id,
      },
    });

    return new CharacterModel({ ...character, items: [] });
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
