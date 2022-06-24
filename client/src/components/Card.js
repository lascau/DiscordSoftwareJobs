import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Avatar,
} from "@mui/material";
//import { ExpandMore } from "@material-ui/icons/ExpandMore";
import discordAvatar from "../assets/one_punch_man.png";

const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    width: "45vw",
    height: "19%",
};

export class JobCard extends React.Component {
    state = {
        shadow: 1,
    };

    onMouseOver = () => this.setState({ shadow: 30 });

    onMouseOut = () => this.setState({ shadow: 10 });

    render() {
        return (
            <Card
                style={cardStyle}
                sx={{
                    ":hover": {
                        boxShadow: 10, // theme.shadows[20]
                    },
                }}
            >
                <CardHeader
                    title={this.props.author}
                    avatar={<Avatar src={discordAvatar} />}
                ></CardHeader>
                <CardContent
                    sx={{
                        ":hover": {
                            fontSize: 20, // theme.shadows[20]
                        },
                    }}
                >
                    <Typography variant="h7">
                        {this.props.jobDescription}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default JobCard;
