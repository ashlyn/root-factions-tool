import { Faction } from "./Factions";

export const GenerateFactionOptionsForNPlayers = (
  factions: Faction[],
  players: number
): Faction[][] => {
  const factionsCopy = [...factions];

  if (players > factionsCopy.length || players === 0) {
    return [];
  }

  if (players === factionsCopy.length) {
    return [factionsCopy];
  }

  if (players === 1) {
    return factionsCopy.map((f: Faction) => [f]);
  }

  const head = factionsCopy.shift();
  const nMinusOneCombinations = GenerateFactionOptionsForNPlayers(
    factionsCopy,
    players - 1
  ).map((combo) => [head, ...combo]);
  return [
    ...nMinusOneCombinations,
    ...GenerateFactionOptionsForNPlayers(factionsCopy, players),
  ];
};
