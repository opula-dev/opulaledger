import { AppMenuState } from "../context/AppMenuContext";
import { EntryComposition } from "./LedgerTypes";

interface EntryFormatter {
    goldSuffix: "g" | "gp" | " gold";
    silverSuffix: "s" | "sp" | " silver";
    copperSuffix: "c" | "cp" | " copper";
}

export const menuOptionToFormat: (menu: AppMenuState) => EntryFormatter = (menu) => {
    switch (menu.formatting.coinSuffix) {
        case "g":
            return { goldSuffix: "g", silverSuffix: "s", copperSuffix: "c" };
        case "gp":
            return { goldSuffix: "gp", silverSuffix: "sp", copperSuffix: "cp" };
        case "gold":
            return {
                goldSuffix: " gold",
                silverSuffix: " silver",
                copperSuffix: " copper",
            };
    }
};

export const FormatEntries = (entries: EntryComposition[], format: EntryFormatter) => {
    let formattedResult = "";

    entries.forEach((entry) => {
        const entryTitle = entry.detail.title;
        const entryCoin = entry.detail.coin;
        if (!entryTitle && entryCoin.copper === 0 && entryCoin.silver === 0 && entryCoin.gold === 0) {
            return;
        }

        let formattedCoin = "";

        if (entryCoin.gold !== 0) {
            formattedCoin += `${entryCoin.gold}${format.goldSuffix} `;
        }
        if (entryCoin.silver !== 0) {
            formattedCoin += `${entryCoin.silver}${format.silverSuffix} `;
        }
        if (entryCoin.copper !== 0) {
            formattedCoin += `${entryCoin.copper}${format.copperSuffix} `;
        }

        if (formattedCoin.trim()) {
            formattedCoin = entryCoin.sign + formattedCoin;
        }

        formattedResult += `${formattedCoin}${entryTitle}\n`;
    });

    return formattedResult;
};
