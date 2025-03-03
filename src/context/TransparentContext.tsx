import React, { createContext, useState, ReactNode } from "react";

interface TransparentContextType {
  toggledItems: { [id: string]: boolean };
  toggleItem: (id: string) => void;
  resetToggled: () => void;
}

export const TransparentContext = createContext<
  TransparentContextType | undefined
>(undefined);

export const TransparentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toggledItems, setToggledItems] = useState<{ [id: string]: boolean }>(
    {}
  );

  const toggleItem = (id: string) => {
    setToggledItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetToggled = () => {
    setToggledItems({});
  };

  return (
    <TransparentContext.Provider
      value={{ toggledItems, toggleItem, resetToggled }}
    >
      {children}
    </TransparentContext.Provider>
  );
};
