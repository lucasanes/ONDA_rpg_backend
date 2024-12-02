export interface InviteModelProps {
  id: number;
  userId: number;
  sessionId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class InviteModel {
  constructor(private readonly props: InviteModelProps) {}

  get id(): number {
    return this.props.id;
  }

  get userId(): number {
    return this.props.userId;
  }

  get sessionId(): number {
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
      id: this.id,
      userId: this.userId,
      sessionId: this.sessionId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
