import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  DeleteCharacterUsecase,
  DeleteCharacterUsecaseInput,
  DeleteCharacterUsecaseOutput,
} from '@src/domain/usecases/character/delete-character.usecase';

@Injectable()
export class DeleteCharacterUsecaseImpl implements DeleteCharacterUsecase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(
    params: DeleteCharacterUsecaseInput,
  ): Promise<DeleteCharacterUsecaseOutput> {
    await this.characterRepository.delete(params.id);
  }
}
