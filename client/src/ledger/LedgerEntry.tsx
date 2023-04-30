import { useCallback, useState } from "react";
import { Receipt, Redeem, SwapHoriz } from "@mui/icons-material";
import PaidIcon from "@mui/icons-material/Paid";
import { CoinPurseState, DefaultCoinPurseState } from "../context/CoinPurseContext";
import { Card, CardContent, Collapse } from "@mui/material";
import { EntryHeader } from "./EntryHeader";
import { EntryExpanded } from "./EntryExpanded";

type EntryTextIds = "title";

type EntryText = Record<EntryTextIds, string>;

export type Entry = {
  text: EntryText;
  transaction: Transaction;
};

export type EntryProperties = {
  editor: boolean;
  setEditor: (a: boolean) => void;
  expanded: boolean;
  setExpanded: (a: boolean) => void;
  handleExpanded: () => void;
  entry: Entry;
  setEntry: (a: Entry) => void;
  coin: CoinPurseState;
  setCoin: (a: CoinPurseState) => void;
};

export type Transaction = "purchase" | "sale" | "trade" | "gift" | "default";
export const TransactionTypes = ["purchase", "sale", "trade", "gift", "default"]

export const TransactionToIcon: Record<Transaction, JSX.Element> = {
  purchase: <Receipt />,
  sale: <PaidIcon />,
  trade: <SwapHoriz />,
  gift: <Redeem />,
  default: <div style={{width: 24, height: 24, border:"solid white 1px"}}/>,
};

type properties = {
  index: number;
  handleToggleDnd: (a: number) => void;
};

export const LedgerEntry = ({index, handleToggleDnd}: properties) => {
  const [expanded, setExpanded] = useState(false);
  const [editor, setEditor] = useState(false);
  const [coin, setCoin] = useState(DefaultCoinPurseState);
  const [entry, setEntry] = useState<Entry>({
    text: { title: "Test" },
    transaction: "default",
  });
  const [tempEntry,setTempEntry] = useState({...entry})

  const handleExpanded = () => {
    if (!editor) {
      setExpanded(!expanded);
    }
  };

  const toggleDnd = useCallback(() => {
    handleToggleDnd(index);
  }, [index, handleToggleDnd])

  const entryPayload = {
    expanded,
    setExpanded,
    handleExpanded,
    editor,
    setEditor,
    entry,
    setEntry,
    coin,
    setCoin,
  };

  return (
    <Card>
      <EntryHeader {...{tempEntry, setTempEntry, ...entryPayload}} />
      <CardContent></CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <EntryExpanded {...{toggleDnd, tempEntry, setTempEntry, ...entryPayload}}/>
      </Collapse>
    </Card>
  );
};
