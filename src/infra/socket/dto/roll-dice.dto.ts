type Dice = {
  bonus: string;
  dice: string;
  rollDices: {
    faces: number;
    quantity: number;
    rolls: number[];
    total: number;
  }[];
  total: number;
};

export interface RollDiceDto {
  characterId: number | null;
  dice: Dice;
  isCritical: boolean;
  isD20: boolean;
  isDisaster: boolean;
  name: string;
  portrait: string | null;
  sessionId: number | null;
}
