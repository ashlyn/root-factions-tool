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
} from "./resources/icons/factions";

export type Faction = {
  name: string;
  reach: number;
  icon: string;
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
  },
  {
    name: "Keepers in Iron",
    reach: 8,
    icon: keepers,
  },
  {
    name: "Underground Duchy",
    reach: 8,
    icon: duchy,
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
  },
  {
    name: "Lizard Cult",
    reach: 2,
    icon: lizards,
  },
  {
    name: SecondVagabondKey,
    reach: 2,
    icon: vagabond,
  },
];
