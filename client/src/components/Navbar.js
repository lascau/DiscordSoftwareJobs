import React from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DarkMode } from "./DarkMode";

export const Navbar = () => {
    return (
        <Box m={3} display="flex" alignItems="center" flexDirection="column">
            <nav className="navigation">
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <Typography variant="h5" gutterBottom>
                            Jobs
                        </Typography>
                    </NavLink>
                    <NavLink to="/about" style={{ textDecoration: "none" }}>
                        <Typography variant="h5" gutterBottom>
                            About
                        </Typography>
                    </NavLink>
                    <DarkMode />
                </Breadcrumbs>
            </nav>
        </Box>
    );
};
