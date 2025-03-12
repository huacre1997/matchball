import { CharacterDialog } from "@/components";
import CharacterImage from "@/components/Character/CharacterImage";
import { Dialog } from "@/components/Dialog";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Suspense } from "react";
import { Football } from "@/components/SoccerBall";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useContextBridge } from "@react-three/drei";
import { SoccerBallState } from "@/types/SoccerBall";
import { AppContext } from "@/context/AppContext";

export default function Home() {
  const [ballAnimation, setBallAnimation] =
    useState<SoccerBallState>("ballEnter");
  const [animation, setAnimation] = useState<boolean>(true);
  const [statusCharacter, setStatusCharacter] = useState<
    "appears" | "decrease"
  >("appears");
  const [dialogFinished, setDialogFinished] = useState(false);
  const ContextBridge = useContextBridge(AppContext);
  const context = useContext(AppContext);
  const handleChangeAnimation = () => {
    if (ballAnimation == "ballEnter" && !animation) {
      context?.setVisibleCharacter(true);
      context?.setVisibleCharacterDialog(true);
      // setVisibleDialog(false);
    }
  };

  const onCompleteCharacterDialog = () => {
    context?.setBallClickHandler(() => () => {
      context?.setVisibleCharacterDialog(false);
      setStatusCharacter("decrease");
      setBallAnimation("resizeBall");
    });
  };

  useEffect(() => {}, [dialogFinished]);
  useEffect(() => {
    if (!animation && ballAnimation == "ballEnter") {
      // setVisibleDialog(true);
    }
  }, [animation, ballAnimation]);

  return (
    <>
      <div className="relative h-dvh">
        <Image
          src="/bg.png"
          alt="Cancha de fútbol"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <Canvas
          style={{ position: "absolute" }}
          shadows
          camera={{ position: [0, 9.85, 25.39], fov: 40 }} // 🔍 Cámara más alejada
        >
          <Suspense>
            <ContextBridge>
              <Football
                handleClick={handleChangeAnimation}
                setBallAnimation={setBallAnimation}
                ballAnimation={ballAnimation}
                animation={animation}
                setAnimation={setAnimation}
              />
            </ContextBridge>
            <OrbitControls
              target={[0, 6, 0]} // La cámara mira a este punto inicialmente
              enableZoom={false}
              enableRotate={false}
              enablePan={false}
            />
          </Suspense>
        </Canvas>

        <CharacterDialog
          isVisible={context!.visibleCharacterDialog}
          onCompleteCharacterDialog={onCompleteCharacterDialog}
        />
        <CharacterImage
          isVisible={context!.visibleCharacter}
          characterAnimation={statusCharacter}
        />
      </div>
    </>
  );
}
