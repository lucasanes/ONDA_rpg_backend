import { UserModel } from '@src/domain/model/user.model';
import { Usecase } from '../usecase';

export type ValidateTokenUsecaseInput = {
  token: string;
};

export type ValidateTokenUsecaseOutput = UserModel;

export abstract class ValidateTokenUsecase extends Usecase<
  ValidateTokenUsecaseInput,
  ValidateTokenUsecaseOutput
> {
  abstract execute(
    input: ValidateTokenUsecaseInput,
  ): Promise<ValidateTokenUsecaseOutput>;
}
