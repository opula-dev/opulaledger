import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

type properties = {
  children?: ReactNode;
};

const style = {
  padding: ".5rem .5rem .1rem",
  background: "#2f2f2f",
  borderRadius: ".7rem",
};

export const DnDContainer = ({children}: properties) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box style={style}>{children}</Box>
    </DndProvider> 
  );
};
