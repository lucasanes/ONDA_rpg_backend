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

    const user = await this.authRepository.getUserBy({
      email,
    });

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'NOT_FOUND',
        message: 'Email não encontrado.',
      });
    }

    const code = generateCode();

    if (!process.env.EMAIL_PASSWORD) {
      throw this.exceptionService.internalServerErrorException({
        code_error: 'ENV_NOT_FOUND',
        message: 'Senha de email não configurada.',
      });
    }

    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.EMAIL_PASSWORD,
        user: process.env.EMAIL_USER,
      },
      service: 'gmail',
    });

    const mailOptions = {
      from: 'ondarpg@gmail.com',
      subject: 'ONDA - Recuperar Senha',
      text: `Seu código de recuperação é: ${code}`,
      to: email,
    };

    await transporter.sendMail(mailOptions);

    await this.authRepository.upsertRecovery({
      code,
      userId: user.id,
    });
  }
}
