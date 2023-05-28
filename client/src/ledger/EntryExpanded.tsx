import { Cancel, Delete, Save } from "@mui/icons-material";
import { CardContent, IconButton } from "@mui/material";
import { useContext } from "react";
import { CoinPurseContext, MergeCoinState } from "../context/CoinPurseContext";
import { CoinIncrement } from "./CoinIncrement";
import { ItemTracker } from "./ItemTracker";
import { EntryComposition, EntryDetails, EntryState } from "./LedgerTypes";

interface properties {
    index: number;
    state: EntryState;
    detail: EntryDetails;
    tempDetail: EntryDetails;
    updateEntry: (index: number, updater: (a: EntryComposition) => EntryComposition | null) => void;
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
            MergeCoinState({ ...detail.coin, sign: detail.coin.sign === "+" ? "-" : "+" }, { ...prevCoin })
        );
        updateEntry(index, () => null);
    };

    const renderOption = (color: string, event: () => void, icon: JSX.Element) => {
        return (
            <IconButton sx={{ scale: "1.2", ml: 4 }} color={color === "error" ? "error" : "silver"} onClick={event}>
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
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "end",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                        pointerEvents: state.editor ? "auto" : "none",
                        opacity: state.editor ? 1 : 0,
                        transitionProperty: "opacity",
                        transitionDuration: ".5s",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <CoinIncrement detail={tempDetail} setDetail={setTempDetail} />
                    <ItemTracker detail={tempDetail} setDetail={setTempDetail} />
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginLeft: "auto" }}>
                    {optionButtons.map((p) => renderOption(p.color, p.event, p.icon))}
                </div>
            </div>
        </CardContent>
    );
};
