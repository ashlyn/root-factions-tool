import { Faction, SecondVagabondKey, VagabondKey } from "./factions";

export const MinimumReaches = { 2: 17, 3: 18, 4: 21, 5: 25, 6: 28 };

export const IsValidCombination = (combo: Faction[]): boolean => {
  const totalReach = combo.reduce((a, b) => a + b.reach, 0);
  if (totalReach < MinimumReaches[combo.length]) {
    return false;
  }
  const hasVagabond1 = combo.find((f) => f.name === VagabondKey);
  const hasVagabond2 = combo.find((f) => f.name === SecondVagabondKey);
  return hasVagabond2 ? !!hasVagabond1 : true;
};
