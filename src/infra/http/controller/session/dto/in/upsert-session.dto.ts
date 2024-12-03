import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertSessionInputDto {
  @ApiProperty({
    description: 'Nome da sessão',
    example: 'Nome da sessão',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição da sessão',
    example: 'Descrição da sessão',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
