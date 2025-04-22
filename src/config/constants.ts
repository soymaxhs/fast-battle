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
