import { Axis3D } from "@/components/organisms/Dice/types";
import { DiceRoll } from "@/types";

/**
 * Maps each dice face (1–6) to a specific 3D rotation (in radians).
 * These rotations orient the dice so the specified face is shown on top.
 */
export const DICE_ROTATIONS: Record<DiceRoll, Axis3D> = {
  1: [0, 0, 0],
  2: [0, 0, Math.PI / 2],
  3: [-Math.PI / 2, 0, 0],
  4: [Math.PI, 0, 0],
  5: [0, 0, -Math.PI / 2],
  6: [Math.PI / 2, 0, 0],
};

export const FACE_TEXTURES = [
  "/textures/dice-six-faces-one.png",
  "/textures/dice-six-faces-two.png",
  "/textures/dice-six-faces-three.png",
  "/textures/dice-six-faces-four.png",
  "/textures/dice-six-faces-five.png",
  "/textures/dice-six-faces-six.png",
];

/**
 * Position and rotation (in radians) of each dice face.
 * The order must match the order of the loaded textures: 1 → 6.
 */
export const FACE_TRANSFORMS: { position: Axis3D; rotation: Axis3D }[] = [
  {
    // Face 1 – initially the top (+Y)
    position: [0, 0.5, 0],
    rotation: [-Math.PI / 2, 0, 0],
  },
  {
    // Face 2 – right side (+X)
    position: [0.5, 0, 0],
    rotation: [0, -Math.PI / 2, Math.PI / 2],
  },
  {
    // Face 3 – front (+Z)
    position: [0, 0, 0.5],
    rotation: [0, 0, 0],
  },
  {
    // Face 4 – bottom (-Y)
    position: [0, -0.5, 0],
    rotation: [Math.PI / 2, 0, 0],
  },
  {
    // Face 5 – left side (-X)
    position: [-0.5, 0, 0],
    rotation: [0, Math.PI / 2, -Math.PI / 2],
  },
  {
    // Face 6 – back (-Z)
    position: [0, 0, -0.5],
    rotation: [0, Math.PI, 0],
  },
];
