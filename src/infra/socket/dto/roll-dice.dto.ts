export interface RollDiceDto {
  characterId: number | null;
  isCritical: boolean;
  isD20: boolean;
  isDisaster: boolean;
  sessionId: number | null;
  value: number;
}
