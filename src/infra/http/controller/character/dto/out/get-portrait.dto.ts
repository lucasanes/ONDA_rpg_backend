import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class GetCharacterPortraitOutputDto {
  @ApiProperty({
    description: 'ID do personagem',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Indica se o personagem é público',
    example: true,
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    description: 'ID do usuário proprietário do personagem',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'ID da sessão associada ao personagem',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  sessionId?: number;

  @ApiProperty({
    description: 'Nome do personagem',
    example: 'Nome do personagem',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Portrait do personagem',
    example: 'Portrait do personagem',
  })
  @IsUrl()
  portrait: string | null;

  @ApiProperty({
    description: 'HP total do personagem',
    example: 100,
  })
  @IsNumber()
  hp: number;

  @ApiProperty({
    description: 'HP atual do personagem',
    example: 50,
  })
  @IsNumber()
  currentHp: number;

  @ApiProperty({
    description: 'MP total do personagem',
    example: 50,
  })
  @IsNumber()
  mp: number;

  @ApiProperty({
    description: 'MP atual do personagem',
    example: 25,
  })
  @IsNumber()
  currentMp: number;

  @ApiProperty({
    description: 'Munição total do personagem',
    example: 50,
  })
  @IsNumber()
  mun: number;

  @ApiProperty({
    description: 'Munição atual do personagem',
    example: 25,
  })
  @IsNumber()
  currentMun: number;

  @ApiProperty({
    description: 'Moedas de Tibar do personagem',
    example: 10,
  })
  @IsNumber()
  tp: number;

  @ApiProperty({
    description: 'Moedas de Tibar de Prata do personagem',
    example: 10,
  })
  tc: number;

  @ApiProperty({
    description: 'Moedas de Tibar de Ouro do personagem',
    example: 10,
  })
  to: number;

  @ApiProperty({
    description: 'Data de criação do personagem',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do personagem',
    example: '2021-08-07T00:00:00.000Z',
  })
  @IsString()
  updatedAt: Date;
}
