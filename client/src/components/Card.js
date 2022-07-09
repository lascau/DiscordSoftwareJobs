import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Avatar,
    Box,
} from "@mui/material";
import reactiflux_logo from "../assets/discord_servers_logos/reactiflux.webp";

const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    width: "45vw",
    height: "19%",
};

export const JobCard = (props) => {
    return (
        <Card
            style={cardStyle}
            sx={{
                ":hover": {
                    boxShadow: 10,
                },
            }}
            key={props.key}
        >
            <CardHeader
                title={props.author}
                avatar={
                    <Avatar
                        src={
                            props.avatarId
                                ? `https://cdn.discordapp.com/avatars/${props.authorId}/${props.avatarId}.png?size=60"`
                                : ""
                        }
                    />
                }
            ></CardHeader>
            <CardContent
                sx={{
                    ":hover": {
                        fontSize: 18,
                    },
                }}
            >
                <Typography variant="h7">{props.jobDescription}</Typography>
                <Box display="flex" alignItems="center" flexDirection="column">
                    <img
                        className="react_jobs_cards"
                        src={reactiflux_logo}
                        alt="Logo Reactiflux"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobCard;
