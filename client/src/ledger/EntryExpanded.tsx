import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { CardContent, IconButton, Stack } from "@mui/material";
import { Entry, EntryProperties } from "./LedgerEntry";

interface EntryExpandedProperties extends EntryProperties {
  toggleDnd: () => void;
  tempEntry: Entry;
  setTempEntry: (a: Entry) => void;
}

export const EntryExpanded = (properties: EntryExpandedProperties) => {
  const handleEditSaveClick = () => {
    if (properties.editor === true) {
      properties.setEntry({ ...properties.tempEntry });
    }
    properties.toggleDnd();
    properties.setEditor(!properties.editor);
  };

  const handleCancelDeleteClick = () => {
    if (properties.editor === true) {
      properties.setTempEntry(properties.entry)
      properties.setEditor(!properties.editor);
    }
    else {
      // Delete
    }
  }

  return (
    <CardContent>
      <Stack
        style={{ padding: "0rem 1rem .4rem 0rem" }}
        direction="row-reverse"
      >
        <IconButton aria-label="edit" onClick={handleEditSaveClick}>
          {properties.editor ? <Save /> : <Edit />}
        </IconButton>
        <IconButton sx={{ mr: 5 }} aria-label="delete" onClick={handleCancelDeleteClick}>
          {properties.editor ? (
            <Cancel color="error" />
          ) : (
            <Delete color="error" />
          )}
        </IconButton>
        
      </Stack>
    </CardContent>
  );
};
