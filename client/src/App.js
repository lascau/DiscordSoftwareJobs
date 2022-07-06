import React from "react";
import "./App.css";
import { JobsPage } from "./components/JobsPage";
import { HomePage } from "./components/HomePage";
import { Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export const App = () => {
    return (
        <>
            <Box
                m={3}
                display="flex"
                alignItems="center"
                flexDirection="column"
            >
                <nav>
                    <Link to="/home">
                        <Button variant="contained">Home</Button>
                    </Link>
                    <Link to="/jobs">
                        <Button variant="contained">Jobs</Button>
                    </Link>
                </nav>
            </Box>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
            </Routes>
        </>
    );
};
