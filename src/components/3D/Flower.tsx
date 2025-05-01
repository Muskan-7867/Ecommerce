import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Group } from "three";

type GLTFResult = GLTF & {
  nodes: {
    group2033663355: THREE.Mesh;
    mesh790836088: THREE.Mesh;
    mesh790836088_1: THREE.Mesh;
    mesh790836088_2: THREE.Mesh;
    group1291483580: THREE.Mesh;
  };
  materials: {
    mat10: THREE.MeshStandardMaterial;
    mat21: THREE.MeshStandardMaterial;
    mat12: THREE.MeshStandardMaterial;
  };
};

export function Flower(props: React.JSX.IntrinsicElements["group"]) {
  const group = useRef<Group>(null);

  // ✅ Use a *single* useGLTF call
  const gltf = useGLTF("../../../public//assets/Flower.glb") as unknown as GLTFResult;

  // Load animations correctly
  const { actions } = useAnimations(gltf.animations, group);

  useEffect(() => {
    const clip = actions?.["Animation"] || Object.values(actions || {})[0];
    clip?.reset().play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes.group2033663355.geometry}
        material={gltf.materials.mat10}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes.group1291483580.geometry}
        material={gltf.materials.mat10}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes.mesh790836088.geometry}
        material={gltf.materials.mat10}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes.mesh790836088_1.geometry}
        material={gltf.materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={gltf.nodes.mesh790836088_2.geometry}
        material={gltf.materials.mat12}
      />
    </group>
  );
}


useGLTF.preload("../../../public//assets/Flower.glb");
