import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
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
  @Index()
  sessionId?: number;

  @Column('int', { name: 'character_id', nullable: true })
  @Index()
  characterId?: number;

  @ManyToOne(() => Session, (session) => session.items, { nullable: true })
  @JoinColumn({ name: 'session_id' })
  session?: Relation<Session>;

  @ManyToOne(() => Character, (character) => character.items, {
    nullable: true,
  })
  @JoinColumn({ name: 'character_id' })
  character?: Relation<Character>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
