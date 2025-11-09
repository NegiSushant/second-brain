import { createContext, useContext, useState, type ReactNode } from "react";

interface BrainContextType {
  refreshVersion: number;
  triggerRefresh: () => void;
}

const BrainContext = createContext<BrainContextType | undefined>(undefined);

export const BrainProvider = ({ children }: { children: ReactNode }) => {
  const [refreshVersion, setRefreshVersion] = useState(0);

  const triggerRefresh = () => {
    setRefreshVersion((prev) => prev + 1);
  };

  return (
    <BrainContext.Provider value={{ refreshVersion, triggerRefresh }}>
      {children}
    </BrainContext.Provider>
  );
};

export const useBrainContext = () => {
  const context = useContext(BrainContext);
  if (!context) {
    throw new Error("useBrainContext must be used inside BrainProvider");
  }
  return context;
};

// export default { BrainProvider, useBrainContext };
