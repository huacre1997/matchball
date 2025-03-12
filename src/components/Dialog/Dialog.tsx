"use client";

import { AppContext } from "@/context/AppContext";
import { AnimatePresence, motion, HTMLMotionProps } from "motion/react";
import { useContext, useEffect } from "react";

export type DialogProps = {
  isVisible: boolean;
} & Omit<HTMLMotionProps<"div">, "onDrag">; // ❌ Evita pasar onDrag incorrectamente
{
}
const Dialog: React.FC<DialogProps> = ({ isVisible, ...props }) => {
  const context = useContext(AppContext);

  useEffect(() => {
    if (context?.coordinates) {
      console.log("Primer valor de coordinates:", context.coordinates[0]);
    } else {
      console.log("Esperando que coordinates tenga valor...");
    }
  }, [isVisible, context?.coordinates]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute w-75 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all"
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }} // Desaparece hacia arriba suavemente
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            type: "spring",
            bounce: 0.25,
          }}
          whileHover={{ scale: 1.02 }} // Efecto flotante al pasar el mouse
          {...props} // ✅ Se aplica correctamente el spread de props
        >
          💙 Haz click aquí, amorcito
          <span className="absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-transparent border-t-blue-600"></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
