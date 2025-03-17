"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";

const MusicModalContent: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 215; // Duración total en segundos (3 minutos y 35 segundos)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 1 : duration));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-10 p-4 sm:p-6 md:flex-row md:items-start">
      {/* Columna izquierda: Reproductor de música */}
      <div className="flex w-full flex-col items-center justify-center space-y-6 md:w-1/2">
        {/* Imagen del álbum */}
        <Image
          src="/album.jpg"
          alt="Álbum Cover"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
          priority
        />
        <div className="text-center">
          <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
            Carry You (feat. Oaks & Declan J Donovan)
          </h2>
          <p className="text-sm text-gray-800 sm:text-base md:text-lg">
            Martin Garrix & Third ≡ Party
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="w-full max-w-xs px-4 sm:max-w-md">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full cursor-pointer accent-gray-800"
          />
          <div className="flex justify-between text-xs text-gray-600 sm:text-sm">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controles de música */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 sm:p-3">
            <BackwardIcon className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="rounded-full bg-gray-800 p-3 text-white transition hover:bg-gray-900 sm:p-4"
          >
            {isPlaying ? (
              <PauseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
          <button className="rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 sm:p-3">
            <ForwardIcon className="h-5 w-5 text-gray-700 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>

      {/* Columna derecha: Texto y foto */}
      <div className="flex w-full flex-col items-center space-y-6 text-center md:w-1/2">
        <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          🎶 Nuestra canción, nuestro amor 💖
        </h1>
        <p className="px-4 text-justify text-base text-gray-800 sm:px-6 sm:text-lg md:text-xl">
          Pedro, cada vez que la escucho, vuelvo a esos momentos contigo. La
          primera vez que la oímos juntos, esa sonrisa tuya, la forma en que el
          mundo se detenía cuando sonaba. Es nuestra historia en cada acorde, y
          siempre nos traerá de vuelta el uno al otro. ❤️🎶
        </p>
        <Image
          src="/amor1.jpg"
          alt="Sorpresa"
          width={280}
          height={180}
          className="rounded-lg shadow-md sm:h-auto sm:w-80"
          priority
        />
      </div>
    </div>
  );
};

export default MusicModalContent;
