export type FindItemByParams = {
  characterId?: number;
  sessionId?: number;
};

export type SaveItemParams = {
  characterId?: number;
  description: string;
  image?: string;
  name: string;
  sessionId?: number;
  weight: number;
};

export type UpdateItemParams = Partial<SaveItemParams> & {
  id: number;
};
