import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateCharacterUsecase } from '@src/domain/usecases/character/create-character.usecase';
import { DeleteCharacterUsecase } from '@src/domain/usecases/character/delete-character.usecase';
import { GetCharacterPortraitUsecase } from '@src/domain/usecases/character/get-character-portrait.usecase';
import { GetCharacterUsecase } from '@src/domain/usecases/character/get-character.usecase';
import { UpdateCharacterUsecase } from '@src/domain/usecases/character/update-character.usecase';
import { UpdateMainCharacterUsecase } from '@src/domain/usecases/character/update-main-character.usecase';
import { UpdateStatusCharacterUsecase } from '@src/domain/usecases/character/update-status-character.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { UserType } from '@src/infra/types/user.type';
import { CreateCharacterInputDto } from './dto/in/create-character.dto';
import { UpdateCharacterInputDto } from './dto/in/update-character.dto';
import { UpdateMainCharacterInputDto } from './dto/in/update-main-character.dto';
import { UpdateStatusCharacterInputDto } from './dto/in/update-status-character.dto';
import { CreateCharacterOutputDto } from './dto/out/create-character.dto';
import { GetCharacterOutputDto } from './dto/out/get-character.dto';
import { GetCharacterPortraitOutputDto } from './dto/out/get-portrait.dto';

@ApiTags('Character')
@ApiBearerAuth()
@Controller('characters')
export class CharacterController {
  constructor(
    private readonly getCharacterPortraitUsecase: GetCharacterPortraitUsecase,
    private readonly getCharacterUsecase: GetCharacterUsecase,
    private readonly createCharacterUsecase: CreateCharacterUsecase,
    private readonly updateCharacterUsecase: UpdateCharacterUsecase,
    private readonly updateMainCharacterUsecase: UpdateMainCharacterUsecase,
    private readonly updateStatusCharacterUsecase: UpdateStatusCharacterUsecase,
    private readonly deleteCharacterUsecase: DeleteCharacterUsecase,
  ) {}

  @Get(':id')
  @UseGuards()
  @ApiOperation({
    description: 'Buscar um personagem.',
    summary: 'Buscar um personagem.',
  })
  @ApiResponse({
    description: 'Personagem encontrado.',
    status: 200,
    type: GetCharacterOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async getCharacter(
    @User() user: UserType | null,
    @Param('id') id: number,
  ): Promise<GetCharacterOutputDto> {
    const response = await this.getCharacterUsecase.execute({
      id,
      userId: user ? user.id : null,
    });

    return {
      character: response.character,
      hasPermission: response.hasPermission,
    };
  }

  @Get(':id/portrait')
  @UseGuards()
  @ApiOperation({
    description: 'Buscar portrait de um personagem.',
    summary: 'Buscar portrait de um personagem.',
  })
  @ApiResponse({
    description: 'Portrait do personagem encontrado.',
    status: 200,
    type: GetCharacterOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async getCharacterPortrait(
    @Param('id') id: number,
  ): Promise<GetCharacterPortraitOutputDto> {
    const character = await this.getCharacterPortraitUsecase.execute({
      id,
    });

    return {
      createdAt: character.createdAt,
      currentHp: character.statusCharacter.currentHp,
      currentMp: character.statusCharacter.currentMp,
      currentMun: character.statusCharacter.currentMun,
      hp: character.statusCharacter.hp,
      id: character.statusCharacter.id,
      isPublic: character.isPublic,
      moldure: character.statusCharacter.moldure,
      mp: character.statusCharacter.mp,
      mun: character.statusCharacter.mun,
      name: character.mainCharacter.name,
      portrait: character.statusCharacter.portrait,
      sessionId: character.sessionId,
      tc: character.mainCharacter.tc,
      to: character.mainCharacter.to,
      tp: character.mainCharacter.tp,
      updatedAt: character.updatedAt,
      userId: character.userId,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Criar um novo personagem.',
    summary: 'Criar um novo personagem.',
  })
  @ApiResponse({
    description: 'Personagem criado.',
    status: 201,
    type: CreateCharacterOutputDto,
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
      ...character,
      ...character.mainCharacter,
      ...character.statusCharacter,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Atualizar um personagem.',
    summary: 'Atualizar um personagem.',
  })
  @ApiResponse({
    description: 'Personagem atualizado.',
    status: 200,
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

  @Put(':id/main')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Atualizar as informações principais de um personagem.',
    summary: 'Atualizar as informações principais de um personagem.',
  })
  @ApiResponse({
    description: 'Personagem atualizado.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateMainCharacter(
    @Param('id') id: number,
    @Body() body: UpdateMainCharacterInputDto,
  ): Promise<void> {
    await this.updateMainCharacterUsecase.execute({
      id,
      ...body,
    });
  }

  @Put(':id/status')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Atualizar os status de um personagem.',
    summary: 'Atualizar os status de um personagem.',
  })
  @ApiResponse({
    description: 'Personagem atualizado.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateStatusCharacter(
    @Param('id') id: number,
    @Body() body: UpdateStatusCharacterInputDto,
  ): Promise<void> {
    await this.updateStatusCharacterUsecase.execute({
      id,
      ...body,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    description: 'Deletar um personagem.',
    summary: 'Deletar um personagem.',
  })
  @ApiResponse({
    description: 'Personagem deletado.',
    status: 204,
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
