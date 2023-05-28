import { DefaultCoinPurseState } from "../context/CoinPurseContext";

/**
 * Session Keys
 */
const ledgerCoinpurseKey = "opula-ledger-coinpurse";
const ledgerEntriesKey = "opula-ledger-entries";

/**
 * Ledger Coinpurse
 */
export const sessionCoinpurse = () =>
    window.sessionStorage.getItem(ledgerCoinpurseKey) ?? JSON.stringify(DefaultCoinPurseState);

export const setSessionCoinpurse = (coinpurse: string) => window.sessionStorage.setItem(ledgerCoinpurseKey, coinpurse);

/**
 * Ledger Entries
 */
export const sessionLedgerEntries = () => window.sessionStorage.getItem(ledgerEntriesKey);

export const setSessionLedgerEntries = (entries: string) => window.sessionStorage.setItem(ledgerEntriesKey, entries);
