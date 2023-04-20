import { Circle } from "@mui/icons-material";
import { Typography } from "@mui/material";

const inline = {
  display: "inline",
  mr: 1,
};

type properties = {
  coinPurse: { gold: number; silver: number; copper: number };
  textColor: string;
  notEditable?: boolean;
};

export const CoinCounter = ({ coinPurse, textColor, notEditable }: properties) => {
  const typeStyle = { color: textColor, ...inline };

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
