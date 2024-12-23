import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from './character.entity';

@Entity('main_characters')
export class MainCharacter {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar')
  name: string;

  @Column('int', { default: 0 })
  xp: number;

  @Column('int')
  age: number;

  @Column('varchar')
  class: string;

  @Column('varchar')
  race: string;

  @Column('varchar')
  divinity: string;

  @Column('varchar')
  origin: string;

  @Column('int', { default: 0 })
  tp: number;

  @Column('int', { default: 0 })
  tc: number;

  @Column('int', { default: 0 })
  to: number;

  @Column('int', { default: 0, name: 'weight_limit' })
  weightLimit: number;

  @Column({ name: 'character_id', type: 'int' })
  @Index()
  characterId: number;

  @OneToOne(() => Character, (character) => character.mainCharacter, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  @Index()
  character: Relation<Character>;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  updatedAt: Date;
}
