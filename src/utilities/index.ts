import type { DiceRoll, DiceRolls, Players, PlayersRound } from "@/types";

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
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Generates an array of five simulated dice rolls.
 *
 * @summary Simulates a player's turn by rolling five 6-sided dice.
 * @description This function creates an array with five values, each representing
 * a roll of a standard 6-sided dice using `getRandomDiceRoll()`. The result can
 * be used to represent a player's round in a dice-based game.
 *
 * @example
 * const round = getPlayerDiceRolls();
 * console.log(round); // Output: [3, 6, 1, 4, 2]
 *
 * @returns {DiceRolls} An array of five integers between 1 and 6.
 */
export function getPlayerDiceRolls(): DiceRolls {
  const playerRound: Array<number> = Array.from({ length: 5 });
  return playerRound.map(() => getRandomDiceRoll());
}

/**
 * Returns the highest dice roll that appears only once in the array.
 *
 * @summary Finds the unique maximum roll.
 * @description This function counts occurrences of each dice value and returns
 * the highest roll that occurred exactly once. If no such value exists, it returns -1.
 *
 * @example
 * getUniqueMaxDiceRoll([1, 2, 5, 4, 5]); // returns 4
 * getUniqueMaxDiceRoll([2, 2, 4, 4, 4]); // returns -1
 *
 * @param {DiceRolls} diceRolls - An array of dice roll integers (1–6).
 * @returns {number} The highest roll that occurred exactly once, or -1 if none.
 */
export function getUniqueMaxDiceRoll(diceRolls: DiceRolls): number {
  // Count occurrences of each roll
  const diceRollsCounters = diceRolls.reduce(
    (
      diceRollsCounter: Array<{ roll: number; count: number }>,
      diceRoll: number
    ) => {
      // Check if the roll already exists in the counter
      const existingRoll = diceRollsCounter.find(
        (dice) => dice.roll === diceRoll
      );

      // If it exists, increment the count, otherwise add a new entry
      if (existingRoll) {
        existingRoll.count += 1;
      } else {
        diceRollsCounter.push({ roll: diceRoll, count: 1 });
      }

      return diceRollsCounter;
    },
    []
  );

  // Filter for unique rolls (count === 1) and map to get the roll values
  const uniqueRolls = diceRollsCounters
    .filter((diceRoll) => diceRoll.count === 1)
    .map((diceRoll) => diceRoll.roll);

  // Return the maximum unique roll or -1 if none exist
  return uniqueRolls.length > 0 ? Math.max(...uniqueRolls) : -1;
}

/**
 * Determines the player(s) with the highest unique dice roll from a round.
 *
 * @summary Returns the winner(s) of the round based on their unique maximum dice rolls.
 * @description Each player's dice rolls are analyzed to find their highest roll that only appeared once.
 * The player(s) with the highest such value across all players are considered winners.
 * If no players have a unique roll, an empty array is returned.
 *
 * @param {PlayersRound} playersRound - Array of players with their dice rolls.
 * @returns {Players} Array containing one or more winners (id and name only).
 */

export function getWinnerPlayers(playersRound: PlayersRound): Players {
  // Add maxRoll property to each player
  const playersWithMaxRoll = playersRound.map((player) => {
    const uniqueMaxRoll = getUniqueMaxDiceRoll(player.diceRolls);
    return {
      ...player,
      maxRoll: uniqueMaxRoll,
    };
  });

  // Get highest maxRoll among all players
  const maxRoll = Math.max(
    ...playersWithMaxRoll.map((player) => player.maxRoll)
  );

  // Filter players who have that roll and return basic info
  return playersWithMaxRoll
    .filter((player) => player.maxRoll === maxRoll)
    .map(({ id, name }) => ({ id, name }));
}
