/**
 * Enum representing the six faces of a standard 6-sided dice.
 */
export enum DICE {
  D1 = 1,
  D2 = 2,
  D3 = 3,
  D4 = 4,
  D5 = 5,
  D6 = 6,
}

/**
 * Represents a single valid dice roll (values from 1 to 6).
 */
export type DiceRoll =
  | DICE.D1
  | DICE.D2
  | DICE.D3
  | DICE.D4
  | DICE.D5
  | DICE.D6;

/**
 * Represents a list of dice rolls.
 */
export type DiceRolls = DiceRoll[];

/**
 * Represents a player in the game.
 */
export type Player = {
  /** Unique identifier of the player */
  id: string;
  /** Player's display name */
  name: string;
};

/**
 * Represents multiple players in the game.
 */
export type Players = Player[];

/**
 * Represents a player's round in the game.
 * This includes the player's information and their dice rolls for the current round.
 */
export type PlayerRound = Player & {
  /** The player's dice rolls for the current round */
  diceRolls: DiceRolls;
};

/**
 * Represents multiple players round in the game.
 * This is an array of PlayerRound objects, each representing a player's round.
 */
export type PlayersRound = PlayerRound[];
