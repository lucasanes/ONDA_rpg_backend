import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { User } from '@src/infra/entities/user.entity';
import { decode, verify } from 'jsonwebtoken';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
    private readonly exceptionService: ExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'UNAUTHORIZED',
        message: 'Você não está autenticado.',
      });
    }

    const token = this.extractToken(authHeader);

    if (!token) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'UNAUTHORIZED',
        message: 'Token não encontrado ou inválido.',
      });
    }

    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      verify(token, secret);

      const payload = decode(token) as { id: number };

      if (!payload) {
        throw this.exceptionService.unauthorizedException({
          code_error: 'UNAUTHORIZED',
          message: 'Token inválido.',
        });
      }

      const user = await this.dataSource.getRepository(User).findOne({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw this.exceptionService.unauthorizedException({
          code_error: 'UNAUTHORIZED',
          message: 'Usuário não encontrado.',
        });
      }
    } catch (error) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'UNAUTHORIZED',
        message: error.message,
      });
    }
    return true;
  }

  private extractToken(authHeader: string): string | null {
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; // Retorna apenas o token
    }
    return null; // Retorna null se o formato não for válido
  }
}
