import { getRandomDiceRoll } from "@/utilities";

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
