import { createContext, useState } from "react";

export interface CoinPurseState {
  sign: "+" | "-";
  gold: number;
  silver: number;
  copper: number;
}

export const DefaultCoinPurseState: CoinPurseState = {
  sign: "+",
  gold: 0,
  silver: 0,
  copper: 0,
};

export const CoinPurseContext = createContext<{
  coin: CoinPurseState;
  setCoin: React.Dispatch<React.SetStateAction<CoinPurseState>>;
}>({ coin: DefaultCoinPurseState, setCoin: (x) => {} });

export const MergeCoinState: (
  s: CoinPurseState,
  d: CoinPurseState
) => CoinPurseState = (source: CoinPurseState, destination: CoinPurseState) => {
  const coinTotal = (c: CoinPurseState) =>
    (c.copper + c.silver * 100 + c.gold * 10 ** 4) * (c.sign === "+" ? 1 : -1);
  const sourceTotal = coinTotal(source);
  const destinationTotal = coinTotal(destination);

  let finalTotal = destinationTotal + sourceTotal;
  const finalSign = finalTotal < 0 ? "-" : "+";
  finalTotal = finalTotal * (finalTotal < 0 ? -1 : 1);
  const finalGold = Math.floor(finalTotal / 10 ** 4);
  finalTotal = finalTotal - (finalGold * 10 ** 4)
  const finalSilver = Math.floor(finalTotal / 100);
  const finalCopper = finalTotal % 100;

  return {
    sign: finalSign,
    gold: finalGold,
    silver: finalSilver,
    copper: finalCopper,
  };
};

interface properties {
  children?: JSX.Element[] | JSX.Element;
}

export const CoinObserver = ({ children }: properties) => {
  const [coin, setCoin] = useState<CoinPurseState>(DefaultCoinPurseState);

  return (
    <CoinPurseContext.Provider value={{ coin, setCoin }}>
      {children}
    </CoinPurseContext.Provider>
  );
};
