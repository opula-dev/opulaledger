import { Add, Remove } from "@mui/icons-material";
import { Autocomplete, Button, ButtonGroup, IconButton, TextField } from "@mui/material";
import update from "immutability-helper";
import { useContext } from "react";
import { ItemCollectionContext, ItemState, createItem } from "../context/ItemCollectionContext";
import { EntryDetails } from "./LedgerTypes";

interface properties {
    detail: EntryDetails;
    setDetail: (a: EntryDetails) => void;
}

export const ItemTracker = ({ detail, setDetail }: properties) => {
    const { itemOptions } = useContext(ItemCollectionContext);

    const removeEntryItem = (id: string) => {
        const index = detail.items.findIndex((i) => i.id === id);
        if (index === -1) return;
        setDetail(
            update(detail, {
                items: {
                    $splice: [[index, 1]],
                },
            })
        );
    };

    const handleAddItem = () => {
        const item = createItem("", 1);
        if (detail.items[0]?.name === "" ?? true) return;
        setDetail(update(detail, { items: { $push: [item] } }));
    };

    const handleItemUpdate = (item: ItemState) => {
        const index = detail.items.findIndex((i) => i.id === item.id);
        if (index === -1) return;
        setDetail(
            update(detail, {
                items: {
                    $splice: [
                        [index, 1],
                        [index, 0, item],
                    ],
                },
            })
        );
    };

    const handleNameChange = (item: ItemState, name: string) => {
        handleItemUpdate({ id: item.id, name, amount: item.amount });
    };

    const renderItemEditor = (item: ItemState) => {
        return (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    padding: "4px",
                    marginBottom: "4px",
                    alignItems: "center",
                }}
            >
                <div style={{ width: "200px" }}>
                    <Autocomplete
                        freeSolo
                        options={itemOptions}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => handleNameChange(item, e.target.value)}
                                variant="standard"
                            />
                        )}
                    />
                </div>
                <div>
                    <ButtonGroup size="small" color="silver" variant="outlined" sx={{ ml: "20px" }}>
                        <Button>-</Button>
                        <Button>{item.amount}</Button>
                        <Button>+</Button>
                    </ButtonGroup>
                </div>
                <div style={{ marginLeft: "20px" }}>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => removeEntryItem(item.id)}
                        sx={{ background: "#332828" }}
                    >
                        <Remove />
                    </IconButton>
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                marginLeft: "20px",
                marginRight: "auto",
                padding: "0 10px",
                alignItems: "flex-start",
            }}
        >
            {detail.items.map((i) => renderItemEditor(i))}
            <div>
                <IconButton color="success" onClick={handleAddItem} style={{ background: "#283329" }}>
                    <Add />
                </IconButton>
            </div>
        </div>
    );
};
