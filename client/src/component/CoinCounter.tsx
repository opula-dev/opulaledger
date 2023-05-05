import { Circle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { CoinPurseState } from "../context/CoinPurseContext";

const inline = {
  display: "inline",
  mr: 1,
};

type properties = {
  coinPurse: CoinPurseState;
  hideExtraAmounts?: boolean;
};

export const CoinCounter = ({
  coinPurse,
  hideExtraAmounts,
}: properties) => {
  const typeStyle = {
    color: coinPurse.sign === "+" ? "white" : "red",
    ...inline,
  };

  return (
    <div style={{ display: "flex", width: "fit-content" }}>
      {!(hideExtraAmounts ?? true) || coinPurse.gold > 0 ? (
        <>
          <Circle color="gold" sx={inline} />
          <Typography sx={typeStyle}>{coinPurse.gold}</Typography>
        </>
      ) : null}
      {!(hideExtraAmounts ?? true) || (coinPurse.silver > 0)? (
        <>
          <Circle color="silver" sx={inline} />
          <Typography sx={typeStyle}>{coinPurse.silver}</Typography>
        </>
      ) : null}
      {!(hideExtraAmounts ?? true) || coinPurse.copper > 0 ? (
        <>
          <Circle color="copper" sx={inline} />
          <Typography sx={typeStyle}>{coinPurse.copper}</Typography>
        </>
      ) : null}
    </div>
  );
};
