import { SessionModel } from '@src/domain/model/session.model';
import { Usecase } from '../usecase';

export type CreateSessionUsecaseInput = {
  description: string;
  name: string;
  userId: number;
};

export type CreateSessionUsecaseOutput = SessionModel;

export abstract class CreateSessionUsecase extends Usecase<
  CreateSessionUsecaseInput,
  CreateSessionUsecaseOutput
> {
  abstract execute(
    input: CreateSessionUsecaseInput,
  ): Promise<CreateSessionUsecaseOutput>;
}
