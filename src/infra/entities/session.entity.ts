import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Character } from './character.entity';
import { Invite } from './invite.entity';
import { Item } from './item.entity';
import { Player } from './player.entity';
import { User } from './user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('int', { name: 'user_id' })
  @Index()
  userId: number;

  @ManyToOne(() => User, (user) => user.sessions, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;

  @OneToMany(() => Player, (players) => players.session)
  players: Relation<Player[]>;

  @OneToMany(() => Character, (character) => character.session)
  characters: Relation<Character[]>;

  @OneToMany(() => Item, (items) => items.session)
  items: Relation<Item[]>;

  @OneToMany(() => Invite, (invite) => invite.session)
  invites: Relation<Invite[]>;

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
