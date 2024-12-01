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
import { User } from './user.entity';

@Entity('recoveries')
export class Recovery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id', unique: true })
  userId: number;

  @Column('varchar')
  @Index()
  code: string;

  @ManyToOne(() => User, (user) => user.recoveries)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

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
