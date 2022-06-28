import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const BottomPage = () => {
    return (
        <div>
            <ArrowUpwardIcon
                fontSize="large"
                className="arrowScrollUp"
                onClick={scrollTop}
            />
            <footer>© 2022 Lascau Ionut Sebastian</footer>
        </div>
    );
};

export default BottomPage;
