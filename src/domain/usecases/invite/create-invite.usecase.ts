import { InviteModel } from '@src/domain/model/invite.model';
import { Usecase } from '../usecase';

export type CreateInviteUsecaseInput = {
  email: string;
  sessionId: number;
};

export type CreateInviteUsecaseOutput = InviteModel;

export abstract class CreateInviteUsecase extends Usecase<
  CreateInviteUsecaseInput,
  CreateInviteUsecaseOutput
> {
  abstract execute(
    input: CreateInviteUsecaseInput,
  ): Promise<CreateInviteUsecaseOutput>;
}
