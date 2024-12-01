import { Usecase } from '../usecase';

export type SignUpUsecaseInput = {
  username: string;
  email: string;
  password: string;
};

export type SignUpUsecaseOutput = void;

export abstract class SignUpUsecase extends Usecase<
  SignUpUsecaseInput,
  SignUpUsecaseOutput
> {
  abstract execute(input: SignUpUsecaseInput): Promise<SignUpUsecaseOutput>;
}
