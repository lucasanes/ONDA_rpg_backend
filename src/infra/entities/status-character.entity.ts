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

  @Column('int', { default: 0 })
  hp: number;

  @Column('int', { name: 'current_hp', default: 0 })
  currentHp: number;

  @Column('int', { default: 0 })
  mp: number;

  @Column('int', { name: 'current_mp', default: 0 })
  currentMp: number;

  @Column('int', { default: 0 })
  mun: number;

  @Column('int', { name: 'current_mun', default: 0 })
  currentMun: number;

  @Column('int', { default: 0 })
  defense: number;

  @Column('int', { default: 0 })
  cd: number;

  @Column({ name: 'character_id', type: 'int' })
  @Index()
  characterId: number;

  @OneToOne(() => Character, (character) => character.statusCharacter)
  @JoinColumn({ name: 'character_id' })
  character: Relation<Character>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
