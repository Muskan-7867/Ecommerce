// Scene.tsx
import { OrbitControls, SpotLight } from "@react-three/drei";
import { useControls } from "leva";
import { Flower } from "./Flower";

const Scene = () => {
  const { fly } = useControls({ fly: 0 });

  return (
    <>
      <OrbitControls />
      <SpotLight position={[0, 3.4, 0]} angle={0.5} power={20} castShadow />

      {/* Animated flower model */}
      <Flower scale={[0.5, 0.5, 0.5]} position={[0, 1.8, 0]} />

      {/* Animated sphere using Leva */}
      <mesh
        scale={[0.2, 0.2, 0.2]}
        position={[0, fly, 0]}
        receiveShadow
        castShadow
      >
        <sphereGeometry />
        <meshStandardMaterial />
      </mesh>

      {/* Static geometry */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      <mesh position={[0, 0.5, 0]} scale={[5, 0.02, 5]} receiveShadow castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      <gridHelper />
    </>
  );
};

export default Scene;
