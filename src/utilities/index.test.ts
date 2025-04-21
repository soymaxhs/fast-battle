import {
  getPlayerDiceRolls,
  getRandomDiceRoll,
  getUniqueMaxDiceRoll,
  getWinnerPlayers,
} from "@/utilities";
import type { Player } from "@/types";

describe("getRandomDiceRoll", () => {
  it("should returns a number", () => {
    const result = getRandomDiceRoll();
    expect(typeof result).toBe("number");
  });

  it("should returns a number that is an integer", () => {
    const result = getRandomDiceRoll();
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should returns a number between 1 and 6", () => {
    const result = getRandomDiceRoll();
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });
});

describe("getPlayerDiceRolls", () => {
  it("should return an array of numbers", () => {
    const result = getPlayerDiceRolls();
    expect(result.every((num) => typeof num === "number")).toBe(true);
  });

  it("should return an array of integers", () => {
    const result = getPlayerDiceRolls();
    expect(result.every((num) => Number.isInteger(num))).toBe(true);
  });

  it("should return an array of numbers between 1 and 6", () => {
    const result = getPlayerDiceRolls();
    expect(result.every((num) => num >= 1 && num <= 6)).toBe(true);
  });

  it("should return an array of length 5", () => {
    const result = getPlayerDiceRolls();
    expect(result.length).toBe(5);
  });
});

describe("getUniqueMaxDiceRoll", () => {
  it("should return a number", () => {
    const result = getUniqueMaxDiceRoll([1, 2, 3, 4, 5]);
    expect(typeof result).toBe("number");
  });

  it("should return a number that is an integer", () => {
    const result = getUniqueMaxDiceRoll([1, 2, 3, 4, 5]);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should return a number between 1 and 6", () => {
    const result = getUniqueMaxDiceRoll([1, 2, 3, 4, 5]);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  it("should return the maximum unique dice roll", () => {
    const result = getUniqueMaxDiceRoll([1, 2, 5, 4, 5]);
    expect(result).toBe(4);
  });

  it("should return -1 if there are no unique rolls", () => {
    const result = getUniqueMaxDiceRoll([1, 1, 2, 2, 2]);
    expect(result).toBe(-1);
  });
});

describe("getWinnerPlayers", () => {
  it("should return the winner players", () => {
    const players: Player[] = [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
      { id: "3", name: "Charlie" },
    ];

    const playersRound = [
      { ...players[0], diceRolls: [1, 2, 3, 4, 5] },
      { ...players[1], diceRolls: [2, 3, 4, 5, 6] },
      { ...players[2], diceRolls: [3, 4, 5, 6, 1] },
    ];

    const result = getWinnerPlayers(playersRound);
    expect(result).toEqual([players[1], players[2]]);
  });
});
