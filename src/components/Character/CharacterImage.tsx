"use client";
import { motion } from "motion/react";
import Image from "next/image";

export type CharacterImageProps = {
  isVisible: boolean;
  characterAnimation: string;
};

const characterVariants = {
  appears: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
  decrease: {
    opacity: 1,
    x: -500,
    y: 100,
    scale: 0.8,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const CharacterImage: React.FC<CharacterImageProps> = ({
  isVisible,
  characterAnimation,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute bottom-1/12 left-140"
      initial={{ x: -20, opacity: 0, scale: 0.8 }}
      animate={characterAnimation}
      variants={characterVariants}
    >
      <Image
        src="/messi.png"
        alt="Messi"
        width={300}
        height={300}
        objectFit="contain"
        quality={100}
        priority
      />
    </motion.div>
  );
};

export default CharacterImage;
