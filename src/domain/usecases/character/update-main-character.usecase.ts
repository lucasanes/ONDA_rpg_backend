import { Usecase } from '../usecase';

export type UpdateMainCharacterUsecaseInput = {
  age: number;
  class: string;
  divinity: string;
  id: number;
  name: string;
  origin: string;
  race: string;
  to: number;
  tp: number;
  ts: number;
  xp: number;
};

export type UpdateMainCharacterUsecaseOutput = void;

export abstract class UpdateMainCharacterUsecase extends Usecase<
  UpdateMainCharacterUsecaseInput,
  UpdateMainCharacterUsecaseOutput
> {
  abstract execute(
    input: UpdateMainCharacterUsecaseInput,
  ): Promise<UpdateMainCharacterUsecaseOutput>;
}
