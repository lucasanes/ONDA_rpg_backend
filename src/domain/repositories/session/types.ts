export type SaveSessionParams = {
  description: string;
  name: string;
  userId: number;
};

export type UpdateSessionParams = Partial<SaveSessionParams> & {
  id: number;
};
