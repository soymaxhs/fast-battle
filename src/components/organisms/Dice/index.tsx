"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Plane, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  DICE_ROTATIONS,
  FACE_TEXTURES,
  FACE_TRANSFORMS,
} from "@/components/organisms/Dice/constants";
import { DiceProps } from "@/components/organisms/Dice/types";

/**
 * Renders a 3D dice cube with image textures on each face.
 * The dice rotates smoothly to display the selected face.
 *
 * @param {DiceProps} props - The properties for the Dice component.
 * @returns {JSX.Element} A mesh representing a 3D dice cube.
 */
export function Dice({ diceRoll }: DiceProps) {
  // The mesh reference is used to access the 3D object in the scene.
  const meshRef = useRef<THREE.Mesh>(null);
  // The target rotation is determined by the dice roll (1-6).
  const targetRotation = DICE_ROTATIONS[diceRoll];

  // Load all dice face textures
  const textures = useTexture(FACE_TEXTURES);

  // Smoothly rotate the dice to the target face
  useFrame(() => {
    // If the mesh reference is not available, exit the function.
    if (!meshRef.current) return;

    const { x: currentX, y: currentY, z: currentZ } = meshRef.current.rotation;
    const [targetX, targetY, targetZ] = targetRotation;

    //  Smoothly interpolate the rotation towards the target rotation.
    meshRef.current.rotation.x += (targetX - currentX) * 0.1;
    meshRef.current.rotation.y += (targetY - currentY) * 0.1;
    meshRef.current.rotation.z += (targetZ - currentZ) * 0.1;
  });

  return (
    <mesh ref={meshRef} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"black"} />
      {textures.map((texture, index) => (
        <Plane
          key={index}
          position={[
            FACE_TRANSFORMS[index].position[0] * 1.01,
            FACE_TRANSFORMS[index].position[1] * 1.01,
            FACE_TRANSFORMS[index].position[2] * 1.01,
          ]}
          rotation={FACE_TRANSFORMS[index].rotation}
        >
          <meshBasicMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
          />
        </Plane>
      ))}
    </mesh>
  );
}
