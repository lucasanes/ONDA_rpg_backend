import { Usecase } from '../usecase';

export type AcceptInviteUsecaseInput = {
  characterId: number;
  id: number;
};

export type AcceptInviteUsecaseOutput = void;

export abstract class AcceptInviteUsecase extends Usecase<
  AcceptInviteUsecaseInput,
  AcceptInviteUsecaseOutput
> {
  abstract execute(
    input: AcceptInviteUsecaseInput,
  ): Promise<AcceptInviteUsecaseOutput>;
}
