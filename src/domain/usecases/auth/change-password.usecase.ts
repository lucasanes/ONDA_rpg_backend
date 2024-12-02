import { Usecase } from '../usecase';

export type ChangePasswordUsecaseInput = {
  password: string;
  userId: number;
};

export type ChangePasswordUsecaseOutput = void;

export abstract class ChangePasswordUsecase extends Usecase<
  ChangePasswordUsecaseInput,
  ChangePasswordUsecaseOutput
> {
  abstract execute(
    input: ChangePasswordUsecaseInput,
  ): Promise<ChangePasswordUsecaseOutput>;
}
