import { createContext, useState } from "react";
import update from "immutability-helper";
import { Preview } from "@mui/icons-material";

export interface ItemState {
  source: string;
  id: string;
  name: string;
  amount: number;
}

export type ItemCollectionContextState = {
  items: readonly ItemState[];
  upsertItem: (item: ItemState) => void;
  deleteItem: (item: ItemState) => void;
};

export const ItemCollectionContext = createContext<ItemCollectionContextState>({
  items: [],
  upsertItem: (x) => {},
  deleteItem: (x) => {},
});

interface properties {
  children: JSX.Element;
}

export const ItemCollectionHandler = ({ children }: properties) => {
  const [items, setItems] = useState<ItemState[]>([]);

  const upsertItem = (item: ItemState) => {
    const index = items.findIndex((x) => x.id === item.id);
    if (index === -1) {
      setItems((prevItems) => [item, ...prevItems]);
    } else {
      setItems((prevItems) => [
        item,
        ...prevItems.slice(0, index),
        ...prevItems.slice(index, prevItems.length),
      ]);
    }
  };

  const deleteItem = (item: ItemState) => {
    const index = items.findIndex((x) => x.id === item.id);
    if (index === -1) return;

    setItems((prevItems) => [
      ...prevItems.slice(0, index),
      ...prevItems.slice(index, prevItems.length),
    ]);
  };

  return (
    <ItemCollectionContext.Provider value={{ items, upsertItem, deleteItem }}>
      {children}
    </ItemCollectionContext.Provider>
  );
};
