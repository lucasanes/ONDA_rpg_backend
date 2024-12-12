import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateIf,
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
  @IsNotEmpty()
  @IsString()
  description: string;

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
  @IsOptional()
  @ValidateIf((o) => o.image !== '' && o.image !== null)
  @IsUrl()
  image?: string;

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
