import { useCallback, useState } from "react";
import { IconButton } from "@mui/material";
import { DnDContainer } from "../component/DnDContainer";
import { Add } from "@mui/icons-material";
import update from "immutability-helper";
import { DnDItem, DnDItemType } from "../component/DnDItem";
import { LedgerEntry } from "./LedgerEntry";

interface EntryComposition {
  key: string;
  type: DnDItemType;
  enabled: boolean;
}

const createItem = (key: string, type: DnDItemType) => ({
  key: key,
  type: type,
  enabled: true,
});

const Ledger = () => {
  const [entries, setEntries] = useState<EntryComposition[]>(
    [0, 1, 2, 3, 4, 5].map((a) => createItem(`item-${a}`, "ledger"))
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

  const handleDnDToggle = useCallback((index: number) => {
    setEntries((prevEntries: EntryComposition[]) => 
    {
      let newEntries = [...prevEntries]
      newEntries[index].enabled = !newEntries[index].enabled;
      return [...newEntries]
    }
    );
  }, []);

  const renderItem = useCallback(
    (item: EntryComposition, index: number) => {
      return (
        <DnDItem
          key={item.key}
          index={index}
          id={item.key}
          type={"ledger"}
          dragEnabled={item.enabled}
          moveItem={moveItem}
        >
          <LedgerEntry index={index} handleToggleDnd={handleDnDToggle} />
        </DnDItem>
      );
    },
    [moveItem]
  );

  return (
    <div style={{ margin: "auto", width: "80%" }}>
      <DnDContainer>
        <IconButton
          color="success"
          aria-label="new entry"
          sx={{ padding: "1rem" }}
        >
          <Add />
        </IconButton>
        {entries.map((x, i) => renderItem(x, i))}
      </DnDContainer>
    </div>
  );
};

export default Ledger;
