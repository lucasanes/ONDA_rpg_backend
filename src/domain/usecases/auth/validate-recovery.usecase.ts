import { Usecase } from '../usecase';

export type ValidateRecoveryUsecaseInput = {
  email: string;
  code: string;
};

export type ValidateRecoveryUsecaseOutput = {
  userId: number;
};

export abstract class ValidateRecoveryUsecase extends Usecase<
  ValidateRecoveryUsecaseInput,
  ValidateRecoveryUsecaseOutput
> {
  abstract execute(
    input: ValidateRecoveryUsecaseInput,
  ): Promise<ValidateRecoveryUsecaseOutput>;
}
