import {
  getPlayerDiceRolls,
  getRandomDiceRoll,
  getUniqueMaxDiceRoll,
  getNormalRoundWinnerPlayers,
  getSuddenDeathRoundWinnerPlayers,
  getUniqueMinDiceRoll,
} from "@/utilities";
import type { PlayersRound } from "@/types";
import { NORMAL_ROLL, ROLL_TYPE, SUDDEN_DEATH_ROLL } from "@/config/constants";

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
    const result = getPlayerDiceRolls(10);
    expect(result.every((num) => typeof num === "number")).toBe(true);
  });

  it("should return an array of integers", () => {
    const result = getPlayerDiceRolls(10);
    expect(result.every((num) => Number.isInteger(num))).toBe(true);
  });

  it("should return an array of numbers between 1 and 6", () => {
    const result = getPlayerDiceRolls(10);
    expect(result.every((num) => num >= 1 && num <= 6)).toBe(true);
  });

  describe("with normal roll", () => {
    it("should return an array of length 5", () => {
      const result = getPlayerDiceRolls(NORMAL_ROLL);
      expect(result.length).toBe(5);
    });
  });

  describe("with sudden death roll", () => {
    it("should return an array of length 3", () => {
      const result = getPlayerDiceRolls(SUDDEN_DEATH_ROLL);
      expect(result.length).toBe(3);
    });
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

  it("should return undefined if there are no unique rolls", () => {
    const result = getUniqueMaxDiceRoll([1, 1, 2, 2, 2]);
    expect(result).toBe(undefined);
  });
});

describe("getUniqueMinDiceRoll", () => {
  it("should return a number", () => {
    const result = getUniqueMinDiceRoll([1, 2, 3, 4, 5]);
    expect(typeof result).toBe("number");
  });

  it("should return a number that is an integer", () => {
    const result = getUniqueMinDiceRoll([1, 2, 3, 4, 5]);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should return a number between 1 and 6", () => {
    const result = getUniqueMinDiceRoll([1, 2, 3, 4, 5]);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(6);
  });

  it("should return the minimum unique dice roll", () => {
    const result = getUniqueMinDiceRoll([1, 2, 5, 4, 5]);
    expect(result).toBe(1);
  });

  it("should return undefined if there are no unique rolls", () => {
    const result = getUniqueMinDiceRoll([1, 1, 2, 2, 2]);
    expect(result).toBe(undefined);
  });
});

describe("getNormalRoundWinnerPlayers", () => {
  it("should return the winner players", () => {
    const playersRound: PlayersRound = [
      {
        playerIndex: 0,
        rollType: ROLL_TYPE.NORMAL,
        diceRolls: [1, 2, 3, 4, 5],
      },
      {
        playerIndex: 1,
        rollType: ROLL_TYPE.NORMAL,
        diceRolls: [2, 3, 4, 5, 6],
      },
      {
        playerIndex: 2,
        rollType: ROLL_TYPE.NORMAL,
        diceRolls: [3, 4, 5, 6, 1],
      },
    ];

    const result = getNormalRoundWinnerPlayers(playersRound);
    expect(result).toEqual([1, 2]);
  });
});

describe("getSuddenDeathRoundWinnerPlayers", () => {
  it("should return the winner players", () => {
    const playersRound: PlayersRound = [
      {
        playerIndex: 0,
        rollType: ROLL_TYPE.SUDDEN_DEATH,
        diceRolls: [1, 2, 3],
      },
      {
        playerIndex: 1,
        rollType: ROLL_TYPE.SUDDEN_DEATH,
        diceRolls: [2, 3, 4],
      },
      {
        playerIndex: 2,
        rollType: ROLL_TYPE.SUDDEN_DEATH,
        diceRolls: [3, 4, 5],
      },
    ];

    const result = getSuddenDeathRoundWinnerPlayers(playersRound);
    expect(result).toEqual([0]);
  });
});
