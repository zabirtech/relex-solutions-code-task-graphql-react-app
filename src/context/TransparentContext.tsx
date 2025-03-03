import React, { createContext, useState, ReactNode } from "react";

// TransparentContext: Provides a context for managing the transparency state of items.
// This allows components to share and update the transparency state without prop drilling.

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

  // toggleItem: Toggles the transparency state of an item by its ID.
  // This function updates the state to reflect the toggled status of the item.
  const toggleItem = (id: string) => {
    setToggledItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // resetToggled: Resets the transparency state of all items.
  // Useful for resetting the application to its initial state.
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
