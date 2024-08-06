import React, { createContext, useState, useContext, ReactNode } from "react";

interface FlashContextType {
  flash: boolean;
  setFlash: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  severity: 'success' | 'error' | 'warning' | 'info';
  setSeverity: React.Dispatch<React.SetStateAction<'success' | 'error' | 'warning' | 'info'>>;
}

const FlashContext = createContext<FlashContextType | undefined>(undefined);

export const useFlash = (): FlashContextType => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context;
};

interface FlashProviderProps {
  children: ReactNode;
}

export const FlashProvider: React.FC<FlashProviderProps> = ({ children }) => {
  const [flash, setFlash] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  return (
    <FlashContext.Provider value={{ flash, setFlash, message, setMessage, severity, setSeverity }}>
      {children}
    </FlashContext.Provider>
  );
};
