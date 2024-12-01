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
import { Recovery } from './recovery.entity';

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

  @OneToMany(() => Recovery, (recovery) => recovery.user)
  recoveries: Relation<Recovery[]>;

  // @OneToMany(() => Session, (session) => session.user)
  // sessions: Session[];

  // @OneToMany(() => Players, (players) => players.user)
  // players: Players[];

  // @OneToMany(() => Character, (character) => character.user)
  // characters: Character[];

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
