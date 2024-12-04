export interface StatusCharacterDto {
  characterId: number;
  key: 'fighting' | 'tired' | 'hurted' | 'dying';
  value: boolean;
}
