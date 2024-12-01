import { UserModel } from '@src/domain/model/user.model';

import { Usecase } from '../usecase';

export type SignInUsecaseInput = {
  email: string;
  password: string;
};

export type SignInUsecaseOutput = UserModel;

export abstract class SignInUsecase extends Usecase<
  SignInUsecaseInput,
  SignInUsecaseOutput
> {
  abstract execute(input: SignInUsecaseInput): Promise<SignInUsecaseOutput>;
}
