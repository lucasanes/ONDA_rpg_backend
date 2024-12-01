import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import {
  SendRecoveryUsecase,
  SendRecoveryUsecaseInput,
  SendRecoveryUsecaseOutput,
} from '@src/domain/usecases/auth/send-recovery.usecase';
import generateCode from '@src/infra/utils/generate-code';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendRecoveryUsecaseImpl implements SendRecoveryUsecase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(
    params: SendRecoveryUsecaseInput,
  ): Promise<SendRecoveryUsecaseOutput> {
    const { email } = params;

    const user = await this.authRepository.findUserBy({
      email,
    });

    if (!user) {
      throw this.exceptionService.notFoundException({
        message: 'Usuário não encontrado.',
        code_error: 'NOT_FOUND',
      });
    }

    const code = generateCode();

    if (!process.env.EMAIL_PASSWORD) {
      throw this.exceptionService.internalServerErrorException({
        message: 'Senha de email não configurada.',
        code_error: 'ENV_NOT_FOUND',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'ondarpg@gmail.com',
      to: email,
      subject: 'ONDA - Recuperar Senha',
      text: `Seu código de recuperação é: ${code}`,
    };

    await transporter.sendMail(mailOptions);

    await this.authRepository.upsertRecovery({
      code,
      userId: user.id,
    });
  }
}
