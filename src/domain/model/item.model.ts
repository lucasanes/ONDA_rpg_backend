export interface ItemModelProps {
  characterId?: number;
  createdAt: Date;
  description: string;
  id: number;
  image?: string;
  name: string;
  sessionId?: number;
  updatedAt: Date;
  weight: number;
}

export class ItemModel {
  constructor(private readonly props: ItemModelProps) {}

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get weight(): number {
    return this.props.weight;
  }

  get image(): string {
    return this.props.image;
  }

  get characterId(): number | undefined {
    return this.props.characterId;
  }

  get sessionId(): number | undefined {
    return this.props.sessionId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toJSON() {
    return {
      characterId: this.characterId,
      createdAt: this.createdAt,
      description: this.description,
      id: this.id,
      image: this.image,
      name: this.name,
      sessionId: this.sessionId,
      updatedAt: this.updatedAt,
      weight: this.weight,
    };
  }
}
