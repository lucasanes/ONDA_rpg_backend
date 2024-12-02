export interface MainCharacterProps {
  id: number;
  name: string;
  xp: number;
  age: number;
  class: string;
  race: string;
  divinity: string;
  origin: string;
  ts: number;
  tp: number;
  to: number;
  characterId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatusCharacterProps {
  id: number;
  hp: number;
  currentHp: number;
  mp: number;
  currentMp: number;
  mun: number;
  currentMun: number;
  defense: number;
  cd: number;
  characterId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CharacterModelProps {
  id: number;
  isPublic: boolean;
  userId: number;
  sessionId?: number;
  mainCharacter: MainCharacterProps;
  statusCharacter: StatusCharacterProps;
  createdAt: Date;
  updatedAt: Date;
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      isPublic: this.isPublic,
      userId: this.userId,
      sessionId: this.sessionId,
      mainCharacter: {
        id: this.mainCharacter.id,
        name: this.mainCharacter.name,
        xp: this.mainCharacter.xp,
        age: this.mainCharacter.age,
        class: this.mainCharacter.class,
        race: this.mainCharacter.race,
        divinity: this.mainCharacter.divinity,
        origin: this.mainCharacter.origin,
        ts: this.mainCharacter.ts,
        tp: this.mainCharacter.tp,
        to: this.mainCharacter.to,
        characterId: this.mainCharacter.characterId,
        createdAt: this.mainCharacter.createdAt,
        updatedAt: this.mainCharacter.updatedAt,
      },
      statusCharacter: {
        id: this.statusCharacter.id,
        hp: this.statusCharacter.hp,
        currentHp: this.statusCharacter.currentHp,
        mp: this.statusCharacter.mp,
        currentMp: this.statusCharacter.currentMp,
        mun: this.statusCharacter.mun,
        currentMun: this.statusCharacter.currentMun,
        defense: this.statusCharacter.defense,
        cd: this.statusCharacter.cd,
        characterId: this.statusCharacter.characterId,
        createdAt: this.statusCharacter.createdAt,
        updatedAt: this.statusCharacter.updatedAt,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
