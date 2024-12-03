import { Usecase } from '../usecase';

export type UpdateCharacterUsecaseInput = {
  id: number;
  isPublic?: boolean;
  sessionId?: number | null;
};

export type UpdateCharacterUsecaseOutput = void;

export abstract class UpdateCharacterUsecase extends Usecase<
  UpdateCharacterUsecaseInput,
  UpdateCharacterUsecaseOutput
> {
  abstract execute(
    input: UpdateCharacterUsecaseInput,
  ): Promise<UpdateCharacterUsecaseOutput>;
}
