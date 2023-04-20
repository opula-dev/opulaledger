import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { CardContent, IconButton, Stack } from "@mui/material";
import { Entry, EntryProperties } from "./LedgerEntry";

interface EntryExpandedProperties extends EntryProperties {
  tempEntry: Entry;
}

export const EntryExpanded = (properties: EntryExpandedProperties) => {

  const handleEditorClick = () => {
    if (properties.editor === true) {
      properties.setEntry({ ...properties.tempEntry });
    }

    properties.setEditor(!properties.editor);
  };
  
  return (
    <CardContent>
      <Stack
        style={{ padding: "0rem 1rem .4rem 0rem" }}
        direction="row-reverse"
      >
        <IconButton aria-label="edit" onClick={handleEditorClick}>
          {properties.editor ? <Save color="silver" /> : <Edit />}
        </IconButton>
        <IconButton sx={{ mr: 5 }} aria-label="delete">
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
