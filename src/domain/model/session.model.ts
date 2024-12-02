export interface SessionModelProps {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
