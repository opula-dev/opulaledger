import React from "react";

export interface CoinPurseState {
  gold: number;
  silver: number;
  copper: number;
}

export const DefaultCoinPurseState: CoinPurseState = {
  gold: 0,
  silver: 0,
  copper: 0,
};

const CoinPurseContext = React.createContext<CoinPurseState>(
  DefaultCoinPurseState
);

export default CoinPurseContext;
