import { CharacterModel } from '@src/domain/model/character.model';
import { Usecase } from '../usecase';

export type GetCharacterPortraitUsecaseInput = {
  id: number;
};

export type GetCharacterPortraitUsecaseOutput = CharacterModel;

export abstract class GetCharacterPortraitUsecase extends Usecase<
  GetCharacterPortraitUsecaseInput,
  GetCharacterPortraitUsecaseOutput
> {
  abstract execute(
    input: GetCharacterPortraitUsecaseInput,
  ): Promise<GetCharacterPortraitUsecaseOutput>;
}
