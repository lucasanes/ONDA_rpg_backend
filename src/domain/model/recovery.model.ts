export interface RecoveryModelProps {
  code: string;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  userId: number;
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
      code: this.code,
      createdAt: this.createdAt,
      id: this.id,
      updatedAt: this.updatedAt,
      userId: this.userId,
    };
  }
}
