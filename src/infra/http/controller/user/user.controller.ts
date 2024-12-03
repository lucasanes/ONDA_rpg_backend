import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateUserUsecase } from '@src/domain/usecases/user/update-user.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { UserType } from '@src/infra/types/user.type';
import { UpdateUserInputDto } from './dto/in/update-user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly updateUserUsecase: UpdateUserUsecase) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Altera a senha do usuário.',
    summary: 'Altera a senha do usuário.',
  })
  @ApiResponse({
    description: 'Senha alterada com sucesso.',
    status: 200,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async updateUser(
    @User() user: UserType,
    @Body() body: UpdateUserInputDto,
  ): Promise<void> {
    await this.updateUserUsecase.execute({
      ...body,
      id: user.id,
    });
  }
}
