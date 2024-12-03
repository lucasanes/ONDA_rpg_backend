import { Usecase } from '../usecase';

export type UpdateUserUsecaseInput = {
  currentPassword: string;
  email?: string;
  id: number;
  password?: string;
  username?: string;
};

export type UpdateUserUsecaseOutput = void;

export abstract class UpdateUserUsecase extends Usecase<
  UpdateUserUsecaseInput,
  UpdateUserUsecaseOutput
> {
  abstract execute(
    input: UpdateUserUsecaseInput,
  ): Promise<UpdateUserUsecaseOutput>;
}
