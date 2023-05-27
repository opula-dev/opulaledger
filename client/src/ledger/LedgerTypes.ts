import { DnDItemType } from "../component/DnDItem";
import { CoinPurseState } from "../context/CoinPurseContext";
import { ItemState } from "../context/ItemCollectionContext";

export const TransactionTypes = ["purchase", "sale", "trade", "gift", "default"] as const;
export type Transaction = (typeof TransactionTypes)[number];

export interface EntryDetails {
    coin: CoinPurseState;
    title: string;
    transaction: Transaction;
    items: ItemState[];
}

export interface EntryState {
    isDefault: boolean;
    editor: boolean;
    expanded: boolean;
}

export interface EntryComposition {
    id: string;
    dnd: { type: DnDItemType; enabled: boolean };
    detail: EntryDetails;
    state: EntryState;
}
