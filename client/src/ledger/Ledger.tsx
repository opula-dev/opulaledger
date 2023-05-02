import { useCallback, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { DnDContainer } from "../component/DnDContainer";
import { Add } from "@mui/icons-material";
import update from "immutability-helper";
import { DnDItem } from "../component/DnDItem";
import { LedgerEntry } from "./LedgerEntry";
import { v4 as uuid } from "uuid";
import { DefaultCoinPurseState } from "../context/CoinPurseContext";
import { EntryComposition } from "./LedgerTypes";

const createItem = (title?: string) =>
  ({
    id: uuid(),
    dnd: { type: "ledger", enabled: false },
    detail: {
      coin: DefaultCoinPurseState,
      expanded: true,
      title: title ?? "",
      transaction: "sale",
    },
    state: { isDefault: true, editor: true },
  } as EntryComposition);

const ledgerEntriesLocalStorage = "opula-ledger-entries";

const getInitialEntries = () => {
  let result: EntryComposition[];
  try {
    const localEntries =
      window.sessionStorage.getItem(ledgerEntriesLocalStorage) ??
      JSON.stringify([createItem("Starting Total")]);
    result = JSON.parse(localEntries) as EntryComposition[];
  } catch {
    result = [createItem("Starting Total")];
  }
  return result;
};

const Ledger = () => {
  const [entries, setEntries] = useState<EntryComposition[]>(
    getInitialEntries()
  );

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setEntries((prevEntries: EntryComposition[]) =>
      update(prevEntries, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevEntries[dragIndex] as EntryComposition],
        ],
      })
    );
  }, []);

  const updateEntry = (
    index: number,
    updater: (a: EntryComposition) => EntryComposition | null
  ) => {
    setEntries((prevEntries: EntryComposition[]) => {
      let newEntries = [...prevEntries];
      const newEntry = updater(newEntries[index]);
      if (newEntry === null) {
        newEntries.splice(index, 1);
      } else {
        newEntries[index] = newEntry;
      }
      return [...newEntries];
    });
  };

  const handleAddEntry = () => {
    setEntries((prevEntries: EntryComposition[]) => {
      if (prevEntries.findIndex((e) => e.state.isDefault) !== -1) {
        return prevEntries;
      }
      return update(prevEntries, {
        $push: [createItem()],
      });
    });
  };

  const renderItem = useCallback(
    (item: EntryComposition, index: number) => {
      return (
        <DnDItem
          key={item.id}
          index={index}
          id={item.id}
          dndState={item.dnd}
          moveItem={moveItem}
        >
          <LedgerEntry
            index={index}
            state={item.state}
            detail={item.detail}
            updateEntry={updateEntry}
          />
        </DnDItem>
      );
    },
    [moveItem]
  );

  useEffect(() => {
    window.sessionStorage.setItem(
      ledgerEntriesLocalStorage,
      JSON.stringify(entries)
    );
  }, [entries]);

  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <DnDContainer>
        {entries.map((x, i) => renderItem(x, i))}
        <IconButton
          color="success"
          aria-label="new entry"
          onClick={handleAddEntry}
          sx={{ width: "fit-content", height: "fit-content", padding: "1rem" }}
        >
          <Add />
        </IconButton>
      </DnDContainer>
    </div>
  );
};

export default Ledger;
