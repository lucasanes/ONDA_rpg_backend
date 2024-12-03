export type FindUserByParams = {
  email?: string;
  username?: string;
};

export type SaveUserParams = {
  email: string;
  password: string;
  username: string;
};

export type UpdateUserParams = Partial<SaveUserParams> & {
  id: number;
};

export type SaveRecoveryParams = {
  code: string;
  userId: number;
};

export type FindRecoveryByParams = {
  code: string;
  email: string;
};

export type ChangePasswordParams = {
  password: string;
  userId: number;
};
