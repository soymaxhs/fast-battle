import { DiceRoll } from "@/types";

/**
 * Props accepted by the <Dice /> component.
 */
export type DiceProps = {
  /** The numerical face (1 – 6) that must appear on the upper side of the rendered dice. */
  diceRoll: DiceRoll;
};

/**
 * A 3-tuple that represents a 3-dimensional vector or Euler rotation
 * expressed in **radians** — ordered as **[x, y, z]**.
 */
export type Axis3D = [number, number, number];
