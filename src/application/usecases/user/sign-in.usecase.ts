import { Injectable } from '@nestjs/common';
import { ExceptionService } from '@src/domain/exceptions/exception.interface';
import { UserRepository } from '@src/domain/repositories/user/user.repository';
import {
  SignInUsecase,
  SignInUsecaseInput,
  SignInUsecaseOutput,
} from '@src/domain/usecases/user/sign-in.usecase';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignInUsecaseImpl implements SignInUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async execute(params: SignInUsecaseInput): Promise<SignInUsecaseOutput> {
    const user = await this.userRepository.findUserBy({
      email: params.email,
    });

    if (!user) {
      throw this.exceptionService.notFoundException({
        code_error: 'USER_NOT_FOUND',
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw this.exceptionService.unauthorizedException({
        code_error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      });
    }

    return user;
  }
}
