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

@Entity('status_characters')
export class StatusCharacter {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { nullable: true })
  portrait?: string;

  @Column('int', { default: 0 })
  hp: number;

  @Column('int', { default: 0, name: 'current_hp' })
  currentHp: number;

  @Column('int', { default: 0 })
  mp: number;

  @Column('int', { default: 0, name: 'current_mp' })
  currentMp: number;

  @Column('int', { default: 0 })
  mun: number;

  @Column('int', { default: 0, name: 'current_mun' })
  currentMun: number;

  @Column('int', { default: 0 })
  defense: number;

  @Column('int', { default: 0 })
  cd: number;

  @Column('int', { default: 1 })
  moldure: number;

  @Column({ name: 'character_id', type: 'int' })
  @Index()
  characterId: number;

  @OneToOne(() => Character, (character) => character.statusCharacter, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
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
