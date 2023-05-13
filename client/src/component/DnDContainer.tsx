import type { ReactNode } from "react";
import { Stack } from "@mui/material";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

type properties = {
  children?: ReactNode;
};

export const DnDContainer = ({children}: properties) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider> 
  );
};
