import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

class MainCharacter {
  @ApiProperty({
    description: 'Nome do personagem principal',
    example: 'Nome do personagem',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Idade do personagem principal',
    example: 20,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    description: 'Classe do personagem principal',
    example: 'Mago',
  })
  @IsString()
  class: string;

  @ApiProperty({
    description: 'Raça do personagem principal',
    example: 'Elfo',
  })
  @IsString()
  race: string;

  @ApiProperty({
    description: 'Divindade do personagem principal',
    example: 'Deus do Fogo',
  })
  @IsString()
  divinity: string;

  @ApiProperty({
    description: 'Origem do personagem principal',
    example: 'Reino da Magia',
  })
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Experiência do personagem principal',
    example: 100,
  })
  @IsNumber()
  xp: number;

  @ApiProperty({
    description: 'Moedas de Tibar do personagem',
    example: 10,
  })
  @IsNumber()
  ts: number;

  @ApiProperty({
    description: 'Moedas de Tibar de Prata do personagem',
    example: 5,
  })
  @IsNumber()
  tp: number;

  @ApiProperty({
    description: 'Moedas de Tibar de Ouro do personagem',
    example: 2,
  })
  @IsNumber()
  to: number;

  @ApiProperty({
    description: 'Retrato do personagem',
    example: 'portrait.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  portrait?: string;
}

class StatusCharacter {
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
}

class Character {
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
    description: 'Nome da sessão associada ao personagem',
    example: 'Nome da sessão',
    required: false,
  })
  @IsOptional()
  @IsString()
  sessionName?: string;

  @ApiProperty({
    description: 'Personagem principal',
    type: MainCharacter,
  })
  @Type(() => MainCharacter)
  mainCharacter: MainCharacter;

  @ApiProperty({
    description: 'Status do personagem',
    type: StatusCharacter,
  })
  @Type(() => StatusCharacter)
  statusCharacter: StatusCharacter;

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

export class GetCharacterOutputDto {
  @ApiProperty({
    description: 'Personagem',
    type: Character,
  })
  @Type(() => Character)
  character: Character;

  @ApiProperty({
    description:
      'Indica se o usuário possui permissão para acessar o personagem',
    example: true,
  })
  @IsBoolean()
  hasPermission: boolean;
}
