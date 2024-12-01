import { Usecase } from '../usecase';

export type ChangePasswordUsecaseInput = {
  userId: number;
  password: string;
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
