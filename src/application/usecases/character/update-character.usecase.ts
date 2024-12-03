import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  UpdateCharacterUsecase,
  UpdateCharacterUsecaseInput,
  UpdateCharacterUsecaseOutput,
} from '@src/domain/usecases/character/update-character.usecase';

@Injectable()
export class UpdateCharacterUsecaseImpl implements UpdateCharacterUsecase {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: UpdateCharacterUsecaseInput,
  ): Promise<UpdateCharacterUsecaseOutput> {
    const character = await this.characterRepository.getById(params.id);

    if (!character) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Personagem não encontrado.',
      });
    }

    if (params.isPublic == undefined && params.sessionId == undefined) {
      throw this.exceptionService.businessException(
        {
          code_error: 'INVALID_PARAMS',
          message:
            'Você precisa enviar ao menos um destes campos: {isPublic, sessionId}.',
        },
        400,
      );
    }

    await this.characterRepository.update({
      ...params,
    });
  }
}
