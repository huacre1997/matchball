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
  const isMobile = useMediaQuery("(max-width: 640px)"); // sm
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 768px)"); // md
  const isLaptop = useMediaQuery("(min-width: 769px) and (max-width: 1024px)"); // lg
  const isDesktop = useMediaQuery(
    "(min-width: 1025px) and (max-width: 1280px)",
  ); // lg
  const characterVariants = {
    appears: {
      x: 0,
      opacity: 1,
      scale: isMobile ? 0.8 : isTablet ? 0.9 : isLaptop ? 1 : isDesktop ? 1 : 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    decrease: {
      opacity: 1,
      x: isMobile
        ? -50
        : isTablet
          ? 0
          : isLaptop
            ? -200
            : isDesktop
              ? -300
              : -100,
      y: 100,
      scale: 0.8,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`absolute ${isMobile ? "bottom-1/12 left-1/12" : isTablet ? "bottom-1/12 left-2/12" : isLaptop ? "bottom-1/12 left-2/12" : isDesktop ? "bottom-1/12 left-3/12" : "bottom-1/12 left-4/12"}`}
      initial={{ x: -20, opacity: 0, scale: 0.8 }}
      animate={characterAnimation}
      variants={characterVariants}
    >
      <Image
        src="/messi.png"
        alt="Messi"
        width={isMobile ? 180 : isTablet ? 200 : isLaptop ? 250 : 250}
        height={300}
        quality={100}
        priority
      />
    </motion.div>
  );
};

export default CharacterImage;
