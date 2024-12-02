import { CharacterModel } from '@src/domain/model/character.model';
import {
  SaveCharacterParams,
  UpdateMainParams,
  UpdateStatusParams,
} from './types';

export abstract class CharacterRepository {
  abstract findByUserId(userId: number): Promise<CharacterModel[]>;
  abstract getById(id: number): Promise<CharacterModel | null>;
  abstract save(character: SaveCharacterParams): Promise<CharacterModel>;
  abstract updateMain(params: UpdateMainParams): Promise<void>;
  abstract updateStatus(params: UpdateStatusParams): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
