import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignInUsecase } from '@src/domain/usecases/user/sign-in.usecase';

import { SignInInputDto } from './dto/in/sign-in.dto';
import { SignInOutputDto } from './dto/out/sign-in.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly signInUsecase: SignInUsecase) {}

  @Post('sign-in')
  @ApiOperation({
    description: 'Realiza o login do usuário.',
    summary: 'Realiza o login do usuário.',
  })
  @ApiDefaultResponse({
    description: 'Login realizado com sucesso.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async signIn(@Body() body: SignInInputDto): Promise<SignInOutputDto> {
    const { email, password } = body;

    const user = await this.signInUsecase.execute({
      email,
      password,
    });

    return {
      email: user.email,
      id: user.id,
      username: user.username,
    };
  }
}
