import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { Invite } from './invite.entity';
import { Recovery } from './recovery.entity';
import { Session } from './session.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar', { unique: true })
  @Index()
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Relation<Session[]>;

  @OneToMany(() => Character, (character) => character.user)
  characters: Relation<Character[]>;

  @OneToMany(() => Recovery, (recovery) => recovery.user)
  recoveries: Relation<Recovery[]>;

  @OneToMany(() => Invite, (invite) => invite.user)
  invites: Relation<Invite[]>;

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
