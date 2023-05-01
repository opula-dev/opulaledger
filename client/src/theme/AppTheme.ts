import "@fontsource/noto-sans";
import { createTheme } from "@mui/material";

/* Modify typing for custom values */
declare module "@mui/material/styles" {
  interface Palette {
    gold?: Palette["primary"];
    silver?: Palette["primary"];
    copper?: Palette["primary"];
  }

  interface PaletteOptions {
    gold?: PaletteOptions["primary"];
    silver?: PaletteOptions["primary"];
    copper?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    gold: true;
    silver: true;
    copper: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    gold: true;
    silver: true;
    copper: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gold: true;
    silver: true;
    copper: true;
  }
}

/* Main Theme */
const AppTheme = createTheme({
  palette: {
    mode: "dark",
    gold: {
      main: "#ffcc00",
      contrastText: "#000",
    },
    silver: {
      main: "#cccccc",
      contrastText: "#000",
    },
    copper: {
      main: "#cc6633",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: "Noto Sans",
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: 44,
          minHeight: 44,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: "0", ":last-child": { padding: "0" } },
      },
    },
  },
});

export default AppTheme;
