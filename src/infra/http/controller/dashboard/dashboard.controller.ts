import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetDashboardUsecase } from '@src/domain/usecases/dashboard/get-dashboard.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { UserType } from '@src/infra/types/user.type';
import { GetDashboardOutputDto } from './dto/out/get-dashboard.dto';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardUsecase: GetDashboardUsecase) {}

  @Get('')
  @ApiOperation({
    description: 'Retorna o dashboard do usuário.',
    summary: 'Retorna o dashboard do usuário.',
  })
  @ApiDefaultResponse({
    description: 'Dashboard do usuário.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async getDashboard(@User() user: UserType): Promise<GetDashboardOutputDto> {
    return await this.getDashboardUsecase.execute({
      userId: user.id,
    });
  }
}
