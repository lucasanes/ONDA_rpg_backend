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
    const dashboard = await this.getDashboardUsecase.execute({
      userId: user.id,
    });

    return {
      ...dashboard,
      characters: dashboard.characters.map((character) => ({
        age: character.mainCharacter.age,
        class: character.mainCharacter.class,
        createdAt: character.createdAt,
        currentHp: character.statusCharacter.currentHp,
        currentMp: character.statusCharacter.currentMp,
        divinity: character.mainCharacter.divinity,
        hp: character.statusCharacter.hp,
        id: character.id,
        isPublic: character.isPublic,
        mp: character.statusCharacter.mp,
        name: character.mainCharacter.name,
        origin: character.mainCharacter.origin,
        portrait: character.statusCharacter.portrait,
        race: character.mainCharacter.race,
        sessionId: character.sessionId,
        sessionName: character.session.name,
        to: character.mainCharacter.to,
        tp: character.mainCharacter.tp,
        ts: character.mainCharacter.ts,
        updatedAt: character.updatedAt,
        userId: character.userId,
        xp: character.mainCharacter.xp,
      })),
    };
  }
}
