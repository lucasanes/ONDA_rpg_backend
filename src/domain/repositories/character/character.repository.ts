import { CharacterModel } from '@src/domain/model/character.model';
import {
  SaveCharacterParams,
  UpdateCharacterParams,
  UpdateMainParams,
  UpdateStatusParams,
} from './types';

export abstract class CharacterRepository {
  abstract findByUserId(userId: number): Promise<CharacterModel[]>;
  abstract getById(id: number): Promise<CharacterModel | null>;
  abstract save(params: SaveCharacterParams): Promise<CharacterModel>;
  abstract update(params: UpdateCharacterParams): Promise<void>;
  abstract updateMain(params: UpdateMainParams): Promise<void>;
  abstract updateStatus(params: UpdateStatusParams): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
