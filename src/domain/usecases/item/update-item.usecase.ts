import { Usecase } from '../usecase';

export type UpdateItemUsecaseInput = {
  characterId?: number;
  description: string;
  id: number;
  image?: string;
  name: string;
  sessionId?: number;
  weight: number;
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
