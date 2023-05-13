import { Autocomplete } from "@mui/material";
import { EntryDetails } from "./LedgerTypes";

interface properties {
  detail: EntryDetails;
  setDetail: (a: EntryDetails) => void;
}

export const ItemTracker = ({ detail, setDetail }: properties) => {
  return <div style={{ display: "flex", flexWrap: "wrap" }}>
    
  </div>;
};
