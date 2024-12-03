import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCharacterOutputDto {
  @ApiProperty({
    description: 'ID da sessão',
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome do personagem',
    example: 'Nome do personagem',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Nível de experiência do personagem',
    example: 1,
  })
  @IsNumber()
  xp: number;

  @ApiProperty({
    description: 'Idade do personagem',
    example: 1,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Classe do personagem',
    example: 'Classe do personagem',
  })
  @IsString()
  class: string;

  @ApiProperty({
    description: 'Raça do personagem',
    example: 'Raça do personagem',
  })
  @IsString()
  race: string;

  @ApiProperty({
    description: 'Origem do personagem',
    example: 'Origem do personagem',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Divindade do personagem',
    example: 'Divindade do personagem',
  })
  @IsString()
  divinity: string;

  @ApiProperty({
    description: 'Vida do personagem',
    example: 1,
  })
  @IsNumber()
  hp: number;

  @ApiProperty({
    description: 'Mana do personagem',
    example: 1,
  })
  @IsNumber()
  mp: number;

  @ApiProperty({
    description: 'Portrait do personagem',
    example: 1,
  })
  @IsString()
  @IsOptional()
  portrait?: string;
}
