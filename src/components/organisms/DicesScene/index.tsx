"use client";

import { Dice } from "@/components/organisms/Dice";
import { DicesSceneProps } from "@/components/organisms/DicesScene/types";
import { Canvas } from "@react-three/fiber";

export default function DicesScene({ diceRolls }: DicesSceneProps) {
  /**
   * Calculates the x position of each dice in the scene.
   *
   * @param index - The index of the dice in the array.
   */
  const getXPosition = (index: number) => {
    // Number of dice to be displayed
    const diceCount = diceRolls.length;
    // Space between dice
    const spacing = 1.25;
    // Center the dice around the origin
    const offset = (diceCount - 1) / 2;
    // Calculate the x position based on the index and spacing
    return (index - offset) * spacing;
  };

  return (
    <div style={{ width: "100%", height: "150px" }}>
      <Canvas camera={{ position: [0, 3, 2], fov: 45 }}>
        {diceRolls.map((diceRoll, index) => (
          <group key={index} position={[getXPosition(index), 0, 0]}>
            <Dice diceRoll={diceRoll} />
          </group>
        ))}
      </Canvas>
    </div>
  );
}
