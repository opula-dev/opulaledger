import update from "immutability-helper";
import { createContext, useState } from "react";

type formatting = {
    coinSuffix: "g" | "gp" | "gold";
    coinTotals: "separate" | "onlyCopper";
};

export interface AppMenuState {
    formatting: formatting;
}
const defaultState: AppMenuState = { formatting: { coinSuffix: "g", coinTotals: "separate" } };

export interface AppMenuContextState {
    menuState: AppMenuState;
    handleFormatOption: (option: formatting) => void;
}
export const AppMenuContext = createContext<AppMenuContextState>({
    menuState: defaultState,
    handleFormatOption: () => {},
});

interface properties {
    children?: JSX.Element | JSX.Element[];
}

export const AppMenuProvider = ({ children }: properties) => {
    const [menuState, setMenuState] = useState(defaultState);

    const handleFormatOption = (option: formatting) => {
        setMenuState((prevState) => update(prevState, { formatting: { $set: option } }));
    };

    return <AppMenuContext.Provider value={{ menuState, handleFormatOption }}>{children}</AppMenuContext.Provider>;
};
