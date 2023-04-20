import { CoinCounter } from "../component/CoinCounter";
import CoinPurseContext from "../context/CoinPurseContext";

const CoinPurse = () => {
  return (
    <CoinPurseContext.Consumer>
      {(coinPurse) => <CoinCounter coinPurse={coinPurse} textColor="white" notEditable/>}
    </CoinPurseContext.Consumer>
  );
};

export default CoinPurse;
