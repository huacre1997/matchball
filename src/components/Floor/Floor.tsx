"use client";
import { RigidBody } from "@react-three/rapier";
import React from "react";

export type FloorProps = {
  setCoordinates: React.Dispatch<React.SetStateAction<Array<number>>>;
  visible: boolean;
};

const Floor: React.FC<FloorProps> = ({ setCoordinates, visible }) => {
  return (
    <RigidBody
      type="fixed"
      colliders={"cuboid"}
      onCollisionEnter={({ manifold }) => {
        const collisionPoint = manifold.solverContactPoint(0);
        console.log("Collision at world position: ", collisionPoint);

        setCoordinates([collisionPoint.x, collisionPoint.y, collisionPoint.z]);
      }}
    >
      {/* Plano invisible para colisiones */}
      <mesh position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[65, 10]} />
        <meshStandardMaterial
          color="green"
          transparent={!visible}
          opacity={visible ? 1 : 0}
          depthWrite={false}
        />
      </mesh>

      <mesh
        position={[0, -0.49, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[65, 10]} />
        <shadowMaterial opacity={1} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
