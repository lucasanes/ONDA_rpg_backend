import { Injectable } from '@nestjs/common';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';
import {
  DeleteInviteUsecase,
  DeleteInviteUsecaseInput,
  DeleteInviteUsecaseOutput,
} from '@src/domain/usecases/invite/delete-invite.usecase';

@Injectable()
export class DeleteInviteUsecaseImpl implements DeleteInviteUsecase {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async execute(
    params: DeleteInviteUsecaseInput,
  ): Promise<DeleteInviteUsecaseOutput> {
    await this.inviteRepository.delete(params.id);
  }
}
