import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ItemState {
    id: string;
    name: string;
    amount: number;
}

export type ItemCollectionContextState = {
    items: readonly ItemState[];
    itemOptions: readonly string[];
    upsertItem: (item: ItemState) => void;
    deleteItem: (item: ItemState) => void;
};

export const ItemCollectionContext = createContext<ItemCollectionContextState>({
    items: [],
    itemOptions: [],
    upsertItem: () => {},
    deleteItem: () => {},
});

export const createItem = (name: string, amount: number) => {
    return { id: uuidv4(), name, amount };
};

interface properties {
    children: JSX.Element;
}

export const ItemCollectionHandler = ({ children }: properties) => {
    const [items, setItems] = useState<ItemState[]>([]);

    const uniqueItemNames = items.filter((item, index, arr) => arr.indexOf(item) === index).map((i) => i.name);

    const upsertItem = (item: ItemState) => {
        const index = items.findIndex((x) => x.id === item.id);
        if (index === -1) {
            setItems((prevItems) => [item, ...prevItems]);
        } else {
            setItems((prevItems) => [item, ...prevItems.slice(0, index), ...prevItems.slice(index, prevItems.length)]);
        }
    };

    const deleteItem = (item: ItemState) => {
        const index = items.findIndex((x) => x.id === item.id);
        if (index === -1) return;

        setItems((prevItems) => [...prevItems.slice(0, index), ...prevItems.slice(index, prevItems.length)]);
    };

    return (
        <ItemCollectionContext.Provider value={{ items, itemOptions: uniqueItemNames, upsertItem, deleteItem }}>
            {children}
        </ItemCollectionContext.Provider>
    );
};
