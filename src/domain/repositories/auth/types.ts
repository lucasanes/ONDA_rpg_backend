export type FindUserByParams = {
  email?: string;
  username?: string;
};

export type SaveUserParams = {
  username: string;
  email: string;
  password: string;
};
