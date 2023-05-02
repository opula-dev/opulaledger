import { Circle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { CoinPurseState } from "../context/CoinPurseContext";

const inline = {
  display: "inline",
  mr: 1,
};

type properties = {
  coinPurse: CoinPurseState;
  notEditable?: boolean;
};

export const CoinCounter = ({ coinPurse, notEditable }: properties) => {
  const typeStyle = { color: coinPurse.sign === "+" ? "white" : "red", ...inline };

  return (
    <div style={{display: "flex", width:"fit-content"}}>
      <Circle color="gold" sx={inline} />
      <Typography sx={typeStyle}>{coinPurse.gold}</Typography>
      <Circle color="silver" sx={inline} />
      <Typography sx={typeStyle}>{coinPurse.silver}</Typography>
      <Circle color="copper" sx={inline} />
      <Typography sx={typeStyle}>{coinPurse.copper}</Typography>
    </div>
  );
};
