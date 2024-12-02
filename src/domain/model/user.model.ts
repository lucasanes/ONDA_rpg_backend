export interface UserModelProps {
  createdAt: Date;
  email: string;
  id: number;
  password?: string;
  updatedAt: Date;
  username: string;
}

export class UserModel {
  constructor(private readonly props: UserModelProps) {}

  get id(): number {
    return this.props.id;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
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
      email: this.email,
      id: this.id,
      updatedAt: this.updatedAt,
      username: this.username,
    };
  }
}
