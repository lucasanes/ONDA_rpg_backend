import { ItemModel } from './item.model';
import { SessionModel } from './session.model';

export interface MainCharacterProps {
  age: number;
  characterId: number;
  class: string;
  createdAt: Date;
  divinity: string;
  id: number;
  name: string;
  origin: string;
  race: string;
  tc: number;
  to: number;
  tp: number;
  updatedAt: Date;
  weightLimit: number;
  xp: number;
}

export interface StatusCharacterProps {
  cd: number;
  characterId: number;
  createdAt: Date;
  currentHp: number;
  currentMp: number;
  currentMun: number;
  defense: number;
  hp: number;
  id: number;
  mp: number;
  mun: number;
  portrait?: string;
  updatedAt: Date;
}

export interface CharacterModelProps {
  createdAt: Date;
  id: number;
  isPublic: boolean;
  items?: ItemModel[];
  mainCharacter: MainCharacterProps;
  session?: SessionModel;
  sessionId?: number;
  statusCharacter: StatusCharacterProps;
  updatedAt: Date;
  userId: number;
}

export class CharacterModel {
  constructor(private readonly props: CharacterModelProps) {}

  get id(): number {
    return this.props.id;
  }

  get isPublic(): boolean {
    return this.props.isPublic;
  }

  get userId(): number {
    return this.props.userId;
  }

  get sessionId(): number | undefined {
    return this.props.sessionId;
  }

  get mainCharacter(): MainCharacterProps {
    return this.props.mainCharacter;
  }

  get statusCharacter(): StatusCharacterProps {
    return this.props.statusCharacter;
  }

  get session(): SessionModel | undefined {
    return this.props.session;
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
      createdAt: this.createdAt,
      id: this.id,
      isPublic: this.isPublic,
      items: this.items,
      mainCharacter: this.mainCharacter,
      session: this.session,
      sessionId: this.sessionId,
      statusCharacter: this.statusCharacter,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}
