import {
  NormalDiceRolls,
  Player,
  PlayersRound,
  SuddenDeathDiceRolls,
} from "@/types";

/**
 * Represents a collection of dice rolls.
 * This can be either a normal roll of 5 dice or a sudden death roll of 3 dice.
 */
export enum ROLL_TYPE {
  NORMAL = "normal",
  SUDDEN_DEATH = "sudden_death",
}

/**
 * Represents a normal roll of 5 dice.
 * This is the standard roll type used in the game.
 */
export const NORMAL_ROLL = 5;

/**
 * Represents a sudden death roll of 3 dice.
 * This roll type is used in case of a tie between players.
 */
export const SUDDEN_DEATH_ROLL = 3;

export const DEFAULT_PLAYERS: Player[] = [
  {
    name: "Maximiliano Heredia Santoyo",
    victories: 0,
  },
  {
    name: "John Doe",
    victories: 0,
  },
];

export const DEFAULT_NORMAL_ROLLS = [1, 2, 3, 4, 5] as NormalDiceRolls;
export const DEFAULT_SUDDEN_DEATH_ROLLS = [1, 2, 3] as SuddenDeathDiceRolls;

export const DEFAULT_PLAYERS_ROUND: PlayersRound = [
  {
    playerIndex: 0,
    rollType: ROLL_TYPE.NORMAL,
    diceRolls: DEFAULT_NORMAL_ROLLS,
  },
  {
    playerIndex: 1,
    rollType: ROLL_TYPE.NORMAL,
    diceRolls: DEFAULT_NORMAL_ROLLS,
  },
];
