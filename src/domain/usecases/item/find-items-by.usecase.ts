import { ItemModel } from '@src/domain/model/item.model';
import { Usecase } from '../usecase';

export type FindItemsByUsecaseInput = {
  characterId?: number;
  sessionId?: number;
};

export type FindItemsByUsecaseOutput = ItemModel[];

export abstract class FindItemsByUsecase extends Usecase<
  FindItemsByUsecaseInput,
  FindItemsByUsecaseOutput
> {
  abstract execute(
    input: FindItemsByUsecaseInput,
  ): Promise<FindItemsByUsecaseOutput>;
}
