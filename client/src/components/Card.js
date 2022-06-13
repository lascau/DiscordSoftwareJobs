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
};

export class JobCard extends React.Component {
    state = {
        showFullCardContent: false,
    };

    hideShowCardContentEvent = () => {
        this.state.showFullCardContent = !this.state.showFullCardContent;
        console.log(this.state.showFullCardContent);
    };

    render() {
        return (
            <Card style={cardStyle}>
                <CardHeader
                    title={this.props.author}
                    avatar={<Avatar src={discordAvatar} />}
                ></CardHeader>
                <CardContent>
                    <Typography variant="h7">
                        {this.props.jobDescription}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default JobCard;
