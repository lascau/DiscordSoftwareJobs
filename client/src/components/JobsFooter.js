import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box } from "@mui/material";

export const JobsFooter = ({ jobsLength }) => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return jobsLength ? (
        <Box m={3} display="flex" alignItems="center" flexDirection="column">
            <ArrowUpwardIcon
                fontSize="large"
                className="arrowScrollUp"
                onClick={scrollTop}
            />
            <footer>© 2022 Lascau Ionut Sebastian</footer>
        </Box>
    ) : (
        <></>
    );
};
