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

import { CreateSessionUsecase } from '@src/domain/usecases/session/create-session.usecase';
import { DeleteSessionUsecase } from '@src/domain/usecases/session/delete-session.usecase';
import { UpdateSessionUsecase } from '@src/domain/usecases/session/update-session.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { UserType } from '@src/infra/types/user.type';
import { UpsertSessionInputDto } from './dto/in/upsert-session.dto';
import { UpsertSessionOutputDto } from './dto/out/upsert-session.dto';

@ApiTags('Session')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('sessions')
export class SessionController {
  constructor(
    private readonly createSessionUsecase: CreateSessionUsecase,
    private readonly updateSessionUsecase: UpdateSessionUsecase,
    private readonly deleteSessionUsecase: DeleteSessionUsecase,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Criar uma nova sessão.',
    summary: 'Criar uma nova sessão.',
  })
  @ApiDefaultResponse({
    description: 'Sessão criada.',
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

  @Put(':sessionId')
  @ApiOperation({
    description: 'Atualizar uma sessão.',
    summary: 'Atualizar uma sessão.',
  })
  @ApiDefaultResponse({
    description: 'Sessão atualizada.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateSession(
    @Param('sessionId') sessionId: number,
    @Body() body: UpsertSessionInputDto,
  ): Promise<void> {
    const { description, name } = body;

    await this.updateSessionUsecase.execute({
      description,
      name,
      sessionId,
    });
  }

  @Delete(':sessionId')
  @ApiOperation({
    description: 'Deletar uma sessão.',
    summary: 'Deletar uma sessão.',
  })
  @ApiDefaultResponse({
    description: 'Sessão deletada.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async deleteSession(@Param('sessionId') sessionId: number): Promise<void> {
    await this.deleteSessionUsecase.execute({
      sessionId,
    });
  }
}
