import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';

import { CharacterModel } from '@src/domain/model/character.model';
import { Character } from '../entities/character.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class CharacterRepositoryImpl
  extends BaseRepository
  implements CharacterRepository
{
  async findByUserId(userId: number): Promise<CharacterModel[]> {
    const characters = await this.getRepository(Character).find({
      where: {
        userId,
      },
      relations: {
        mainCharacter: true,
        statusCharacter: true,
      },
    });

    return characters.map(
      (character) =>
        new CharacterModel({
          mainCharacter: character.mainCharacter,
          statusCharacter: character.statusCharacter,
          ...character,
        }),
    );
  }
}
