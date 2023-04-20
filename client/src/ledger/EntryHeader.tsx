import {
  CardHeader,
  IconButton,
  IconButtonProps,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { CoinCounter } from "../component/CoinCounter";
import {
  Entry,
  EntryProperties,
  Transaction,
  TransactionToIcon,
} from "./LedgerEntry";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExpandRotator = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface EntryHeaderProperties extends EntryProperties {
  tempEntry: Entry;
  setTempEntry: (a: Entry) => void;
}

export const EntryHeader = ({
  editor,
  setEditor,
  expanded,
  setExpanded,
  handleExpanded,
  entry,
  setEntry,
  tempEntry,
  setTempEntry,
  coin,
  setCoin,
}: EntryHeaderProperties) => {
  const storeEntry = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    store: (e: Entry, v: string) => Entry
  ) => {
    setTempEntry(store({ ...tempEntry }, event.target.value));
  };

  const toggleEntryType = (event: React.MouseEvent) => {
    ////////
  }

  return (
    <CardHeader
      avatar={
        <IconButton sx={{ padding: 0 }} onClick={editor ? toggleEntryType : (e) => {}}>
          {TransactionToIcon[entry.transaction as Transaction]}
        </IconButton>
      }
      action={
        editor ? (
          <div style={{ padding: "20px" }} /> // Fill expander dimensions
        ) : (
          <ExpandRotator
            expand={expanded}
            onClick={handleExpanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandRotator>
        )
      }
      title={
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "inline",
              width: "100%",
              margin: "auto",
              padding: "0rem 1rem",
            }}
          >
            {editor ? (
              <div style={{ height: expanded ? "52px" : "24px" }}>
                <TextField
                  variant="standard"
                  id="title"
                  multiline
                  minRows={1}
                  maxRows={2}
                  defaultValue={entry.text.title}
                  sx={{ width: "100%" }}
                  onChange={(event) =>
                    storeEntry(event, (e, v) => {
                      e.text.title = v;
                      return e;
                    })
                  }
                />
              </div>
            ) : (
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: expanded ? "2" : "1",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transitionProperty: "height",
                  transitionDuration: ".5s",
                  height: expanded ? "52px" : "24px",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                {entry.text.title}
              </Typography>
            )}
          </div>
          <div style={{ display: "inline", margin: "auto", padding: "0 1rem" }}>
            <CoinCounter
              textColor={entry.transaction === "purchase" ? "red" : "white"}
              coinPurse={coin}
            />
          </div>
        </div>
      }
    />
  );
};
