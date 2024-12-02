import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { MainCharacter } from './main-character.entity';
import { Session } from './session.entity';
import { StatusCharacter } from './status-character.entity';
import { User } from './user.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'is_public', type: 'boolean', default: false })
  isPublic: boolean;

  @Column({ name: 'user_id', type: 'int' })
  @Index()
  userId: number;

  @Column({ name: 'session_id', type: 'int', nullable: true })
  @Index()
  sessionId?: number;

  @ManyToOne(() => User, (user) => user.characters)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @ManyToOne(() => Session, (session) => session.characters)
  @JoinColumn({ name: 'session_id' })
  session: Relation<Session>;

  @OneToMany(() => Item, (items) => items.character)
  items: Relation<Item[]>;

  @OneToOne(() => MainCharacter, (mainCharacter) => mainCharacter.character)
  mainCharacter: Relation<MainCharacter>;

  @OneToOne(
    () => StatusCharacter,
    (statusCharacter) => statusCharacter.character,
  )
  statusCharacter: Relation<StatusCharacter>;

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
