import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInviteInputDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'Email do usuário',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;
}
