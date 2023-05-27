import { GitHub } from "@mui/icons-material";
import { Link, Paper, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <footer
            style={{
                position: "sticky",
                display: "flex",
                flexDirection: "column",
                bottom: 0,
                borderTop: "solid grey 1px",
            }}
        >
            <Paper
                style={{
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "0",
                    padding: ".1rem",
                }}
            >
                <Link
                    href="https://github.com/opula-dev/opulaledger"
                    underline="none"
                    sx={{ display: "flex", scale: "75%" }}
                >
                    <GitHub color="disabled" sx={{ mr: ".5rem" }} />
                    <Typography color="grey">github | opula-dev</Typography>
                </Link>
            </Paper>
        </footer>
    );
};
