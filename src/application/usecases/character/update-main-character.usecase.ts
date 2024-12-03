import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  UpdateMainCharacterUsecase,
  UpdateMainCharacterUsecaseInput,
  UpdateMainCharacterUsecaseOutput,
} from '@src/domain/usecases/character/update-main-character.usecase';

@Injectable()
export class UpdateMainCharacterUsecaseImpl
  implements UpdateMainCharacterUsecase
{
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: UpdateMainCharacterUsecaseInput,
  ): Promise<UpdateMainCharacterUsecaseOutput> {
    const character = await this.characterRepository.getById(params.id);

    if (!character) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Personagem não encontrado.',
      });
    }

    await this.characterRepository.updateMain({
      ...params,
    });
  }
}
