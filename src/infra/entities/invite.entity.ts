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
import { Session } from './session.entity';
import { User } from './user.entity';

@Entity('invites')
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id' })
  @Index()
  userId: number;

  @ManyToOne(() => User, (user) => user.invites, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @Column('int', { name: 'session_id' })
  sessionId: number;

  @ManyToOne(() => Session, (session) => session.invites, { nullable: false })
  @JoinColumn({ name: 'session_id' })
  session: Relation<Session>;

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
