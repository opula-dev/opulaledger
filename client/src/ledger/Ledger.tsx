import { Add } from "@mui/icons-material";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import { IconButton, Stack } from "@mui/material";
import update from "immutability-helper";
import { useCallback, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { DnDContainer } from "../component/DnDContainer";
import { DnDItem } from "../component/DnDItem";
import { AppMenuContext } from "../context/AppMenuContext";
import { DefaultCoinPurseState } from "../context/CoinPurseContext";
import { sessionLedgerEntries, setSessionLedgerEntries } from "../utility/sessionStorage";
import { FormatEntries, menuOptionToFormat } from "./FormatEntries";
import { LedgerEntry } from "./LedgerEntry";
import { EntryComposition } from "./LedgerTypes";

const createItem = (title?: string) =>
    ({
        id: uuid(),
        dnd: { type: "ledger", enabled: false },
        detail: {
            coin: DefaultCoinPurseState,
            title: title ?? "",
            transaction: "sale",
            items: [],
        },
        state: { isDefault: true, editor: true, expanded: true },
    } as EntryComposition);

const getInitialEntries = () => {
    let result: EntryComposition[];
    try {
        const localEntries = sessionLedgerEntries() ?? JSON.stringify([createItem("Starting Total")]);

        result = JSON.parse(localEntries) as EntryComposition[];
    } catch {
        result = [createItem("Starting Total")];
    }
    return result;
};

const Ledger = () => {
    const [entries, setEntries] = useState<EntryComposition[]>(getInitialEntries());
    const { menuState } = useContext(AppMenuContext);

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

    const updateEntry = (index: number, updater: (a: EntryComposition) => EntryComposition | null) => {
        setEntries((prevEntries: EntryComposition[]) => {
            const newEntries = [...prevEntries];
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
                <DnDItem key={item.id} index={index} id={item.id} dndState={item.dnd} moveItem={moveItem}>
                    <LedgerEntry index={index} state={item.state} detail={item.detail} updateEntry={updateEntry} />
                </DnDItem>
            );
        },
        [moveItem]
    );

    useEffect(() => {
        setSessionLedgerEntries(JSON.stringify(entries));
    }, [entries]);

    return (
        <div
            style={{
                margin: "auto",
                width: "80%",
                padding: ".5rem .5rem .1rem",
                background: "#2f2f2f",
                borderRadius: ".7rem",
            }}
        >
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "row", marginRight: "auto" }}>
                    <IconButton
                        color="success"
                        aria-label="new entry"
                        onClick={handleAddEntry}
                        sx={{
                            width: "fit-content",
                            height: "fit-content",
                            padding: "1rem",
                            scale: "1.25",
                        }}
                    >
                        <Add />
                    </IconButton>
                </div>
                <div>
                    <IconButton
                        aria-label="add entries to clipboard"
                        onClick={() =>
                            navigator.clipboard.writeText(FormatEntries(entries, menuOptionToFormat(menuState)))
                        }
                        sx={{
                            width: "fit-content",
                            height: "fit-content",
                            padding: "1rem",
                            scale: "1.25",
                        }}
                    >
                        <ContentPasteGoIcon />
                    </IconButton>
                </div>
            </div>
            <DnDContainer>
                <Stack direction="column-reverse">{entries.map((x, i) => renderItem(x, i))}</Stack>
            </DnDContainer>
        </div>
    );
};

export default Ledger;
