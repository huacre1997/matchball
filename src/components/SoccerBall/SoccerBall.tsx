import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { RigidBody, Physics, RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { RigidBodyType } from "@dimforge/rapier3d-compat";
import * as THREE from "three";
import CPGModel from "./Soccer_ball";
import { Html } from "@react-three/drei";
import { SoccerBallState, SoccerBallStates } from "@/types/SoccerBall";
import { AppContext } from "../../context/AppContext";
import { Dialog } from "../Dialog";
import { Walls } from "../Walls";
import { Floor } from "../Floor";
import { Group } from "three";
import { motion } from "motion/react";
import {
  MusicalNoteIcon,
  FilmIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

import { ClockModalContent } from "../ClockModalContent";
import { MovieModalContent } from "../MovieModalContent";
import { MusicModalContent } from "../MusicModalContent";
import { CalendarModalContent } from "../CalendarModalContent";
import { useMediaQuery } from "usehooks-ts";
export type BouncingBallProps = {
  ballAnimation: string;
  animation: boolean;
  setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  setBallAnimation: React.Dispatch<SetStateAction<SoccerBallState>>;
};

interface BallButtonProps extends React.ComponentProps<typeof Html> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Corregido
  opacity?: number;
}

function BallButton({ children, onClick, ...props }: BallButtonProps) {
  const ref = useRef<Group>(null);

  return (
    <group ref={ref}>
      <Html transform occlude zIndexRange={[1, 0]} {...props}>
        <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
          <motion.button
            onClick={onClick}
            className="bg-blue relative z-[9933] h-full w-full cursor-pointer items-center justify-center rounded-full text-[1px]"
            initial={{ opacity: 0.3 }}
            whileHover={{ opacity: 1 }}
          >
            {children}
            <motion.span className="bg-blue inset-0 z-[-1] m-auto h-1 w-1 rounded-full transition duration-500 group-hover:bg-gray-950" />
          </motion.button>
        </div>
      </Html>
    </group>
  );
}

const BouncingBall: React.FC<BouncingBallProps> = ({
  ballAnimation,
  animation,
  setBallAnimation,
}) => {
  const ballRef = useRef<RapierRigidBody>(null);
  const context = useContext(AppContext);
  const isRotatingRef = useRef(false); // 🔹 Usamos useRef en lugar de useState
  const modelRef = useRef<Group>(null); // 🔹 Ref para el modelo de la pelota

  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (!animation || !ballRef.current) return;

    const timeoutId = setTimeout(() => {
      if (ballAnimation === SoccerBallStates.BALL_ENTER) {
        ballRef.current?.applyImpulse({ x: 10.5, y: 4, z: 0 }, true);
        ballRef.current?.applyTorqueImpulse({ x: 0, y: 0, z: -2 }, true);
      } else if (ballAnimation === SoccerBallStates.RESIZE_BALL) {
        ballRef.current?.applyImpulse({ x: 0, y: 18, z: 17.5 }, true);
        // ballRef.current?.applyTorqueImpulse({ x: 0, y: 0.2, z: 0 }, true);
      }
    }, 100);

    return () => clearTimeout(timeoutId); // Limpia el timeout al desmontar o actualizar
  }, [ballAnimation, animation]);

  const [hasMoved, setHasMoved] = useState(false);

  useFrame(() => {
    if (
      ballRef.current &&
      ballAnimation == SoccerBallStates.RESIZE_BALL &&
      !stopped
    ) {
      const position = ballRef.current.translation();
      console.log("⚽ Pelota detenida en el aire en:", position);

      if (position.z > 23) {
        // 🔹 Cambia el número según la altura deseada
        ballRef.current.setTranslation({ x: 0, y: position.y, z: 23 }, true);
        ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        ballRef.current.setBodyType(RigidBodyType.KinematicVelocityBased, true);
        isRotatingRef.current = true; // 🔹 Marcamos que debe rotar
        const rotation = new THREE.Euler(0, 0, Math.PI / 2); // Rotar 45° en Z
        const quaternion = new THREE.Quaternion().setFromEuler(rotation);
        ballRef.current.setRotation(quaternion, true);
        ballRef.current.setAngvel({ x: 0, y: 0.2, z: 0 }, true); // Rotación lenta en el eje Y
        context?.setCoordinates([position.x, position.y, 23]);
        setStopped(true);
      }
    }
    if (
      ballRef.current &&
      !stopped &&
      ballAnimation == SoccerBallStates.BALL_ENTER
    ) {
      const velocity = ballRef.current.linvel();
      const speed = Math.sqrt(
        velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2,
      );

      // Si la pelota ha empezado a moverse, marcamos hasMoved
      if (speed > 0.1) {
        setHasMoved(true);
      }
      // Si ya se movió y ahora está casi detenida, registramos la posición final
      if (hasMoved && speed < 0.05) {
        setStopped(true);

        const { x, y, z } = ballRef.current.translation();

        console.log(
          `⚽ La pelota se detuvo en x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`,
        );
        // context?.setCoordinates([x, y, z]);

        context?.setVisibleDialog(true);
        if (x < -5) {
          ballRef.current?.applyImpulse({ x: 1.5, y: 1, z: 0 }, true);
        }
        context?.setBallClickHandler(() => () => {
          setBallAnimation(SoccerBallStates.STOP);
          context?.setVisibleCharacter(true);
          context?.setVisibleCharacterDialog(true);
          context?.setDialogPosition("center");
          context?.setDialogMessages([
            "Qué miras, bobo...? Andá pa' sha!",
            "Tu polola te quiere decir algo...",
            "Observa atentamente lo que te preparó Pedrito!",
            "Haz click en el balón!",
          ]);
          context?.setVisibleDialog(false);
          context?.setBallClickHandler(() => () => {});
          setStopped(false);
        });
      }
      if (isRotatingRef.current) {
        ballRef.current.applyTorqueImpulse({ x: 0, y: -0.1, z: 0 }, true);
      }
    }
  });
  const handleClickA = () => {
    context?.setIsModalOpen(true);
    context?.setModalContent(<MusicModalContent />);
  };
  const handleClickB = () => {
    context?.setIsModalOpen(true);
    context?.setModalContent(<MovieModalContent />);
  };
  const handleClickC = () => {
    context?.setIsModalOpen(true);
    context?.setModalContent(<ClockModalContent />);
  };
  const handleClickD = () => {
    context?.setIsModalOpen(true);
    context?.setModalContent(<CalendarModalContent />);
  };
  return (
    <RigidBody
      ref={ballRef}
      position={[-19, 11, 0]}
      restitution={1.5}
      friction={3}
      linearDamping={1} // 🔹 Aumentado para frenar más rápido
      angularDamping={1} // 🔹
      colliders="ball"
      ccd
    >
      <group ref={modelRef}>
        {context?.visibleButtons && (
          <>
            <BallButton
              rotation={[(-2 * Math.PI) / 3, 0, 4.5]}
              position={[0.0, 0.455, -0.23]}
              opacity={1}
              onClick={handleClickA}
            >
              <MusicalNoteIcon />
            </BallButton>
            <BallButton
              rotation={[Math.PI, 0, 4.5]}
              position={[0.01, 0, -0.509]}
              opacity={1}
              onClick={handleClickB}
            >
              <FilmIcon className="size-1" />
            </BallButton>
            <BallButton
              rotation={[Math.PI, 0, 2]}
              opacity={1}
              position={[0, 0.011, 0.509]}
              onClick={handleClickC}
            >
              <ClockIcon className="size-1" />
            </BallButton>
            <BallButton
              opacity={1}
              rotation={[Math.PI / 3, 0, 5]}
              position={[0.0, -0.455, 0.23]}
              onClick={handleClickD}
            >
              <CalendarIcon className="size-1" />
            </BallButton>
          </>
        )}
        <CPGModel onClick={context?.ballClickHandler} />
      </group>
    </RigidBody>
  );
};
const LightWithHelper = () => {
  return (
    <>
      {/* Luz direccional fija */}
      <directionalLight
        position={[10, 15, 10]} // 🔹 Posición fija
        intensity={8}
        castShadow
        shadow-mapSize-width={3000}
        shadow-mapSize-height={3000}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Luz puntual sobre la pelota */}
      <pointLight position={[0, 4, 0]} intensity={2} distance={8} decay={2} />
    </>
  );
};

export type SoccerBallProps = {
  setBallAnimation: React.Dispatch<SetStateAction<SoccerBallState>>;
  ballAnimation: string;
  setAnimation: React.Dispatch<SetStateAction<boolean>>;
  animation: boolean;
};

const Football: React.FC<SoccerBallProps> = ({
  ballAnimation,
  setAnimation,
  animation,
  setBallAnimation,
}) => {
  const context = useContext(AppContext);

  const isMobile = useMediaQuery("(max-width: 640px)"); // sm
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 768px)"); // md
  const isLaptop = useMediaQuery("(min-width: 769px) and (max-width: 1024px)"); // lg
  const getMeshPosition = (): [number, number, number] => {
    if (isMobile) {
      return [
        context!.coordinates[0] - 4.4,
        context!.coordinates[1] + 3.4,
        context!.coordinates[2],
      ];
    } else if (isTablet) {
      return [
        context!.coordinates[0] - 4.4,
        context!.coordinates[1] + 3.4,
        context!.coordinates[2],
      ];
    } else if (isLaptop) {
      return [
        context!.coordinates[0] - 3,
        context!.coordinates[1] + 3.4,
        context!.coordinates[2],
      ];
    } else {
      // isDesktop
      return [
        context!.coordinates[0] - 3,
        context!.coordinates[1] + 3.4,
        context!.coordinates[2],
      ];
    }
  };

  return (
    <>
      <LightWithHelper />

      <Physics gravity={[0, -25, 0]}>
        <ambientLight intensity={0.3} />
        <spotLight angle={0.25} penumbra={1} position={[10, 10, 5]} />
        <BouncingBall
          ballAnimation={ballAnimation}
          animation={animation}
          setAnimation={setAnimation}
          setBallAnimation={setBallAnimation}
        />

        <mesh
          position={getMeshPosition()}
          castShadow
          receiveShadow
          userData={{ style: "z-1" }}
        >
          <Html zIndexRange={[100, 0]}>
            <Dialog
              isVisible={context!.visibleDialog}
              initial={{
                opacity: 0,
                y: 0,
                scale: isMobile ? 0.6 : isTablet ? 0.7 : isLaptop ? 0.8 : 0.9,
              }}
            />
          </Html>
        </mesh>

        <Floor visible={false} setCoordinates={context!.setCoordinates} />
        <Walls visible={false} />
      </Physics>
    </>
  );
};
export default Football;
