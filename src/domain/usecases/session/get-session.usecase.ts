import { SessionModel } from '@src/domain/model/session.model';
import { Usecase } from '../usecase';

export type GetSessionUsecaseInput = {
  id: number;
  userId: number;
};

export type GetSessionUsecaseOutput = SessionModel;

export abstract class GetSessionUsecase extends Usecase<
  GetSessionUsecaseInput,
  GetSessionUsecaseOutput
> {
  abstract execute(
    input: GetSessionUsecaseInput,
  ): Promise<GetSessionUsecaseOutput>;
}
