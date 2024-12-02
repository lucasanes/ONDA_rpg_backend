export type FindUserByParams = {
  email?: string;
  username?: string;
};

export type SaveUserParams = {
  username: string;
  email: string;
  password: string;
};

export type SaveRecoveryParams = {
  userId: number;
  code: string;
};

export type FindRecoveryByParams = {
  email: string;
  code: string;
};

export type ChangePasswordParams = {
  userId: number;
  password: string;
};
