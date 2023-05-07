import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EntryDetails } from "./LedgerTypes";
import { CoinPurseState, MergeCoinState } from "../context/CoinPurseContext";

interface properties {
  detail: EntryDetails;
  setDetail: (a: EntryDetails) => void;
}

export const CoinIncrement = ({ detail, setDetail }: properties) => {
  const handleCoinChange = (
    increment: number,
    sign: "+" | "-",
    type: "g" | "s" | "c"
  ) => {
    const currentCoin = { ...detail.coin };

    let coinChange: CoinPurseState = {
      sign: "+",
      gold: 0,
      silver: 0,
      copper: 0,
    };
    coinChange.sign = sign;
    if (type === "g") {
      coinChange.gold = increment;
    }
    if (type === "s") {
      coinChange.silver = increment;
    }
    if (type === "c") {
      coinChange.copper = increment;
    }

    setDetail({
      ...detail,
      coin: MergeCoinState(coinChange, currentCoin),
    });
  };

  const renderIncrement = (increment: string, type: "g" | "s" | "c") => {
    const amount = parseInt(increment);
    const isDouble = amount > 9;
    const color =
      type === "c"
        ? "copper"
        : type === "s"
        ? "silver"
        : type === "g"
        ? "gold"
        : "primary";
    return (
      <Stack direction="column">
        <Button
          onClick={() => handleCoinChange(amount, "+", type)}
          sx={{
            scale: "1.2",
            margin: "0 2px 1px 0",
            padding: 0,
            height: "2rem",
            borderRadius: "1rem",
            minWidth: "48px",
          }}
          color={color}
        >
          <KeyboardArrowUpIcon />
        </Button>
        <div
          style={{
            scale: "1.2",
            position: "relative",
            left: isDouble ? 20 : 25,
            bottom: 16,
            margin: "3px 0",
            height: "0",
          }}
        >
          <Typography style={{ color: color === "copper" ? "#cc6633" : color }}>
            {increment}
          </Typography>
        </div>
        <Button
          onClick={() => handleCoinChange(amount, "-", type)}
          sx={{
            scale: "1.2",
            margin: "0 2px",
            padding: 0,
            height: "2rem",
            borderRadius: "1rem",
            minWidth: "48px",
          }}
          color={color}
        >
          <ExpandMoreIcon />
        </Button>
      </Stack>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {renderIncrement("1", "c")}
      {renderIncrement("5", "c")}
      {renderIncrement("10", "c")}
      {renderIncrement("25", "c")}
      {renderIncrement("1", "s")}
      {renderIncrement("5", "s")}
      {renderIncrement("10", "s")}
      {renderIncrement("1", "g")}
    </div>
  );
};
