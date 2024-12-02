import { CharacterModel } from './character.model';
import { ItemModel } from './item.model';

export interface SessionModelProps {
  characters?: CharacterModel[];
  createdAt: Date;
  description: string;
  id: number;
  items?: ItemModel[];
  name: string;
  players?: string[];
  updatedAt: Date;
  userId: number;
}

export class SessionModel {
  constructor(private readonly props: SessionModelProps) {}

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get userId(): number {
    return this.props.userId;
  }

  get players(): string[] | undefined {
    return this.props.players || [];
  }

  get characters(): CharacterModel[] | undefined {
    return this.props.characters || [];
  }

  get items(): ItemModel[] | undefined {
    return this.props.items || [];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toJSON() {
    return {
      characters: this.characters.map((character) => character.toJSON()),
      createdAt: this.createdAt,
      description: this.description,
      id: this.id,
      items: this.items.map((item) => item.toJSON()),
      name: this.name,
      players: this.players,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}
