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

  @ManyToOne(() => Session, (session) => session.items, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  session?: Relation<Session>;

  @ManyToOne(() => Character, (character) => character.items, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'character_id' })
  character?: Relation<Character>;

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
