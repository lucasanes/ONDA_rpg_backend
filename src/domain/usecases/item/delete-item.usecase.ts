import { Usecase } from '../usecase';

export type DeleteItemUsecaseInput = {
  id: number;
};

export type DeleteItemUsecaseOutput = void;

export abstract class DeleteItemUsecase extends Usecase<
  DeleteItemUsecaseInput,
  DeleteItemUsecaseOutput
> {
  abstract execute(
    input: DeleteItemUsecaseInput,
  ): Promise<DeleteItemUsecaseOutput>;
}
