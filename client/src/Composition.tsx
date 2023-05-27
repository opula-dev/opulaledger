import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Business } from "./business/Business";
import Route from "./component/Route";
import { AppMenuProvider } from "./context/AppMenuContext";
import ClientContext, { DefaultClientState } from "./context/ClientContext";
import { CoinObserver } from "./context/CoinPurseContext";
import Craft from "./craft/Craft";
import ApplicationBar from "./layout/ApplicationBar";
import { Footer } from "./layout/Footer";
import Ledger from "./ledger/Ledger";

const Composition = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [client, setClient] = useState(DefaultClientState);

    return (
        <ClientContext.Provider value={client}>
            <AppMenuProvider>
                <CoinObserver>
                    <div
                        style={{
                            position: "static",
                            height: "100%",
                        }}
                    >
                        <Stack direction="column" style={{ height: "100%" }}>
                            <ApplicationBar />
                            <Paper sx={{ padding: "2% 2% 3rem" }}>
                                <Route path="/">
                                    <Ledger />
                                </Route>
                                <Route path="/craft">
                                    <Craft />
                                </Route>
                                <Route path="/business">
                                    <Business />
                                </Route>
                            </Paper>
                            <div style={{ margin: "auto" }} />
                            <Footer />
                        </Stack>
                    </div>
                </CoinObserver>
            </AppMenuProvider>
        </ClientContext.Provider>
    );
};

export default Composition;
