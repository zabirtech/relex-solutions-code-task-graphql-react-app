import React, { useState, ReactNode } from "react";
import { TransparentContext } from "../src/context/TransparentContext";

interface MockTransparentProviderProps {
  children: ReactNode;
  initialToggledItems?: { [id: string]: boolean };
}

export const MockTransparentProvider = ({
  children,
  initialToggledItems = {},
}: MockTransparentProviderProps) => {
  const [toggledItems, setToggledItems] = useState<{ [id: string]: boolean }>(
    initialToggledItems
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
