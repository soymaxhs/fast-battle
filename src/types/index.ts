import { DICE, ROLL_TYPE } from "@/config/constants";

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
 * Represents a standard roll of 5 dice in a normal round.
 */
export type NormalDiceRolls = [
  DiceRoll,
  DiceRoll,
  DiceRoll,
  DiceRoll,
  DiceRoll
];

/**
 * Represents a sudden death roll of 3 dice (used in case of a tie).
 */
export type SuddenDeathDiceRolls = [DiceRoll, DiceRoll, DiceRoll];

/**
 * Represents a player in the game.
 */
export type Player = {
  /** Unique identifier of the player */
  id: string;
  /** Player's display name */
  name: string;
  /** Total victories accumulated in the session */
  victories: number;
};

/**
 * Player round with normal dice roll.
 */
export type PlayerNormalRound = {
  playerId: Player["id"];
  rollType: ROLL_TYPE.NORMAL;
  diceRolls: NormalDiceRolls;
};

/**
 * Player round with sudden death dice roll.
 */
export type PlayerSuddenDeathRound = {
  playerId: Player["id"];
  rollType: ROLL_TYPE.SUDDEN_DEATH;
  diceRolls: SuddenDeathDiceRolls;
};

/**
 * Represents a player's round (normal or sudden death).
 */
export type PlayerRound = PlayerNormalRound | PlayerSuddenDeathRound;

/**
 * Represents multiple player rounds in the same phase.
 */
export type PlayersRound = PlayerRound[];

/**
 * Represents the full state of the game.
 */
export type GameState = {
  /** Current players */
  players: Player[];
  /** History of all completed rounds */
  history: PlayersRound[];
  /** Player currently starting the round */
  currentPlayerId: number;
};
