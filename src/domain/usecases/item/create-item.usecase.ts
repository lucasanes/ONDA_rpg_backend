import { ItemModel } from '@src/domain/model/item.model';
import { Usecase } from '../usecase';

export type CreateItemUsecaseInput = {
  characterId?: number;
  description?: string;
  image: string;
  name: string;
  sessionId?: number;
  weight: number;
};

export type CreateItemUsecaseOutput = ItemModel;

export abstract class CreateItemUsecase extends Usecase<
  CreateItemUsecaseInput,
  CreateItemUsecaseOutput
> {
  abstract execute(
    input: CreateItemUsecaseInput,
  ): Promise<CreateItemUsecaseOutput>;
}
