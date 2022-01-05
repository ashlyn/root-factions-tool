import {
  alliance,
  corvids,
  duchy,
  eyrie,
  keepers,
  lizards,
  marquise,
  riverfolk,
  vagabond,
  warlord,
} from "../icons/factions";

export enum Expansion {
  VagabondPack = "Vagabond Pack",
  Riverfolk = "Riverfolk",
  Underworld = "Underworld",
  Maurader = "Marauder",
}

export type Faction = {
  name: string;
  reach: number;
  icon: string;
  expansion?: Expansion;
};

export const VagabondKey = "Vagabond";
export const SecondVagabondKey = "Second Vagabond";

export const Factions: Faction[] = [
  {
    name: "Marquise de Cat",
    reach: 10,
    icon: marquise,
  },
  {
    name: "Lord of the Hundreds",
    reach: 9,
    icon: warlord,
    expansion: Expansion.Maurader,
  },
  {
    name: "Keepers in Iron",
    reach: 8,
    icon: keepers,
    expansion: Expansion.Maurader,
  },
  {
    name: "Underground Duchy",
    reach: 8,
    icon: duchy,
    expansion: Expansion.Underworld,
  },
  {
    name: "Eyrie Dynasties",
    reach: 7,
    icon: eyrie,
  },
  {
    name: VagabondKey,
    reach: 5,
    icon: vagabond,
  },
  {
    name: "Riverfolk Company",
    reach: 5,
    icon: riverfolk,
    expansion: Expansion.Riverfolk,
  },
  {
    name: "Woodland Alliance",
    reach: 3,
    icon: alliance,
  },
  {
    name: "Corvid Conspiracy",
    reach: 3,
    icon: corvids,
    expansion: Expansion.Underworld,
  },
  {
    name: "Lizard Cult",
    reach: 2,
    icon: lizards,
    expansion: Expansion.Riverfolk,
  },
  {
    name: SecondVagabondKey,
    reach: 2,
    icon: vagabond,
    expansion: Expansion.VagabondPack,
  },
];
