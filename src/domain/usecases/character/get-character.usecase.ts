import { CharacterModel } from '@src/domain/model/character.model';
import { Usecase } from '../usecase';

export type GetCharacterUsecaseInput = {
  id: number;
  userId: number | null;
};

export type GetCharacterUsecaseOutput = {
  character: CharacterModel;
  hasPermission: boolean;
};

export abstract class GetCharacterUsecase extends Usecase<
  GetCharacterUsecaseInput,
  GetCharacterUsecaseOutput
> {
  abstract execute(
    input: GetCharacterUsecaseInput,
  ): Promise<GetCharacterUsecaseOutput>;
}
