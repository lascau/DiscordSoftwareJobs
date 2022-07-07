import React from "react";
import { Box, Stack, Typography } from "@mui/material";
// images
import gophers_logo from "../assets/discord_servers_logos/gophers.webp";
import nodeiflux_logo from "../assets/discord_servers_logos/nodeiflux.webp";
import reactiflux_logo from "../assets/discord_servers_logos/reactiflux.webp";
import next_js_logo from "../assets/discord_servers_logos/nest_js.webp";
// css
import "./css/DiscordLogos.css";

export const AboutPage = () => {
    const joinServerRedirectLink = (event) => {
        const imgTagClasName = event.target.className;
        console.log(imgTagClasName);
        if (imgTagClasName === "react") {
            window.location.href = "https://discord.com/invite/reactiflux";
        } else if (imgTagClasName === "node") {
            window.location.href = "https://discord.com/invite/vUsrbjd";
        } else if (imgTagClasName === "nest") {
            window.location.href = "https://discord.com/invite/nestjs";
        } else if (imgTagClasName === "go") {
            window.location.href = "https://discord.com/invite/golang";
        }
    };

    return (
        <>
            <Box
                m={3}
                display="flex"
                alignItems="center"
                flexDirection="column"
            >
                <Typography variant="h6">
                    A job board for software engineers dedicated discord
                    servers(react, node, nestjs, go)
                </Typography>
                <Stack direction="row" spacing={5}>
                    <img
                        className="react"
                        src={reactiflux_logo}
                        alt="Logo Reactiflux"
                        onClick={joinServerRedirectLink}
                    />
                    <img
                        className="node"
                        src={nodeiflux_logo}
                        alt="Logo Nodeiflux"
                        onClick={joinServerRedirectLink}
                    />
                    <img
                        className="nest"
                        src={next_js_logo}
                        alt="Logo NestJs"
                        onClick={joinServerRedirectLink}
                    />
                    <img
                        className="go"
                        src={gophers_logo}
                        alt="Logo Gophers"
                        onClick={joinServerRedirectLink}
                    />
                </Stack>
            </Box>
        </>
    );
};
