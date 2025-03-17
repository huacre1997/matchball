import React, { createContext, useState, ReactNode } from "react";

// Definir los tipos del contexto
interface AppContextType {
  coordinates: Array<number>;
  setCoordinates: React.Dispatch<React.SetStateAction<Array<number>>>;
  visibleDialog: boolean;
  visibleCharacter: boolean;
  visibleCharacterDialog: boolean;
  setVisibleCharacter: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  visibleButtons: boolean;
  setVisibleButtons: React.Dispatch<React.SetStateAction<boolean>>;
  isEnded: boolean;
  setIsEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleCharacterDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleDialog: React.Dispatch<React.SetStateAction<boolean>>;
  ballClickHandler: (() => void) | undefined;
  setBallClickHandler: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
  dialogMessages: Array<string>;
  setDialogMessages: React.Dispatch<React.SetStateAction<Array<string>>>;
  dialogPosition: string;
  setDialogPosition: React.Dispatch<React.SetStateAction<string>>;
  modalContent: React.ReactNode;
  setModalContent: (content: React.ReactNode) => void;
}

// Crear el contexto con valores por defecto
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [coordinates, setCoordinates] = useState<number[]>([0, 0, 0]); // 🔥 Asegúrate de que tiene valores iniciales
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [visibleCharacter, setVisibleCharacter] = useState(false);
  const [visibleCharacterDialog, setVisibleCharacterDialog] = useState(false);
  const [visibleButtons, setVisibleButtons] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogMessages, setDialogMessages] = useState<string[]>([]);
  const [isEnded, setIsEnded] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [ballClickHandler, setBallClickHandler] = useState<
    (() => void) | undefined
  >(undefined);
  const [dialogPosition, setDialogPosition] = useState<string>("center");
  return (
    <AppContext.Provider
      value={{
        coordinates,
        setCoordinates,
        visibleDialog,
        setVisibleDialog,
        visibleCharacter,
        setVisibleCharacter,
        visibleCharacterDialog,
        setVisibleCharacterDialog,
        ballClickHandler,
        setBallClickHandler,
        dialogMessages,
        setDialogMessages,
        dialogPosition,
        setDialogPosition,
        setIsEnded,
        isEnded,
        setVisibleButtons,
        visibleButtons,
        setIsModalOpen,
        isModalOpen,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
