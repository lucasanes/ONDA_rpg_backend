import { Usecase } from '../usecase';

export type ValidateRecoveryUsecaseInput = {
  code: string;
  email: string;
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
