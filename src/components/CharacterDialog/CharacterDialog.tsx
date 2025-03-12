import { motion } from "motion/react";
import { useState, useEffect } from "react";

export type CharacterDialogProps = {
  onCompleteCharacterDialog: () => void;
  isVisible: boolean;
};

const messages = [
  `Qué miras, bobo...? Andá pa' sha!`,
  `Tu polola te quiere decir algo...`,
  `Observa atentamente lo que te preparó Pedrito!`,
  `Haz click en el balón!`,
];

const CharacterDialog: React.FC<CharacterDialogProps> = ({
  onCompleteCharacterDialog,
  isVisible,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    if (!isVisible) return;

    const showMessage = async () => {
      if (currentMessageIndex < messages.length) {
        setIsThinking(true);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula el "pensar..."
        setIsThinking(false);

        const currentMessage = messages[currentMessageIndex];
        setTypedMessage("");
        for (let i = 0; i < currentMessage.length; i++) {
          setTypedMessage((prev) => prev + currentMessage[i]);
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        if (currentMessageIndex === messages.length - 1) {
          setTimeout(onCompleteCharacterDialog, 1000);
        } else {
          setTimeout(() => setCurrentMessageIndex((prev) => prev + 1), 2000);
        }
      }
    };

    showMessage();
  }, [currentMessageIndex, isVisible]);

  return isVisible ? (
    <motion.div
      role="dialog"
      aria-live="polite"
      className="absolute bottom-5/12 left-1/2 max-w-[370px] -translate-x-1/2 rounded-lg bg-white p-5 text-lg font-semibold text-black shadow-lg"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
