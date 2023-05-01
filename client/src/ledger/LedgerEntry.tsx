import { useState } from "react";
import { Card, CardContent, Collapse } from "@mui/material";
import { EntryHeader } from "./EntryHeader";
import { EntryExpanded } from "./EntryExpanded";
import { EntryComposition, EntryDetails, EntryState } from "./LedgerTypes";

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

  const componentProperties = {
    index,
    state,
    detail,
    tempDetail,
    updateEntry,
    setTempDetail,
  };

  return (
    <Card>
      <EntryHeader {...componentProperties} />
      <CardContent></CardContent>
      <Collapse in={detail.expanded} timeout="auto" unmountOnExit>
        <EntryExpanded {...componentProperties} />
      </Collapse>
    </Card>
  );
};
