import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";

const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const BottomPage = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="300px"
        >
            <ArrowUpwardIcon
                fontSize="large"
                className="arrowScrollUp"
                onClick={scrollTop}
            />
            <footer>© 2022 Lascau Ionut Sebastian</footer>
        </Box>
    );
};

export default BottomPage;
