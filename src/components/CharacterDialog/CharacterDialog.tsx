import { AppContext } from "@/context/AppContext";
import { motion } from "motion/react";
import { useState, useEffect, useContext } from "react";
import { useMediaQuery } from "usehooks-ts";

export type CharacterDialogProps = {
  onCompleteCharacterDialog: () => void;
  isVisible: boolean;
  messages: string[];
};

const CharacterDialog: React.FC<CharacterDialogProps> = ({
  onCompleteCharacterDialog,
  isVisible,
  messages,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const context = useContext(AppContext);
  const matches = useMediaQuery("(max-width: 768px)");
  const dialogVariants = {
    center: { x: -20, y: matches ? 80 : 0 },
    bottom: {
      x: matches ? 45 : -550,
      y: matches ? 250 : 100,
      scale: matches ? 0.8 : 1,
    },
  };

  useEffect(() => {
    if (!isVisible || messages.length === 0) return;
    if (context?.isEnded) return;
    const showMessage = async () => {
      if (currentMessageIndex < messages.length) {
        setIsThinking(true);
        await new Promise((resolve) => setTimeout(resolve, 8)); // Simula el "pensar..."
        setIsThinking(false);

        const currentMessage = messages[currentMessageIndex];
        setTypedMessage("");

        for (let i = 0; i < currentMessage.length; i++) {
          setTypedMessage((prev) => prev + currentMessage[i]);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // Alternar entre "left" y "right"
        context?.setDialogPosition((prev) =>
          prev === "center" ? "center" : "bottom",
        );

        if (currentMessageIndex === messages.length - 1) {
          setTimeout(() => {
            onCompleteCharacterDialog();
            setCurrentMessageIndex(0);
          }, 1000);
        } else {
          setTimeout(() => setCurrentMessageIndex((prev) => prev + 1), 10);
        }
      }
    };

    showMessage();
  }, [currentMessageIndex, isVisible, messages]);

  return isVisible ? (
    <motion.div
      role="dialog"
      aria-live="polite"
      className="absolute bottom-5/12 left-1/2 max-w-[450px] -translate-x-1/2 rounded-lg bg-white p-5 text-lg font-semibold text-black shadow-lg lg:max-w-[380px]"
      initial="left" // Posición inicial
      animate={context?.dialogPosition} // Se controla con el estado
      variants={dialogVariants} // Usa las variantes de Framer Motion
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="inline-block"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
              delay: 5,
            },
          },
        }}
      >
        {isThinking ? (
          <motion.span
            className="inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        ) : (
          typedMessage.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))
        )}
      </motion.div>

      <div className="absolute -bottom-4 left-4 h-0 w-0 rotate-[270deg] border-t-[20px] border-l-[20px] border-t-white border-l-transparent"></div>
    </motion.div>
  ) : null;
};

export default CharacterDialog;
