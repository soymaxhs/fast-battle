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
 * @returns {number} A random integer between 1 and 6.
 */
export function getRandomDiceRoll(): number {
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
 * @returns {number[]} An array of five integers between 1 and 6.
 */
export function getPlayerDiceRolls(): Array<number> {
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
 * @param {number[]} diceRolls - An array of dice roll integers (1–6).
 * @returns {number} The highest roll that occurred exactly once, or -1 if none.
 */
export function getUniqueMaxDiceRoll(diceRolls: Array<number>): number {
  // Count occurrences of each roll
  const diceRollsCounters = diceRolls.reduce((diceRollsCounter: Array<{roll: number, count: number}>, diceRoll: number) => {
    // Check if the roll already exists in the counter
    const existingRoll = diceRollsCounter.find((dice) => dice.roll === diceRoll);

    // If it exists, increment the count, otherwise add a new entry
    if (existingRoll) {
      existingRoll.count += 1;
    } else {
      diceRollsCounter.push({ roll: diceRoll, count: 1 });
    }

    return diceRollsCounter;
  }
  , []);
  
  // Filter for unique rolls (count === 1) and map to get the roll values
  const uniqueRolls = diceRollsCounters.filter((diceRoll) => diceRoll.count === 1).map((diceRoll) => diceRoll.roll);
  
  // Return the maximum unique roll or -1 if none exist
  return uniqueRolls.length > 0 ? Math.max(...uniqueRolls) : -1;
}