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
