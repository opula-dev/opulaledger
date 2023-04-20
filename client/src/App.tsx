import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./theme/AppTheme";
import Composition from "./Composition";

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <Composition />
    </ThemeProvider>
  );
};

export default App;
