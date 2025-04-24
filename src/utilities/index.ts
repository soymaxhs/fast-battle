import type { DiceRoll, PlayersRound } from "@/types";

/**
 * Simulates a roll of a standard 6-sided dice.
 *
 * @summary Returns a random integer between 1 and 6.
 * @description This function generates a pseudo-random integer from 1 to 6,
 * mimicking the behavior of rolling a traditional 6-sided dice.
 *
 * @example
 * const roll = getRandomDiceRoll();
 * console.log(roll); // Output: 1, 2, 3, 4, 5, or 6
 *
 * @returns {DiceRoll} A random integer between 1 and 6.
 */
export function getRandomDiceRoll(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

/**
 * Generates an array of simulated dice rolls for a player.
 *
 * @summary Rolls N 6-sided dice and returns the result.
 * @description Given a number of dice, this function returns an array of pseudo-random integers from 1 to 6.
 *
 * @param {number} rolls - The number of dice to roll.
 * @returns {DiceRoll[]} An array of integers between 1 and 6.
 */
export function getPlayerDiceRolls(rolls: number): DiceRoll[] {
  const playerRound: Array<number> = Array.from({ length: rolls });
  return playerRound.map(() => getRandomDiceRoll());
}

/**
 * Returns the highest dice roll that appears only once in the array.
 *
 * @summary Finds the unique maximum roll.
 * @description This function counts how many times each value appears in the roll,
 * and returns the highest value that appears exactly once.
 *
 * @param {DiceRoll[]} diceRolls - An array of dice roll integers (1–6).
 * @returns {DiceRoll | undefined} The highest roll that occurred only once, or undefined if none.
 */
export function getUniqueMaxDiceRoll(
  diceRolls: DiceRoll[]
): DiceRoll | undefined {
  const diceRollsCounters = diceRolls.reduce(
    (
      diceRollsCounter: Array<{ roll: number; count: number }>,
      diceRoll: number
    ) => {
      const existingRoll = diceRollsCounter.find(
        (dice) => dice.roll === diceRoll
      );
      if (existingRoll) {
        existingRoll.count += 1;
      } else {
        diceRollsCounter.push({ roll: diceRoll, count: 1 });
      }
      return diceRollsCounter;
    },
    []
  );

  const uniqueRolls = diceRollsCounters
    .filter((diceRoll) => diceRoll.count === 1)
    .map((diceRoll) => diceRoll.roll);

  return uniqueRolls.length > 0
    ? (Math.max(...uniqueRolls) as DiceRoll)
    : undefined;
}

/**
 * Returns the lowest dice roll that appears only once in the array.
 *
 * @summary Finds the unique minimum roll.
 * @description Similar to `getUniqueMaxDiceRoll`, but returns the lowest value instead.
 *
 * @param {DiceRoll[]} diceRolls - An array of dice roll integers (1–6).
 * @returns {DiceRoll | undefined} The lowest roll that occurred only once, or undefined if none.
 */
export function getUniqueMinDiceRoll(
  diceRolls: DiceRoll[]
): DiceRoll | undefined {
  const diceRollsCounters = diceRolls.reduce(
    (
      diceRollsCounter: Array<{ roll: number; count: number }>,
      diceRoll: number
    ) => {
      const existingRoll = diceRollsCounter.find(
        (dice) => dice.roll === diceRoll
      );
      if (existingRoll) {
        existingRoll.count += 1;
      } else {
        diceRollsCounter.push({ roll: diceRoll, count: 1 });
      }
      return diceRollsCounter;
    },
    []
  );

  const uniqueRolls = diceRollsCounters
    .filter((diceRoll) => diceRoll.count === 1)
    .map((diceRoll) => diceRoll.roll);

  return uniqueRolls.length > 0
    ? (Math.min(...uniqueRolls) as DiceRoll)
    : undefined;
}

/**
 * Determines the player(s) with the highest unique roll in a normal round.
 *
 * @summary Finds winner(s) by highest non-repeating value.
 * @description Each player's dice roll is evaluated for its highest unique value. The player(s) with the highest unique value win.
 *
 * @param {PlayersRound} playersRound - Array of players with their round data.
 * @returns {number[]} Array of player index that won the normal round.
 */
export function getNormalRoundWinnerPlayers(
  playersRound: PlayersRound
): number[] {
  const playersWithMaxRoll = playersRound.map((player) => ({
    ...player,
    maxRoll: getUniqueMaxDiceRoll(player.diceRolls),
  }));

  const maxRoll = Math.max(
    ...playersWithMaxRoll.map((player) => Number(player.maxRoll))
  );

  return playersWithMaxRoll
    .filter((player) => Number(player.maxRoll) === maxRoll)
    .map(({ playerIndex }) => playerIndex);
}

/**
 * Determines the player(s) with the lowest unique roll in a sudden death round.
 *
 * @summary Finds winner(s) by lowest non-repeating value.
 * @description Similar to normal round, but uses the lowest unique value instead of the highest.
 *
 * @param {PlayersRound} playersRound - Array of players with their sudden death round data.
 * @returns {number[]} Array of player index that won the sudden death round.
 */
export function getSuddenDeathRoundWinnerPlayers(
  playersRound: PlayersRound
): number[] {
  const playersWithMinRoll = playersRound.map((player) => ({
    ...player,
    minRoll: getUniqueMinDiceRoll(player.diceRolls),
  }));

  const minRoll = Math.min(
    ...playersWithMinRoll.map((player) => Number(player.minRoll))
  );

  return playersWithMinRoll
    .filter((player) => Number(player.minRoll) === minRoll)
    .map(({ playerIndex }) => playerIndex);
}
