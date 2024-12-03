import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  UpdateStatusCharacterUsecase,
  UpdateStatusCharacterUsecaseInput,
  UpdateStatusCharacterUsecaseOutput,
} from '@src/domain/usecases/character/update-status-character.usecase';

@Injectable()
export class UpdateStatusCharacterUsecaseImpl
  implements UpdateStatusCharacterUsecase
{
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: UpdateStatusCharacterUsecaseInput,
  ): Promise<UpdateStatusCharacterUsecaseOutput> {
    const character = await this.characterRepository.getById(params.id);

    if (!character) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Personagem não encontrado.',
      });
    }

    await this.characterRepository.updateStatus({
      ...params,
    });
  }
}
