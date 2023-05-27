import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Composition from "./Composition";
import AppTheme from "./theme/AppTheme";

const App = () => {
    return (
        <ThemeProvider theme={AppTheme}>
            <CssBaseline />
            <Composition />
        </ThemeProvider>
    );
};

export default App;
