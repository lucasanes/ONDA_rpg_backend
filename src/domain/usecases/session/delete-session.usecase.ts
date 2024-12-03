import { Usecase } from '../usecase';

export type DeleteSessionUsecaseInput = {
  id: number;
};

export type DeleteSessionUsecaseOutput = void;

export abstract class DeleteSessionUsecase extends Usecase<
  DeleteSessionUsecaseInput,
  DeleteSessionUsecaseOutput
> {
  abstract execute(
    input: DeleteSessionUsecaseInput,
  ): Promise<DeleteSessionUsecaseOutput>;
}
