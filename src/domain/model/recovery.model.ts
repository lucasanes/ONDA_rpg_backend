export interface RecoveryModelProps {
  id: number;
  code: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class RecoveryModel {
  constructor(private readonly props: RecoveryModelProps) {}

  get id(): number {
    return this.props.id;
  }

  get code(): string {
    return this.props.code;
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

  isExpired(): boolean {
    const now = new Date();
    const diff = now.getTime() - this.updatedAt.getTime();
    const diffInMinutes = diff / 1000 / 60;

    return diffInMinutes > 5;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
