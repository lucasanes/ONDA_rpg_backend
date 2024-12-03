import { CharacterModel } from '@src/domain/model/character.model';
import { Usecase } from '../usecase';

export type CreateCharacterUsecaseInput = {
  age: number;
  class: string;
  divinity: string;
  hp: number;
  mp: number;
  name: string;
  origin: string;
  portrait?: string;
  race: string;
  userId: number;
  xp: number;
};

export type CreateCharacterUsecaseOutput = CharacterModel;

export abstract class CreateCharacterUsecase extends Usecase<
  CreateCharacterUsecaseInput,
  CreateCharacterUsecaseOutput
> {
  abstract execute(
    input: CreateCharacterUsecaseInput,
  ): Promise<CreateCharacterUsecaseOutput>;
}
