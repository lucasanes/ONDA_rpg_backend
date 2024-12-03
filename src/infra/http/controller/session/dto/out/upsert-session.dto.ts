import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertSessionOutputDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da sessão',
    example: 'Nome da sessão',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição da sessão',
    example: 'Descrição da sessão',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'ID do usuário criador da sessão',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Jogadores da sessão',
    example: ['player1', 'player2'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  players?: string[];

  @ApiProperty({
    description: 'Data de criação da sessão',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização da sessão',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  updatedAt: Date;
}
