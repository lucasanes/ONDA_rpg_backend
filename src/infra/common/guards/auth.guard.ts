import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { AuthRepository } from '@src/domain/repositories/auth/auth.repository';
import { decode, verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly exceptionService: ExceptionService,
    private readonly authRepository: AuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard: Executando validação.');

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      console.log('AuthGuard: Cabeçalho Authorization ausente.');
      throw this.exceptionService.unauthorizedException({
        code_error: 'UNAUTHORIZED',
        message: 'Você não está autenticado.',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('AuthGuard: Token ausente no cabeçalho.');
      throw this.exceptionService.unauthorizedException({
        code_error: 'UNAUTHORIZED',
        message: 'Token não fornecido.',
      });
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      verify(token, secret);

      const payload = decode(token) as { id: number };

      if (!payload) {
        console.log('AuthGuard: Payload inválido.');
        throw this.exceptionService.unauthorizedException({
          code_error: 'UNAUTHORIZED',
          message: 'Token inválido.',
        });
      }

      const user = await this.authRepository.findUserById(payload.id);
      if (!user) {
        console.log('AuthGuard: Usuário não encontrado.');
        throw this.exceptionService.unauthorizedException({
          code_error: 'UNAUTHORIZED',
          message: 'Usuário não encontrado.',
        });
      }

      console.log('AuthGuard: Validação concluída com sucesso.');
      return true;
    } catch (error) {
      console.log('AuthGuard: Erro durante a validação.', error.message);
      throw this.exceptionService.unauthorizedException({
        code_error: 'UNAUTHORIZED',
        message: 'Token inválido.',
      });
    }
  }
}
