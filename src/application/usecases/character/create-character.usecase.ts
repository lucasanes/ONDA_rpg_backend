import { Injectable } from '@nestjs/common';
import { CharacterRepository } from '@src/domain/repositories/character/character.repository';
import {
  CreateCharacterUsecase,
  CreateCharacterUsecaseInput,
  CreateCharacterUsecaseOutput,
} from '@src/domain/usecases/character/create-character.usecase';

@Injectable()
export class CreateCharacterUsecaseImpl implements CreateCharacterUsecase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(
    params: CreateCharacterUsecaseInput,
  ): Promise<CreateCharacterUsecaseOutput> {
    return await this.characterRepository.save(params);
  }
}
