import { Usecase } from '../usecase';

export type UpdateItemUsecaseInput = {
  characterId?: number;
  id: number;
  image: string;
  name: string;
  sessionId?: number;
};

export type UpdateItemUsecaseOutput = void;

export abstract class UpdateItemUsecase extends Usecase<
  UpdateItemUsecaseInput,
  UpdateItemUsecaseOutput
> {
  abstract execute(
    input: UpdateItemUsecaseInput,
  ): Promise<UpdateItemUsecaseOutput>;
}
