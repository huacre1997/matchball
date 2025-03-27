"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

export type CharacterImageProps = {
  isVisible: boolean;
  characterAnimation: string;
};

const CharacterImage: React.FC<CharacterImageProps> = ({
  isVisible,
  characterAnimation,
}) => {
  const matches = useMediaQuery("(max-width: 768px)");
  const characterVariants = {
    appears: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    decrease: {
      opacity: 1,
      x: matches ? 0 : -500,
      y: 100,
      scale: 0.8,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`absolute ${matches ? "bottom-[60px] left-[-20px]" : "bottom-1/12 left-140"}`}
      initial={{ x: -20, opacity: 0, scale: 0.8 }}
      animate={characterAnimation}
      variants={characterVariants}
    >
      <Image
        src="/messi.png"
        alt="Messi"
        width={matches ? 200 : 300}
        height={300}
        quality={100}
        priority
      />
    </motion.div>
  );
};

export default CharacterImage;
