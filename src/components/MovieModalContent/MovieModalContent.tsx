"use client";
import Image from "next/image";

const MovieModalContent: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-10 p-6 md:flex-row md:items-center lg:gap-16">
      {/* Columna izquierda: Imagen de la película */}
      <div className="flex w-full flex-col items-center justify-center md:w-1/2">
        <Image
          src="/movie.jpg"
          alt="Película favorita"
          width={300}
          height={600}
          className="w-full max-w-xs rounded-lg border border-gray-300 shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg"
          priority
        />
      </div>

      {/* Columna derecha: Texto con diseño mejorado */}
      <div className="flex w-full flex-col items-center space-y-6 text-center md:w-1/2">
        {/* Título mejorado con emojis y línea decorativa */}
        <div className="relative w-full">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
            🎥 Nuestra película especial 🍿
          </h1>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-blue-500 sm:w-32 md:w-40"></div>
        </div>

        {/* Mensaje con mejor diseño */}
        <p className="max-w-xs p-6 px-4 text-justify text-base leading-relaxed sm:max-w-sm sm:px-6 sm:text-lg md:max-w-md md:text-xl lg:max-w-lg">
          Pedro, más allá de las palabras y de cualquier película, está lo
          nuestro. Un amor que no se parece a ningún otro, que brilla con luz
          propia y es solo nuestro. 💫 A veces siento que hasta el mundo nos
          envidia, pero no importa, porque lo único que necesito eres tú.
          <span className="mt-3 block font-semibold text-blue-600">
            Te amo infinitamente. ❤️
          </span>
        </p>
      </div>
    </div>
  );
};

export default MovieModalContent;
