export type FindItemByParams = {
  characterId?: number;
  sessionId?: number;
};

export type SaveItemParams = {
  characterId?: number;
  image: string;
  name: string;
  sessionId?: number;
};

export type UpdateItemParams = Partial<SaveItemParams> & {
  id: number;
};
