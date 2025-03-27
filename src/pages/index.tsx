import { CharacterDialog } from "@/components";
import CharacterImage from "@/components/Character/CharacterImage";

import Image from "next/image";
import { useContext, useState } from "react";
import { Suspense } from "react";
import { Football } from "@/components/SoccerBall";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useContextBridge } from "@react-three/drei";
import { SoccerBallState } from "@/types/SoccerBall";
import { AppContext } from "@/context/AppContext";
import { Modal } from "@/components/Modal";
import { useMediaQuery } from "usehooks-ts";

export default function Home() {
  const [ballAnimation, setBallAnimation] =
    useState<SoccerBallState>("ballEnter");
  const [animation, setAnimation] = useState<boolean>(true);
  const [statusCharacter, setStatusCharacter] = useState<
    "appears" | "decrease"
  >("appears");
  const ContextBridge = useContextBridge(AppContext);
  const context = useContext(AppContext);

  const onCompleteCharacterDialog = () => {
    context?.setIsEnded(true);
    context?.setBallClickHandler(() => () => {
      if (ballAnimation == "resizeBall") return;
      setStatusCharacter("decrease");
      setBallAnimation("resizeBall");
      context?.setVisibleButtons(true);
      context?.setDialogPosition("bottom");
      context?.setDialogMessages([
        "Haz click en las figuras negras del balon Pedro!",
      ]);
      context?.setVisibleCharacterDialog(true);
      context?.setIsEnded(false);
      context?.setBallClickHandler(() => () => {});
    });
  };
  const matches = useMediaQuery("(max-width: 768px)");

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
          camera={{ position: [0, 9.85, 25.39], fov: matches ? 55 : 40 }} // 🔍 Cámara más alejada
        >
          <Suspense>
            <ContextBridge>
              <Football
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
          messages={context!.dialogMessages}
        />

        <CharacterImage
          isVisible={context!.visibleCharacter}
          characterAnimation={statusCharacter}
        />
        <Modal />
      </div>
    </>
  );
}
