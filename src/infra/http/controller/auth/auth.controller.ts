import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SignInUsecase } from '@src/domain/usecases/auth/sign-in.usecase';

import { ChangePasswordUsecase } from '@src/domain/usecases/auth/change-password.usecase';
import { SendRecoveryUsecase } from '@src/domain/usecases/auth/send-recovery.usecase';
import { SignUpUsecase } from '@src/domain/usecases/auth/sign-up.usecase';
import { ValidateRecoveryUsecase } from '@src/domain/usecases/auth/validate-recovery.usecase';
import { ValidateTokenUsecase } from '@src/domain/usecases/auth/validate-token.usecase';
import { User } from '@src/infra/common/decorator/user.decorator';
import { UserType } from '@src/infra/types/user.type';
import { ChangePasswordInputDto } from './dto/in/change-password.dto';
import { SendRecoveryInputDto } from './dto/in/send-recovery.dto';
import { SignInInputDto } from './dto/in/sign-in.dto';
import { SignUpInputDto } from './dto/in/sign-up.dto';
import { ValidateRecoveryInputDto } from './dto/in/validate-recovery.dto';
import { MeOutputDto } from './dto/out/me.dto';
import { SignInOutputDto } from './dto/out/sign-in.dto';
import { ValidateRecoveryOutputDto } from './dto/out/validate-recovery.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUsecase: SignInUsecase,
    private readonly signUpUsecase: SignUpUsecase,
    private readonly sendRecoveryUsecase: SendRecoveryUsecase,
    private readonly validateRecoveryUsecase: ValidateRecoveryUsecase,
    private readonly changePasswordUsecase: ChangePasswordUsecase,
    private readonly validateTokenUsecase: ValidateTokenUsecase,
  ) {}

  @Get('me')
  @ApiOperation({
    description: 'Retorna os dados do usuário logado.',
    summary: 'Retorna os dados do usuário logado.',
  })
  @ApiDefaultResponse({
    description: 'Dados do usuário logado.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async me(@User() user: UserType): Promise<MeOutputDto> {
    return user;
  }

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
    const { email, username, password } = body;

    await this.signUpUsecase.execute({
      email,
      password,
      username,
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
      token: response.token,
      user: response.user,
    };
  }

  @Post('send-recovery')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description: 'Envia um email para recuperação de senha.',
    summary: 'Envia um email para recuperação de senha.',
  })
  @ApiDefaultResponse({
    description: 'Email enviado com sucesso.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async sendRecovery(@Body() body: SendRecoveryInputDto): Promise<void> {
    const { email } = body;

    await this.sendRecoveryUsecase.execute({
      email,
    });
  }

  @Post('validate-recovery')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Valida o código de recuperação de senha.',
    summary: 'Valida o código de recuperação de senha.',
  })
  @ApiDefaultResponse({
    description: 'Código validado com sucesso.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async validateRecovery(
    @Body() body: ValidateRecoveryInputDto,
  ): Promise<ValidateRecoveryOutputDto> {
    const { email, code } = body;

    return await this.validateRecoveryUsecase.execute({
      code,
      email,
    });
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Altera a senha do usuário.',
    summary: 'Altera a senha do usuário.',
  })
  @ApiDefaultResponse({
    description: 'Senha alterada com sucesso.',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @ApiNotFoundResponse({
    description: 'Not Found.',
  })
  async changePassword(@Body() body: ChangePasswordInputDto): Promise<void> {
    const { userId, password } = body;

    await this.changePasswordUsecase.execute({
      password,
      userId,
    });
  }
}
