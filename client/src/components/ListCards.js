import React from "react";
import { JobCard } from "../components/Card";
import { Box, Grid } from "@mui/material";

export class JobsCards extends React.Component {
    state = {
        jobs: [],
    };
    render() {
        return (
            <Grid item md={6} xs={12}>
                <Box
                    m={1}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    {this.props.jobs.map((job) => (
                        <Box mb={2}>
                            <JobCard
                                author={job.author}
                                jobDescription={job.content}
                            />
                        </Box>
                    ))}
                </Box>
            </Grid>
        );
    }
}

export default JobsCards;
