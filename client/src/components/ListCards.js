import React from "react";
import { JobCard } from "../components/Card";
import { Box, Grid } from "@mui/material";

export class JobsCards extends React.Component {
    render() {
        return (
            <Grid item md={6} xs={12}>
                <Box
                    m={1}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    {this.props.jobs
                        .slice(
                            this.props.currentPage * this.props.pageSize,
                            this.props.currentPage * this.props.pageSize +
                                this.props.pageSize
                        )
                        .map((job) => (
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
