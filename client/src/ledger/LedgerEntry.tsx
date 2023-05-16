import { useContext, useState } from "react";
import { Card, CardContent, Collapse } from "@mui/material";
import { EntryHeader } from "./EntryHeader";
import { EntryExpanded } from "./EntryExpanded";
import { EntryComposition, EntryDetails, EntryState } from "./LedgerTypes";
import { CoinPurseContext, CoinPurseState, CoinPurseStorage, MergeCoinState } from "../context/CoinPurseContext";

type properties = {
  index: number;
  state: EntryState;
  detail: EntryDetails;
  updateEntry: (
    index: number,
    updater: (a: EntryComposition) => EntryComposition | null
  ) => void;
};

export const LedgerEntry = ({
  index,
  state,
  detail,
  updateEntry,
}: properties) => {
  const [tempDetail, setTempDetail] = useState({ ...detail });

  const { setCoin } = useContext(CoinPurseContext);

  const handleNetCoinChange = (
    before: CoinPurseState,
    after: CoinPurseState
  ) => {
    setCoin((prevCoin) => {
      const subtracted = MergeCoinState(
        { ...before, sign: before.sign === "+" ? "-" : "+" },
        { ...prevCoin }
      );
      const result = MergeCoinState({ ...after }, { ...subtracted });
      window.sessionStorage.setItem(CoinPurseStorage, JSON.stringify(result));
      return result;
    });
  };
  
  const handleSave = () => {
    handleNetCoinChange({ ...detail.coin }, { ...tempDetail.coin });
    updateEntry(index, (e: EntryComposition) => {
      e.detail = { ...tempDetail };
      e.dnd.enabled = true;
      e.state.editor = false;
      e.state.isDefault = false;
      e.state.expanded = false;
      return e;
    });
  };

  const componentProperties = {
    index,
    state,
    detail,
    tempDetail,
    updateEntry,
    handleSave,
    setTempDetail,
  };

  return (
    <Card>
      <EntryHeader {...componentProperties} />
      <CardContent></CardContent>
      <Collapse in={state.expanded} timeout="auto" unmountOnExit>
        <EntryExpanded {...componentProperties} />
      </Collapse>
    </Card>
  );
};
