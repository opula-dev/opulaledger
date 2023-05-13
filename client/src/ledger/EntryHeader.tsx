import {
  CardHeader,
  IconButton,
  IconButtonProps,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Receipt, Redeem, SwapHoriz } from "@mui/icons-material";
import PaidIcon from "@mui/icons-material/Paid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CoinCounter } from "../component/CoinCounter";
import {
  EntryComposition,
  EntryDetails,
  EntryState,
  Transaction,
} from "./LedgerTypes";

export const TransactionToIcon: Record<Transaction, JSX.Element> = {
  purchase: <Receipt />,
  sale: <PaidIcon />,
  trade: <SwapHoriz />,
  gift: <Redeem />,
  default: <div style={{ width: 24, height: 24, border: "solid white 1px" }} />,
};

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

interface properties {
  index: number;
  state: EntryState;
  detail: EntryDetails;
  tempDetail: EntryDetails;
  updateEntry: (
    index: number,
    updater: (a: EntryComposition) => EntryComposition | null
  ) => void;
  setTempDetail: (a: EntryDetails) => void;
}

export const EntryHeader = ({
  index,
  state,
  detail,
  tempDetail,
  updateEntry,
  setTempDetail,
}: properties) => {
  const storeEntry = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    store: (e: EntryDetails, v: string) => EntryDetails
  ) => {
    setTempDetail(store({ ...tempDetail }, event.target.value));
  };

  const toggleExpanded = () => {
    updateEntry(index, (e) => {
      e.detail.expanded = !e.detail.expanded;
      return e;
    });
  };

  return (
    <CardHeader
      avatar={
        <IconButton sx={{ padding: 0 }} onClick={(e) => {}}>
          {TransactionToIcon[detail.transaction]}
        </IconButton>
      }
      action={
        state.editor ? (
          <div style={{ padding: "20px" }} /> // Fill expander dimensions
        ) : (
          <ExpandRotator
            expand={detail.expanded}
            onClick={toggleExpanded}
            aria-expanded={detail.expanded}
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
            {state.editor ? (
              <div style={{ height: detail.expanded ? "52px" : "24px" }}>
                <TextField
                  variant="standard"
                  id="title"
                  multiline
                  minRows={1}
                  maxRows={2}
                  defaultValue={detail.title}
                  sx={{ width: "100%" }}
                  onChange={(event) =>
                    storeEntry(event, (entry, value) => {
                      entry.title = value;
                      return entry;
                    })
                  }
                />
              </div>
            ) : (
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: detail.expanded ? "2" : "1",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transitionProperty: "height",
                  transitionDuration: ".5s",
                  height: detail.expanded ? "52px" : "24px",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                {detail.title}
              </Typography>
            )}
          </div>
          <div style={{ display: "inline", margin: "auto"}}>
            <CoinCounter
              hideExtraAmounts={!state.editor}
              coinPurse={state.editor ? tempDetail.coin : detail.coin }
            />
          </div>
        </div>
      }
    />
  );
};
