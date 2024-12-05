import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpsertItemInputDto {
  @ApiProperty({
    description: 'Nome do item',
    example: 'Nome do item',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do item',
    example: 'Descrição do item',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Peso do item',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({
    description: 'Imagem do item',
    example: 'Imagem do item',
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Sessão associada ao item',
    example: 'Sessão associada ao item',
  })
  @IsOptional()
  @IsNumber()
  sessionId?: number;

  @ApiProperty({
    description: 'Personagem associado ao item',
    example: 'Personagem associado ao item',
  })
  @IsOptional()
  @IsNumber()
  characterId?: number;
}
