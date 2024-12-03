import { Usecase } from '../usecase';

export type DeleteInviteUsecaseInput = {
  id: number;
};

export type DeleteInviteUsecaseOutput = void;

export abstract class DeleteInviteUsecase extends Usecase<
  DeleteInviteUsecaseInput,
  DeleteInviteUsecaseOutput
> {
  abstract execute(
    input: DeleteInviteUsecaseInput,
  ): Promise<DeleteInviteUsecaseOutput>;
}
