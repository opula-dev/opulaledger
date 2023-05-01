import { DnDItemType } from "../component/DnDItem";
import { CoinPurseState } from "../context/CoinPurseContext";

export const TransactionTypes = [
  "purchase",
  "sale",
  "trade",
  "gift",
  "default",
] as const;
export type Transaction = (typeof TransactionTypes)[number];

export interface EntryDetails {
  coin: CoinPurseState;
  expanded: boolean;
  title: string;
  transaction: Transaction;
}

export interface EntryState {
  isDefault: boolean;
  editor: boolean;
}

export interface EntryComposition {
  id: string;
  dnd: { type: DnDItemType; enabled: boolean };
  detail: EntryDetails;
  state: EntryState;
}
