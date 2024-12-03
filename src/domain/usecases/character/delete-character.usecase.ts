import { Usecase } from '../usecase';

export type DeleteCharacterUsecaseInput = {
  id: number;
};

export type DeleteCharacterUsecaseOutput = void;

export abstract class DeleteCharacterUsecase extends Usecase<
  DeleteCharacterUsecaseInput,
  DeleteCharacterUsecaseOutput
> {
  abstract execute(
    input: DeleteCharacterUsecaseInput,
  ): Promise<DeleteCharacterUsecaseOutput>;
}
