import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateCharacterUsecase } from '@src/domain/usecases/character/create-character.usecase';
import { DeleteCharacterUsecase } from '@src/domain/usecases/character/delete-character.usecase';
import { UpdateCharacterUsecase } from '@src/domain/usecases/character/update-character.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { UserType } from '@src/infra/types/user.type';
import { CreateCharacterInputDto } from './dto/in/create-character.dto';
import { UpdateCharacterInputDto } from './dto/in/update-character.dto';
import { CreateCharacterOutputDto } from './dto/out/create-character.dto';

@ApiTags('Character')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('characters')
export class CharacterController {
  constructor(
    private readonly createCharacterUsecase: CreateCharacterUsecase,
    private readonly updateCharacterUsecase: UpdateCharacterUsecase,
    private readonly deleteCharacterUsecase: DeleteCharacterUsecase,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Criar um novo personagem.',
    summary: 'Criar um novo personagem.',
  })
  @ApiDefaultResponse({
    description: 'Personagem criado.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async createCharacter(
    @User() user: UserType,
    @Body() body: CreateCharacterInputDto,
  ): Promise<CreateCharacterOutputDto> {
    const character = await this.createCharacterUsecase.execute({
      ...body,
      userId: user.id,
    });

    return {
      age: character.mainCharacter.age,
      class: character.mainCharacter.class,
      divinity: character.mainCharacter.divinity,
      hp: character.statusCharacter.hp,
      id: character.id,
      mp: character.statusCharacter.mp,
      name: character.mainCharacter.name,
      origin: character.mainCharacter.origin,
      portrait: character.statusCharacter.portrait,
      race: character.mainCharacter.race,
      xp: character.mainCharacter.xp,
    };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Atualizar um personagem.',
    summary: 'Atualizar um personagem.',
  })
  @ApiDefaultResponse({
    description: 'Personagem atualizado.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateCharacter(
    @Param('id') id: number,
    @Body() body: UpdateCharacterInputDto,
  ): Promise<void> {
    await this.updateCharacterUsecase.execute({
      id,
      ...body,
    });
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Deletar um personagem.',
    summary: 'Deletar um personagem.',
  })
  @ApiDefaultResponse({
    description: 'Personagem deletado.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async deleteCharacter(@Param('id') id: number): Promise<void> {
    await this.deleteCharacterUsecase.execute({
      id,
    });
  }
}
