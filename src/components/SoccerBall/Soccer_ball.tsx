/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/soccer_ball.glb -o Soccer.tsx 
*/

import * as THREE from "three";
import React, { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    geo1_principledshader_0: THREE.Mesh;
  };
  materials: {
    principledshader: THREE.MeshStandardMaterial;
  };
};

export default function CPGModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "./models/soccer_ball.glb",
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.geo1_principledshader_0.geometry}
        material={materials.principledshader}
        scale={1}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("./models/soccer_ball.glb");
