import React from "react";
import { Box, Breadcrumbs, Typography, MenuItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DarkMode } from "./DarkMode";

export const Navbar = () => {
    return (
        <Box m={3} display="flex" alignItems="center" flexDirection="column">
            <nav className="navigation">
                <Breadcrumbs aria-label="breadcrumb">
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <MenuItem>
                            <Typography variant="h5" gutterBottom>
                                Jobs
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    <NavLink to="/about" style={{ textDecoration: "none" }}>
                        <MenuItem>
                            <Typography variant="h5" gutterBottom>
                                About
                            </Typography>
                        </MenuItem>
                    </NavLink>
                    <DarkMode />
                </Breadcrumbs>
            </nav>
        </Box>
    );
};
