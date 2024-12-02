import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { Session } from './session.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  image: string;

  @Column('int', { name: 'session_id', nullable: true })
  sessionId?: number;

  @Column('int', { name: 'character_id', nullable: true })
  characterId?: number;

  @ManyToOne(() => Session, (session) => session.items, { nullable: true })
  session?: Relation<Session>;

  @ManyToOne(() => Character, (character) => character.items, {
    nullable: true,
  })
  character?: Relation<Character>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
