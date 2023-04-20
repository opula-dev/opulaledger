import { useContext } from "react";
import { AutoStories, Storefront, TableRestaurant } from "@mui/icons-material";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import ClientContext from "../context/ClientContext";
import CoinPurse from "./CoinPurse";

const ApplicationBar = () => {
  const clientContext = useContext(ClientContext);

  /**
   * @remarks Change the href state without causing link reloads
   * @param event onClick MouseEvent
   * @param href href to point the page to
   * @returns void
   * https://github.com/ncoughlin/react-widgets/blob/master/src/components/Link.js
   */
  const changePage = (event: React.MouseEvent, href: string) => {
    // if ctrl or meta key are held on click, allow default behavior of opening link in new tab
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    // update url
    window.history.pushState({}, "", href);

    // communicate to Routes that URL has changed
    const navEvent = new PopStateEvent("silentNav");
    window.dispatchEvent(navEvent);
  };

  return (
    <AppBar
      position="sticky"
      style={{
        position: "-webkit-sticky",
      }}
    >
      <Toolbar variant="dense">
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: "2%",
            fontWeight: 700,
            letterSpacing: ".2rem",
          }}
        >
          FT
        </Typography>

        <CoinPurse />

        <Button
          variant="text"
          size="large"
          startIcon=<AutoStories />
          sx={{
            width: "15%",
            color: "inherit",
            display: { md: "flex" },
          }}
          onClick={(e) => {
            changePage(e, "/");
          }}
        >
          <Typography sx={{ display: { xs: "none", md: "flex" } }}>
            {clientContext.player === undefined
              ? "Ledger"
              : clientContext.player}
          </Typography>
        </Button>

        <Button
          variant="text"
          size="large"
          startIcon=<TableRestaurant />
          sx={{
            width: "15%",
            color: "inherit",
            display: { md: "flex" },
          }}
          onClick={(e) => {
            changePage(e, "/craft");
          }}
        >
          <Typography sx={{ display: { xs: "none", md: "flex" } }}>
            Craft
          </Typography>
        </Button>

        <Button
          variant="text"
          size="large"
          startIcon=<Storefront />
          sx={{
            width: "15%",
            color: "inherit",
            display: { md: "flex" },
          }}
          onClick={(e) => {
            changePage(e, "/business");
          }}
        >
          <Typography sx={{ display: { xs: "none", md: "flex" } }}>
            Business
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
