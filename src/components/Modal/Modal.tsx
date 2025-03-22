"use client";
import { AppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import React, { useContext } from "react";

const Modal: React.FC = () => {
  const context = useContext(AppContext);

  const closeModal = () => {
    context?.setIsModalOpen(false);
    context?.setModalContent(null);
  };

  return (
    <AnimatePresence>
      {context?.isModalOpen && context?.modalContent && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={closeModal}
        >
          <motion.div
            className="shadow-3xl relative w-full max-w-5xl rounded-2xl bg-white/60 p-6 backdrop-blur-lg sm:w-4/5 md:w-3/5 lg:p-10"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-full bg-gray-300 p-2 text-gray-700 transition hover:scale-110 hover:bg-gray-400"
            >
              ✖
            </button>

            {/* Contenedor con scroll en pantallas pequeñas y sin scroll en grandes */}
            <div className="max-h-[70vh] overflow-y-auto p-3 lg:max-h-none lg:overflow-visible">
              {context.modalContent}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
