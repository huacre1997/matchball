import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Letter } from "../Letter";

const ClockModalContent: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col p-6 text-center md:flex-row md:items-start lg:items-center">
      {/* Contenedor del reloj 3D */}
      <div className="flex w-full items-center justify-center md:w-1/2">
        <Canvas
          shadows
          orthographic
          camera={{ position: [0, 0, 44], zoom: 40 }}
          gl={{ preserveDrawingBuffer: true }}
          style={{ height: "400px", width: "100%" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            castShadow
            position={[2.5, 12, 12]}
            intensity={10}
          />
          <pointLight position={[20, 20, 20]} />
          <pointLight position={[-20, -20, -20]} intensity={5} />
          <Suspense>
            <Letter text={"6"} />
          </Suspense>
        </Canvas>
      </div>

      {/* Contenedor del mensaje */}
      <div className="flex w-full flex-col items-center space-y-6 md:w-1/2">
        {/* Título con emojis y una línea decorativa */}
        <div className="relative">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            📅 Hoy es un día especial 💖
          </h1>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-pink-500 sm:w-40"></div>
        </div>

        {/* Mensaje de aniversario */}
        <p className="bg-transparent p-4 text-lg leading-relaxed text-gray-700 sm:px-6 sm:text-xl">
          <span className="font-semibold text-pink-600">6 meses</span> de un
          amor que no se mide en tiempo, sino en infinitas sonrisas, miradas
          cómplices y momentos inolvidables. Nuestro cuento de hadas se escribe
          cada día, superando cualquier expectativa. Eres mi mejor aventura, mi
          compañero inseparable, el amor que roba suspiros.
          <span className="mt-3 block font-semibold text-pink-600">
            ¡Feliz aniversario, mi cielo! Te amo. ❤️
          </span>
        </p>
      </div>
    </div>
  );
};

export default ClockModalContent;
