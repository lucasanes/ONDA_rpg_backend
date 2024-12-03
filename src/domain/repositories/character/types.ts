export type SaveCharacterParams = {
  age: number;
  class: string;
  divinity: string;
  hp: number;
  mp: number;
  name: string;
  origin: string;
  portrait?: string;
  race: string;
  userId: number;
  xp: number;
};

export type UpdateCharacterParams = {
  id: number;
  isPublic?: boolean;
  sessionId?: number;
};

export type UpdateMainParams = {
  age: number;
  class: string;
  divinity: string;
  id: number;
  name: string;
  origin: string;
  race: string;
  to: number;
  tp: number;
  ts: number;
  xp: number;
};

export type UpdateStatusParams = {
  cd: number;
  currentHp?: number;
  currentMp?: number;
  currentMun?: number;
  defense: number;
  hp?: number;
  id: number;
  mp?: number;
  mun?: number;
  portrait?: string;
};
