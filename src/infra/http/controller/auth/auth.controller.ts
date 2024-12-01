import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignInUsecase } from '@src/domain/usecases/auth/sign-in.usecase';

import { SignUpUsecase } from '@src/domain/usecases/auth/sign-up.usecase';
import { SignInInputDto } from './dto/in/sign-in.dto';
import { SignUpInputDto } from './dto/in/sign-up.dto';
import { SignInOutputDto } from './dto/out/sign-in.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUsecase: SignInUsecase,
    private readonly signUpUsecase: SignUpUsecase,
  ) {}

  @Post('sign-up')
  @ApiOperation({
    description: 'Realiza o cadastro do usuário.',
    summary: 'Realiza o cadastro do usuário.',
  })
  @ApiDefaultResponse({
    description: 'Cadastro realizado com sucesso.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async signUp(@Body() body: SignUpInputDto): Promise<void> {
    const { email, password, username } = body;

    await this.signUpUsecase.execute({
      email,
      username,
      password,
    });
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
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

    const response = await this.signInUsecase.execute({
      email,
      password,
    });

    return {
      user: response.user,
      token: response.token,
    };
  }
}
