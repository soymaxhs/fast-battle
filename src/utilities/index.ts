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