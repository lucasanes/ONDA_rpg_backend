import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GetDashboardUsecase } from '@src/domain/usecases/dashboard/get-dashboard.usecase';
import { AuthGuard } from '@src/infra/common/guards/auth.guard';
import { GetDashboardOutputDto } from './dto/out/me.dto';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardUsecase: GetDashboardUsecase) {}

  @Get(':userId')
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
  async getDashboard(
    @Param('userId') userId: number,
  ): Promise<GetDashboardOutputDto> {
    return await this.getDashboardUsecase.execute({
      userId,
    });
  }
}
