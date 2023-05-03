import { useContext } from "react";
import {
  Cancel,
  Circle,
  Delete,
  Edit,
  Save,
  ViewInAr,
} from "@mui/icons-material";
import { Button, CardContent, IconButton, Stack } from "@mui/material";
import { EntryComposition, EntryDetails, EntryState } from "./LedgerTypes";
import { CoinIncrement } from "./CoinIncrement";
import {
  CoinPurseContext,
  CoinPurseState,
  CoinPurseStorage,
  MergeCoinState,
} from "../context/CoinPurseContext";

interface properties {
  index: number;
  state: EntryState;
  detail: EntryDetails;
  tempDetail: EntryDetails;
  updateEntry: (
    index: number,
    updater: (a: EntryComposition) => EntryComposition | null
  ) => void;
  setTempDetail: (a: EntryDetails) => void;
}

export const EntryExpanded = ({
  index,
  state,
  detail,
  tempDetail,
  updateEntry,
  setTempDetail,
}: properties) => {
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

  const handleEditClick = () => {
    updateEntry(index, (e: EntryComposition) => {
      e.dnd.enabled = !e.dnd.enabled;
      e.state.editor = !e.state.editor;
      return e;
    });
  };

  const handleSaveClick = () => {
    handleNetCoinChange({ ...detail.coin }, { ...tempDetail.coin });
    updateEntry(index, (e: EntryComposition) => {
      e.detail = { ...tempDetail };
      e.dnd.enabled = !e.dnd.enabled;
      e.state.editor = !e.state.editor;
      e.state.isDefault = false;
      return e;
    });
  };

  const handleCancelClick = () => {
    setTempDetail(detail);
    updateEntry(index, (e: EntryComposition) => {
      e.state.editor = !e.state.editor;
      return e;
    });
  };

  const handleDeleteClick = () => {
    setCoin((prevCoin) => MergeCoinState({...detail.coin, sign: detail.coin.sign === "+" ? "-" : "+"}, {...prevCoin}))
    updateEntry(index, (e) => null);
  };

  return (
    <CardContent>
      <Stack
        style={{ padding: "0rem 1rem .4rem 0rem", alignItems: "end" }}
        direction="row-reverse"
      >
        <div
          style={{ display: "flex", flexDirection: "row", alignItems: "end" }}
        >
          <IconButton
            sx={{ mr: 5, scale: "1.2" }}
            color="error"
            aria-label="delete"
            onClick={state.editor ? handleCancelClick : handleDeleteClick}
          >
            {state.editor ? <Cancel /> : <Delete />}
          </IconButton>
          <IconButton
            sx={{ scale: "1.2" }}
            aria-label="edit"
            onClick={state.editor ? handleSaveClick : handleEditClick}
          >
            {state.editor ? <Save /> : <Edit />}
          </IconButton>
        </div>
        <div style={{ margin: "0 auto 0 2rem" }}>
          {state.editor ? (
            <CoinIncrement
              tempDetail={tempDetail}
              setTempDetail={setTempDetail}
            />
          ) : null}
        </div>
        {state.editor ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <Button
              color="gold"
              sx={{ mb: "4px", height: "2rem", borderRadius: "2rem" }}
            >
              <Circle />
            </Button>
            <Button
              color="silver"
              sx={{ height: "2rem", borderRadius: "2rem" }}
            >
              <ViewInAr />
            </Button>
          </div>
        ) : null}
      </Stack>
    </CardContent>
  );
};
