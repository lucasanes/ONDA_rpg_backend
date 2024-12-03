import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserInputDto {
  @ApiProperty({
    description: 'Senha atual do usuário.',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'Nome do usuário.',
    example: 'John Doe',
  })
  @Transform(({ value }) =>
    value?.trim() === '' ? undefined : value.toLowerCase(),
  )
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'E-mail do usuário.',
    example: 'onda@gmail.com',
  })
  @Transform(({ value }) =>
    value?.trim() === '' ? undefined : value.toLowerCase(),
  )
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    description: 'Senha do usuário.',
    example: '123456',
  })
  @Transform(({ value }) => (value?.trim() === '' ? undefined : value))
  @IsOptional()
  @IsString()
  password?: string;
}
