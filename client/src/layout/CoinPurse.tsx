import { CoinCounter } from "../component/CoinCounter";
import {CoinPurseContext} from "../context/CoinPurseContext";

export const CoinPurse = () => {
  return (
    <CoinPurseContext.Consumer>
      {({coin, setCoin}) => <CoinCounter coinPurse={coin} notEditable/>}
    </CoinPurseContext.Consumer>
  );
};
