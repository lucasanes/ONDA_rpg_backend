export interface CharacterPortraitModelProps {
  createdAt: Date;
  currentHp: number;
  currentMp: number;
  currentMun: number;
  hp: number;
  id: number;
  isPublic: boolean;
  moldure: number;
  mp: number;
  mun: number;
  name: string;
  portrait?: string;
  sessionId?: number;
  tc: number;
  to: number;
  tp: number;
  updatedAt: Date;
  userId: number;
}

export class CharacterPortraitModel {
  constructor(private readonly props: CharacterPortraitModelProps) {}

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

  get name(): string {
    return this.props.name;
  }

  get portrait(): string | undefined {
    return this.props.portrait;
  }

  get currentHp(): number {
    return this.props.currentHp;
  }

  get hp(): number {
    return this.props.hp;
  }

  get currentMp(): number {
    return this.props.currentMp;
  }

  get mp(): number {
    return this.props.mp;
  }

  get currentMun(): number {
    return this.props.currentMun;
  }

  get mun(): number {
    return this.props.mun;
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
      currentHp: this.currentHp,
      currentMp: this.currentMp,
      currentMun: this.currentMun,
      hp: this.hp,
      id: this.id,
      isPublic: this.isPublic,
      mp: this.mp,
      mun: this.mun,
      name: this.name,
      portrait: this.portrait,
      sessionId: this.sessionId,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}
