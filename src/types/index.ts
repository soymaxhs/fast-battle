import { ROLL_TYPE } from "@/config/constants";

/**
 * Represents a single valid dice roll (values from 1 to 6).
 */
export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

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
  /** Player's display name */
  name: string;
  /** Total victories accumulated in the session */
  victories: number;
};

/**
 * Player round with normal dice roll.
 */
export type PlayerNormalRound = {
  playerIndex: number;
  rollType: ROLL_TYPE.NORMAL;
  diceRolls: NormalDiceRolls;
};

/**
 * Player round with sudden death dice roll.
 */
export type PlayerSuddenDeathRound = {
  playerIndex: number;
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
  /** Player currently starting the round */
  currentPlayerIndex: number;
  /** History of all completed rounds */
  historyRounds: PlayersRound[];
  /** Current round of the game */
  currentRoundIndex: number;
  /** Current round roll type */
  currentRollType: ROLL_TYPE;
};
