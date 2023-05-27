import { CoinCounter } from "../component/CoinCounter";
import { CoinPurseContext } from "../context/CoinPurseContext";

export const CoinPurse = () => {
    return (
        <CoinPurseContext.Consumer>
            {({ coin }) => <CoinCounter coinPurse={coin} hideExtraAmounts={false} />}
        </CoinPurseContext.Consumer>
    );
};
