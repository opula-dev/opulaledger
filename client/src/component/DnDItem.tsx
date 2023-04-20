import type { Identifier, XYCoord } from "dnd-core";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Card } from "@mui/material";

const style = {
  marginBottom: ".5rem",
  backgroundColor: "black",
};

export type DnDItemType = "generic" | "ledger";

export interface properties {
  id: any;
  index: number;
  type: DnDItemType;
  enabled: boolean;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  children?: ReactNode;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DnDItem = (properties: properties) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: properties.type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = properties.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      properties.moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: properties.type,
    item: () => {
      return { id: properties.id, index: properties.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;
  const cursor = properties.enabled ? "grab" : "default";

  drag(drop(ref));
  return (
    <Card
      ref={properties.enabled ? ref : null}
      style={{ ...style, cursor, opacity }}
      data-handler-id={handlerId}
    >
      {properties.children}
    </Card>
  );
};
