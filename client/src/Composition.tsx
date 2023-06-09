import React, { useState } from "react";
import ApplicationBar from "./layout/ApplicationBar";
import Route from "./component/Route";
import Ledger from "./ledger/Ledger";
import Craft from "./craft/Craft";
import ClientContext, { DefaultClientState } from "./context/ClientContext";
import { Paper } from "@mui/material";
import { Business } from "./business/Business";
import { Stack } from "@mui/system";
import { Footer } from "./layout/Footer";
import { CoinObserver } from "./context/CoinPurseContext";

const Composition = () => {
  const [client, setClient] = useState(DefaultClientState);

  return (
    <ClientContext.Provider value={client}>
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
    </ClientContext.Provider>
  );
};

export default Composition;
