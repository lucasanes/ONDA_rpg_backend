import { CharacterModel } from '@src/domain/model/character.model';

export abstract class CharacterRepository {
  abstract findByUserId(userId: number): Promise<CharacterModel[]>;
}
