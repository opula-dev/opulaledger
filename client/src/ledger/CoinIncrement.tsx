import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EntryDetails } from "./LedgerTypes";
import {
  DefaultCoinPurseState,
  MergeCoinState,
} from "../context/CoinPurseContext";

interface properties {
  tempDetail: EntryDetails;
  setTempDetail: (a: EntryDetails) => void;
}

export const CoinIncrement = ({ tempDetail, setTempDetail }: properties) => {
  const handleCoinChange = (increment: string) => {
    const sign = increment[0] as "+" | "-";
    const amount = parseInt(increment.slice(1, increment.length - 1));
    const coinType = increment[increment.length - 1];

    const currentCoin = { ...tempDetail.coin };

    let coinChange = DefaultCoinPurseState;
    coinChange.sign = sign;
    if (coinType === "g") {
      coinChange.gold = amount;
    }
    if (coinType === "s") {
      coinChange.silver = amount;
    }
    if (coinType === "c") {
      coinChange.copper = amount;
    }

    setTempDetail({
      ...tempDetail,
      coin: MergeCoinState(coinChange, currentCoin),
    });
  };

  const renderIncrement = (increment: string) => {
    const type = increment[increment.length - 1];
    const amount = parseInt(increment.slice(0, increment.length - 1));
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
          onClick={(e) => handleCoinChange(`+${increment}`)}
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
            {increment.slice(0, increment.length - 1)}
          </Typography>
        </div>
        <Button
          onClick={(e) => handleCoinChange(`-${increment}`)}
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
    <Stack direction="row">
      {renderIncrement("1c")}
      {renderIncrement("5c")}
      {renderIncrement("10c")}
      {renderIncrement("25c")}
      {renderIncrement("1s")}
      {renderIncrement("5s")}
      {renderIncrement("10s")}
      {renderIncrement("1g")}
    </Stack>
  );
};
