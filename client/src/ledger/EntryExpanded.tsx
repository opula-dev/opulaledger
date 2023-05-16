import { useContext, useState } from "react";
import { Cancel, Circle, Delete, Save, ViewInAr } from "@mui/icons-material";
import { Button, CardContent, IconButton } from "@mui/material";
import { EntryComposition, EntryDetails, EntryState } from "./LedgerTypes";
import { CoinIncrement } from "./CoinIncrement";
import { CoinPurseContext, MergeCoinState } from "../context/CoinPurseContext";
import { ItemTracker } from "./ItemTracker";

interface properties {
  index: number;
  state: EntryState;
  detail: EntryDetails;
  tempDetail: EntryDetails;
  updateEntry: (
    index: number,
    updater: (a: EntryComposition) => EntryComposition | null
  ) => void;
  handleSave: () => void;
  setTempDetail: (a: EntryDetails) => void;
}

export const EntryExpanded = ({
  index,
  state,
  detail,
  tempDetail,
  updateEntry,
  handleSave,
  setTempDetail,
}: properties) => {
  const [viewItems, setViewItems] = useState(false);
  const { setCoin } = useContext(CoinPurseContext);

  const handleCancelClick = () => {
    setTempDetail(detail);
    updateEntry(index, (e: EntryComposition) => {
      e.dnd.enabled = true;
      e.state.editor = false;
      e.state.expanded = false;
      return e;
    });
  };

  const handleDeleteClick = () => {
    setCoin((prevCoin) =>
      MergeCoinState(
        { ...detail.coin, sign: detail.coin.sign === "+" ? "-" : "+" },
        { ...prevCoin }
      )
    );
    updateEntry(index, (e) => null);
  };

  const renderOption = (
    color: string,
    event: () => void,
    icon: JSX.Element
  ) => {
    return (
      <IconButton
        sx={{ scale: "1.2", ml: 4}}
        color={color === "error" ? "error" : "silver"}
        onClick={event}
      >
        {icon}
      </IconButton>
    );
  };

  const optionButtons = [
    { color: "error", event: handleDeleteClick, icon: <Delete /> },
    { color: "error", event: handleCancelClick, icon: <Cancel /> },
    { color: "primary", event: handleSave, icon: <Save /> },
  ];

  return (
    <CardContent>
      <div
        style={{
          padding: "0rem 1rem .5rem 1rem",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          {optionButtons.map((p) => renderOption(p.color, p.event, p.icon))}
        </div>
        <div style={{ margin: "auto" }} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "end",
            pointerEvents: state.editor ? "auto" : "none",
            opacity: state.editor ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: ".5s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              color="gold"
              variant={!viewItems ? "outlined" : "text"}
              onClick={() => setViewItems(false)}
              sx={{ mt: "4px", height: "2rem", borderRadius: "2rem" }}
            >
              <Circle />
            </Button>
            <Button
              color="silver"
              variant={viewItems ? "outlined" : "text"}
              onClick={() => setViewItems(true)}
              sx={{ mt: "4px", height: "2rem", borderRadius: "2rem" }}
            >
              <ViewInAr />
            </Button>
          </div>
          {viewItems ? (
            <ItemTracker detail={tempDetail} setDetail={setTempDetail} />
          ) : (
            <CoinIncrement detail={tempDetail} setDetail={setTempDetail} />
          )}
        </div>
      </div>
    </CardContent>
  );
};
