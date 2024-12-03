import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExceptionServiceImpl } from '@src/infra/exception/exception.service';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const authorization = request.headers['authorization'];

  const exceptionService = new ExceptionServiceImpl();

  if (!authorization) {
    throw exceptionService.unauthorizedException({
      code_error: 'UNAUTHORIZED',
      message: 'Token não encontrado.',
    });
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    throw exceptionService.unauthorizedException({
      code_error: 'UNAUTHORIZED',
      message: 'Token inválido.',
    });
  }

  const jwtService = new JwtService();
  const user = jwtService.decode(token);

  if (!user) {
    throw exceptionService.unauthorizedException({
      code_error: 'UNAUTHORIZED',
      message: 'Usuário não encontrado.',
    });
  }

  return user;
});
