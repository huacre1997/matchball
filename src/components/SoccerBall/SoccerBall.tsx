import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import {
  RigidBody,
  Physics,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import CPGModel from "./Soccer_ball";
import { Box, Html, useContextBridge } from "@react-three/drei";
import { SoccerBallState } from "@/types/SoccerBall";
import { AppContext, useAppContext } from "../../context/AppContext";
import { Dialog } from "../Dialog";
export type BouncingBallProps = {
  ballAnimation: string;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
};
function Marker({ children, ...props }) {
  const ref = useRef();

  return (
    <group ref={ref}>
      <Html
        // 3D-transform contents
        transform
        // Hide contents "behind" other meshes
        occlude
        // We just interpolate the visible state into css opacity and transforms
        style={{
          transition: "all 0.2s",
          opacity: 1,
        }}
        {...props}
      >
        {children}
      </Html>
    </group>
  );
}
const BouncingBall: React.FC<BouncingBallProps> = ({
  ballAnimation,
  animation,
  setAnimation,
}) => {
  const ballRef = useRef<RapierRigidBody>(null);
  const context = useContext(AppContext);

  const [stopped, setStopped] = useState(false);
  useEffect(() => {
    if (ballAnimation == "ballEnter" && animation) {
      if (ballRef.current) {
        setTimeout(() => {
          ballRef.current?.applyImpulse({ x: 1, y: 2, z: 0 }, true);
          ballRef.current?.applyTorqueImpulse({ x: 0, y: 0, z: -1 }, true);
        }, 100);
      }
    }
  }, []);

  const secondClick = () => {
    context?.setVisibleDialog(false);
    context?.setVisibleCharacter(true);
    context?.setVisibleCharacterDialog(true);
  };
  const [hasMoved, setHasMoved] = useState(false);

  useFrame(() => {
    if (ballRef.current && !stopped) {
      const velocity = ballRef.current.linvel();
      const speed = Math.sqrt(
        velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2,
      );

      // Si la pelota ha empezado a moverse, marcamos hasMoved
      if (speed > 0.1) {
        setHasMoved(true);
      }
      console.log(speed);
      // Si ya se movió y ahora está casi detenida, registramos la posición final
      if (hasMoved && speed < 0.05) {
        setStopped(true);
        const { x, y, z } = ballRef.current.translation();
        console.log(
          `⚽ La pelota se detuvo en x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`,
        );
        if (x < -5) {
          ballRef.current?.applyImpulse({ x: 1.5, y: 1, z: 0 }, true);
        }
        context?.setVisibleDialog(true);
        context?.setBallClickHandler(() => () => {
          context?.setVisibleCharacter(true);
          context?.setVisibleDialog(false);
          context?.setVisibleCharacterDialog(true);
        });
      }
    }
  });

  return (
    <RigidBody
      ref={ballRef}
      position={[-19, 11, 0]}
      restitution={1.5}
      friction={0.5}
      linearDamping={0.3}
      angularDamping={0.3}
      colliders="ball"
      ccd
    >
      <CPGModel onClick={context?.ballClickHandler} />
    </RigidBody>
  );
};

const LightWithHelper = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  return (
    <>
      {/* Luz principal direccional */}
      <directionalLight
        ref={lightRef}
        position={[10, 15, 10]}
        intensity={3} // 🔥 Luz más intensa
        castShadow
        shadow-mapSize-width={4096} // 📷 Aumentamos la calidad de la sombra
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <pointLight
        ref={pointLightRef}
        position={[0, 4, 0]} // 📍 Luz sobre el balón
        intensity={2} // 💡 Iluminación más fuerte en el balón
        distance={8} // 🎯 Alcance limitado
        decay={2} // 📉 Atenuación realista
      />
    </>
  );
};
export type FloorProps = {
  setCoordinates: React.Dispatch<React.SetStateAction<Array<number>>>;
  visible: boolean;
};
const Floor: React.FC<FloorProps> = ({ visible = false, setCoordinates }) => {
  const adjustedOpacity = visible ? 1 : 0;
  const adjustedTransparent = !visible ? true : false;
  return (
    <RigidBody
      type="fixed"
      colliders={"cuboid"}
      onCollisionEnter={({ manifold }) => {
        const collisionPoint = manifold.solverContactPoint(0);
        console.log("Collision at world position: ", collisionPoint);

        // Guarda la última posición en el contexto
        setCoordinates([collisionPoint.x, collisionPoint.y, collisionPoint.z]);
      }}
    >
      <mesh
        position={[0, -0.49, 0]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        visible={visible}
      >
        <planeGeometry args={[65, 10]} />
        <meshStandardMaterial
          color="green"
          transparent={adjustedTransparent}
          opacity={adjustedOpacity}
        />
      </mesh>
    </RigidBody>
  );
};

const Walls = ({
  color = "gray",
  transparent = true,
  opacity = 1,
  visible = true,
}) => {
  const adjustedOpacity = visible ? opacity : 0;
  const adjustedTransparent = !visible ? true : transparent;

  return (
    <>
      <RigidBody type="fixed" colliders="cuboid" restitution={1} friction={0}>
        <Box position={[-30, 2.5, 0]} args={[2, 5, 10]}>
          <meshStandardMaterial
            color={color}
            transparent={adjustedTransparent}
            opacity={adjustedOpacity}
          />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={1} friction={0}>
        <Box position={[30, 2.5, 0]} args={[2, 5, 10]}>
          <meshStandardMaterial
            color={color}
            transparent={adjustedTransparent}
            opacity={adjustedOpacity}
          />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={1} friction={0}>
        <Box position={[0, 2.5, -5]} args={[60, 5, 1]}>
          <meshStandardMaterial
            color={color}
            transparent={adjustedTransparent}
            opacity={adjustedOpacity}
          />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <Box position={[0, 2.5, 5.5]} args={[60, 5, 1]}>
          <meshStandardMaterial
            color={color}
            transparent={adjustedTransparent}
            opacity={0}
          />
        </Box>
      </RigidBody>
    </>
  );
};

export type SoccerBallProps = {
  setBallAnimation: React.Dispatch<SetStateAction<SoccerBallState>>;
  ballAnimation: string;
  setAnimation: React.Dispatch<SetStateAction<boolean>>;
  animation: boolean;
  handleClick: (event: React.PointerEvent) => void;
};

const Football: React.FC<SoccerBallProps> = ({
  ballAnimation,
  setAnimation,
  animation,
}) => {
  const context = useContext(AppContext);

  return (
    <>
      <Physics>
        <LightWithHelper />
        <ambientLight intensity={0.3} />
        <spotLight angle={0.25} penumbra={1} position={[10, 10, 5]} />
        <BouncingBall
          ballAnimation={ballAnimation}
          animation={animation}
          setAnimation={setAnimation}
        />

        {/* 🟦 Nuevo Cubo Agregado */}
        <mesh
          position={[
            context!.coordinates[0] - 1.2,
            context!.coordinates[1] - 2,
            context!.coordinates[2],
          ]}
          castShadow
          receiveShadow
        >
          <Html>
            <Dialog
              isVisible={context!.visibleDialog}
              initial={{
                opacity: 0,
                y: -230,
                scale: 0.8,
              }}
            />
          </Html>
        </mesh>
        <Floor visible={true} setCoordinates={context!.setCoordinates} />
        <Walls visible={true} />
      </Physics>
    </>
  );
};

export default Football;
