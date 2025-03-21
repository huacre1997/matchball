"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, y: 30, rotate: -3 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const hoverEffect = {
  scale: 1.05,
  rotate: 1,
  transition: { duration: 0.3 },
};

// Componente de imagen con skeleton
interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay: number;
}
const ImageWithSkeleton = ({
  src,
  alt,
  width,
  height,
  delay,
  className, // 🔹 Nuevo prop para personalizar estilos
}: ImageWithSkeletonProps & { className?: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={imageVariants}
      custom={delay}
      whileHover={hoverEffect}
      className={`relative w-full overflow-hidden rounded-lg ${className && ""}`} // 🔹 Aplica estilos personalizados
    >
      {/* Skeleton visible mientras la imagen carga */}
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse rounded-lg bg-gray-300 ${className}`} // 🔹 Permite personalizar el Skeleton
        ></div>
      )}
      <Image
        src={src}
        width={width}
        height={height}
        className={`w-full rounded-lg object-cover shadow-md transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        alt={alt}
        priority
        onLoad={() => setLoaded(true)} // Oculta el skeleton cuando la imagen carga
      />
    </motion.div>
  );
};

const CalendarModalContent: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-5 p-3 text-center">
      {/* Título principal */}
      <motion.div variants={fadeInUp} custom={0}>
        <h1 className="flex items-center justify-center gap-2 text-2xl font-extrabold sm:text-3xl md:text-4xl">
          ✈️ Nuestras Aventuras Juntos 💕
        </h1>
        <motion.div
          variants={fadeInUp}
          custom={0.1}
          className="mx-auto mt-2 h-1 w-24 rounded-full bg-pink-500 sm:w-32"
        />
      </motion.div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Bloque de Buenos Aires */}
        <motion.div
          variants={fadeInUp}
          custom={0.2}
          className="flex w-full flex-col items-center justify-center space-y-6 rounded-xl border border-gray-300 bg-transparent p-6 shadow-lg md:w-1/2"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
            🇦🇷 Cuando viajamos a Buenos Aires
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ImageWithSkeleton
              className={"col-span-2"}
              src="/group1_3.jpg"
              width={250}
              height={200}
              alt="Buenos Aires 1"
              delay={0.3}
            />
            <ImageWithSkeleton
              src="/group1_1.jpg"
              width={200}
              height={200}
              alt="Buenos Aires 2"
              delay={0.5}
            />
            <ImageWithSkeleton
              src="/group1_2.jpg"
              width={400}
              height={100}
              alt="Buenos Aires 3"
              delay={0.7}
            />
          </div>
        </motion.div>

        {/* Bloque de Montevideo */}
        <motion.div
          variants={fadeInUp}
          custom={0.9}
          className="flex w-full flex-col items-center space-y-6 rounded-xl border border-gray-300 p-6 shadow-lg md:w-1/2"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold sm:text-xl">
            🇺🇾 Cuando viajamos a Montevideo
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <ImageWithSkeleton
              src="/group2_1.jpg"
              width={180}
              height={100}
              alt="Montevideo 1"
              delay={1.1}
            />
            <ImageWithSkeleton
              src="/group2_2.jpg"
              width={180}
              height={100}
              alt="Montevideo 2"
              delay={1.3}
            />
          </div>

          {/* Bloque de conocer a la familia */}
          <motion.div
            variants={fadeInUp}
            custom={1.5}
            className="w-full border-t border-gray-300 pt-4 text-center"
          >
            <h2 className="mb-3 flex items-center justify-center gap-2 text-lg font-semibold sm:text-xl">
              👨‍👩‍👧‍👦 Cuando conociste a mi familia
            </h2>
            <ImageWithSkeleton
              src="/group3.jpg"
              width={200}
              height={50}
              alt="Familia"
              delay={1.7}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarModalContent;
