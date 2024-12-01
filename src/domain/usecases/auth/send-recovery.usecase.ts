import { Usecase } from '../usecase';

export type SendRecoveryUsecaseInput = {
  email: string;
};

export type SendRecoveryUsecaseOutput = void;

export abstract class SendRecoveryUsecase extends Usecase<
  SendRecoveryUsecaseInput,
  SendRecoveryUsecaseOutput
> {
  abstract execute(
    input: SendRecoveryUsecaseInput,
  ): Promise<SendRecoveryUsecaseOutput>;
}
