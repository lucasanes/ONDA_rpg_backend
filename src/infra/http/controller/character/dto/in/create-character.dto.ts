import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCharacterInputDto {
  @ApiProperty({
    description: 'Nome do personagem',
    example: 'Nome do personagem',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Nível de experiência do personagem',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  xp: number;

  @ApiProperty({
    description: 'Idade do personagem',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    description: 'Classe do personagem',
    example: 'Classe do personagem',
  })
  @IsString()
  @IsNotEmpty()
  class: string;

  @ApiProperty({
    description: 'Raça do personagem',
    example: 'Raça do personagem',
  })
  @IsString()
  @IsNotEmpty()
  race: string;

  @ApiProperty({
    description: 'Origem do personagem',
    example: 'Origem do personagem',
  })
  @IsString()
  @IsNotEmpty()
  origin: string;

  @ApiProperty({
    description: 'Divindade do personagem',
    example: 'Divindade do personagem',
  })
  @IsString()
  @IsNotEmpty()
  divinity: string;

  @ApiProperty({
    description: 'Vida do personagem',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  hp: number;

  @ApiProperty({
    description: 'Mana do personagem',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  mp: number;

  @ApiProperty({
    description: 'Portrait do personagem',
    example: 1,
  })
  @IsString()
  @IsOptional()
  portrait?: string;
}
