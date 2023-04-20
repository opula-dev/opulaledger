import React, { useState } from "react";
import ApplicationBar from "./layout/ApplicationBar";
import Route from "./component/Route";
import Ledger from "./ledger/Ledger";
import Craft from "./craft/Craft";
import ClientContext, { DefaultClientState } from "./context/ClientContext";
import { Paper, Typography, Link } from "@mui/material";
import { Business } from "./business/Business";
import { Stack } from "@mui/system";
import { GitHub } from "@mui/icons-material";

const Composition = () => {
  const [client, setClient] = useState(DefaultClientState);

  return (
    <ClientContext.Provider value={client}>
      <div
        style={{
          position: "static",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Stack direction="column" style={{ height: "100%" }}>
          <ApplicationBar />

          <Paper sx={{ padding: "2% 2% 3rem 2%" }}>
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
          <Paper
            style={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "0",
              padding: ".25rem",
            }}
          >
            <Link href="https://github.com/opula-dev/opulaledger" sx={{display: "flex"}}>
                <GitHub color="disabled" sx={{mr:".5rem"}}/>
                <Typography color="grey">Github - opula-dev</Typography>
            </Link>
          </Paper>
        </Stack>
      </div>
    </ClientContext.Provider>
  );
};

export default Composition;
