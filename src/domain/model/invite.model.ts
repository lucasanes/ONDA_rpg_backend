import { SessionModel } from './session.model';

export interface InviteModelProps {
  createdAt: Date;
  id: number;
  session: SessionModel;
  sessionId: number;
  updatedAt: Date;
  userId: number;
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

  get session(): SessionModel {
    return this.props.session;
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
      session: this.session.toJSON(),
      sessionId: this.sessionId,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}
