export interface StatusCharacterDto {
  characterId: number;
  key:
    | 'fighting'
    | 'tired'
    | 'hurted'
    | 'dying'
    | 'unconscious'
    | 'hp'
    | 'mp'
    | 'mun'
    | 'currentHp'
    | 'currentMp'
    | 'currentMun'
    | 'money';
  value: boolean;
}
