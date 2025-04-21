import { getPlayerDiceRolls, getRandomDiceRoll } from "@/utilities";

describe('getRandomDiceRoll', () => {
  it('should returns a number', () => {
    const result = getRandomDiceRoll();
    expect(typeof result).toBe('number');
  });

  it ('should returns a number that is an integer', () => {  
    const result = getRandomDiceRoll();
    expect(Number.isInteger(result)).toBe(true);
  }); 

  it('should returns a number between 1 and 6', () => {
    const result = getRandomDiceRoll();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });
});

describe('getPlayerDiceRolls', () => {
  it('should return an array of numbers', () => {
    const result = getPlayerDiceRolls();
    expect(result.every(num => typeof num === 'number')).toBe(true);
  });

  it('should return an array of integers', () => {
    const result = getPlayerDiceRolls();
    expect(result.every(num => Number.isInteger(num))).toBe(true);
  });

  it('should return an array of numbers between 1 and 6', () => {
    const result = getPlayerDiceRolls();
    expect(result.every(num => num >= 1 && num <= 6)).toBe(true);
  });

  it('should return an array of length 5', () => {
    const result = getPlayerDiceRolls();
    expect(result.length).toBe(5);
  });
});