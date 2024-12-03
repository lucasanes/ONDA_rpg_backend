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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AcceptInviteUsecase } from '@src/domain/usecases/invite/accept-invite.usecase';
import { CreateInviteUsecase } from '@src/domain/usecases/invite/create-invite.usecase';
import { DeleteInviteUsecase } from '@src/domain/usecases/invite/delete-invite.usecase';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { AcceptInviteInputDto } from './dto/in/accept-invite.dto';
import { CreateInviteInputDto } from './dto/in/create-invite.dto';

@ApiTags('Invite')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('invites')
export class InviteController {
  constructor(
    private readonly createInviteUsecase: CreateInviteUsecase,
    private readonly acceptInviteUsecase: AcceptInviteUsecase,
    private readonly deleteInviteUsecase: DeleteInviteUsecase,
  ) {}

  @Post()
  @ApiOperation({
    description: 'Criar um novo convite.',
    summary: 'Criar um novo convite.',
  })
  @ApiResponse({
    description: 'Convite criado.',
    status: 201,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async createInvite(@Body() body: CreateInviteInputDto): Promise<void> {
    await this.createInviteUsecase.execute({
      ...body,
    });
  }

  @Put(':id')
  @ApiOperation({
    description: 'Aceitar um convite.',
    summary: 'Aceitar um convite.',
  })
  @ApiResponse({
    description: 'Convite aceito.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async acceptInvite(
    @Param('id') id: number,
    @Body() body: AcceptInviteInputDto,
  ): Promise<void> {
    await this.acceptInviteUsecase.execute({
      id,
      ...body,
    });
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Deletar um convite.',
    summary: 'Deletar um convite.',
  })
  @ApiResponse({
    description: 'Convite deletado.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async deleteInvite(@Param('id') id: number): Promise<void> {
    await this.deleteInviteUsecase.execute({
      id,
    });
  }
}
