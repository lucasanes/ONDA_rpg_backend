import { Usecase } from '../usecase';

export type UpdateStatusCharacterUsecaseInput = {
  cd: number;
  currentHp: number;
  currentMp: number;
  currentMun: number;
  defense: number;
  hp: number;
  id: number;
  mp: number;
  mun: number;
  portrait: string | null;
};

export type UpdateStatusCharacterUsecaseOutput = void;

export abstract class UpdateStatusCharacterUsecase extends Usecase<
  UpdateStatusCharacterUsecaseInput,
  UpdateStatusCharacterUsecaseOutput
> {
  abstract execute(
    input: UpdateStatusCharacterUsecaseInput,
  ): Promise<UpdateStatusCharacterUsecaseOutput>;
}
