import React, { createContext, useState, ReactNode } from "react";

// Definir los tipos del contexto
interface AppContextType {
  coordinates: Array<number>;
  setCoordinates: React.Dispatch<React.SetStateAction<Array<number>>>;
  visibleDialog: boolean;
  visibleCharacter: boolean;
  visibleCharacterDialog: boolean;
  setVisibleCharacter: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleCharacterDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleDialog: React.Dispatch<React.SetStateAction<boolean>>;
  ballClickHandler: (() => void) | undefined;
  setBallClickHandler: React.Dispatch<
    React.SetStateAction<(() => void) | undefined>
  >;
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
  const [ballClickHandler, setBallClickHandler] = useState<
    (() => void) | undefined
  >(undefined);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
