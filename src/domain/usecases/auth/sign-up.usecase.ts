import { Usecase } from '../usecase';

export type SignUpUsecaseInput = {
  email: string;
  password: string;
  username: string;
};

export type SignUpUsecaseOutput = void;

export abstract class SignUpUsecase extends Usecase<
  SignUpUsecaseInput,
  SignUpUsecaseOutput
> {
  abstract execute(input: SignUpUsecaseInput): Promise<SignUpUsecaseOutput>;
}
