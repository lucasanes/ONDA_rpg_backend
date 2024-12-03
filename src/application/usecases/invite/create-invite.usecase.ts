import { Injectable } from '@nestjs/common';
import { InviteRepository } from '@src/domain/repositories/invite/invite.repository';
import {
  CreateInviteUsecase,
  CreateInviteUsecaseInput,
  CreateInviteUsecaseOutput,
} from '@src/domain/usecases/invite/create-invite.usecase';

@Injectable()
export class CreateInviteUsecaseImpl implements CreateInviteUsecase {
  constructor(private readonly inviteRepository: InviteRepository) {}

  async execute(
    params: CreateInviteUsecaseInput,
  ): Promise<CreateInviteUsecaseOutput> {
    return await this.inviteRepository.save(params);
  }
}
