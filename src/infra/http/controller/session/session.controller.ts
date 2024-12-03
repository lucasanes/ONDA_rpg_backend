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

import { CreateSessionUsecase } from '@src/domain/usecases/session/create-session.usecase';
import { DeleteSessionUsecase } from '@src/domain/usecases/session/delete-session.usecase';
import { GetSessionUsecase } from '@src/domain/usecases/session/get-session.usecase';
import { UpdateSessionUsecase } from '@src/domain/usecases/session/update-session.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { UserType } from '@src/infra/types/user.type';
import { UpsertSessionInputDto } from './dto/in/upsert-session.dto';
import { GetSessionOutputDto } from './dto/out/get-session.dto';
import { UpsertSessionOutputDto } from './dto/out/upsert-session.dto';

@ApiTags('Session')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('sessions')
export class SessionController {
  constructor(
    private readonly getSessionUsecase: GetSessionUsecase,
    private readonly createSessionUsecase: CreateSessionUsecase,
    private readonly updateSessionUsecase: UpdateSessionUsecase,
    private readonly deleteSessionUsecase: DeleteSessionUsecase,
  ) {}

  @Get(':id')
  @ApiOperation({
    description: 'Buscar uma sessão.',
    summary: 'Buscar uma sessão.',
  })
  @ApiResponse({
    description: 'Sessão encontrada.',
    status: 200,
    type: GetSessionOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async getSession(
    @User() user: UserType,
    @Param('id') id: number,
  ): Promise<GetSessionOutputDto> {
    return await this.getSessionUsecase.execute({
      id,
      userId: user.id,
    });
  }

  @Post()
  @ApiOperation({
    description: 'Criar uma nova sessão.',
    summary: 'Criar uma nova sessão.',
  })
  @ApiResponse({
    description: 'Sessão criada.',
    status: 201,
    type: UpsertSessionOutputDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async createSession(
    @User() user: UserType,
    @Body() body: UpsertSessionInputDto,
  ): Promise<UpsertSessionOutputDto> {
    const { description, name } = body;

    return await this.createSessionUsecase.execute({
      description,
      name,
      userId: user.id,
    });
  }

  @Put(':id')
  @ApiOperation({
    description: 'Atualizar uma sessão.',
    summary: 'Atualizar uma sessão.',
  })
  @ApiResponse({
    description: 'Sessão atualizada.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateSession(
    @Param('id') id: number,
    @Body() body: UpsertSessionInputDto,
  ): Promise<void> {
    const { description, name } = body;

    await this.updateSessionUsecase.execute({
      description,
      id,
      name,
    });
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Deletar uma sessão.',
    summary: 'Deletar uma sessão.',
  })
  @ApiResponse({
    description: 'Sessão deletada.',
    status: 204,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async deleteSession(@Param('id') id: number): Promise<void> {
    await this.deleteSessionUsecase.execute({
      id,
    });
  }
}
