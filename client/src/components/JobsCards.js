import React from "react";
import { JobCard } from "../components/Card";
import { Box, Grid, Typography } from "@mui/material";
export class JobsCards extends React.Component {
    render() {
        return (
            <Grid item md={6} xs={12}>
                {this.props.jobs.length === 0 ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <Typography variant="h5" gutterBottom>
                            No jobs available
                        </Typography>
                    </Box>
                ) : (
                    this.props.jobs
                        .slice(
                            (this.props.currentPage - 1) * this.props.pageSize,
                            (this.props.currentPage - 1) * this.props.pageSize +
                                this.props.pageSize
                        )
                        .map((job, index) => (
                            <Box mb={2}>
                                <JobCard
                                    author={job.author}
                                    jobDescription={job.content}
                                    avatarId={job.avatar_id}
                                    authorId={job.author_id}
                                    key={`Job ${(this.props.currentPage - 1) *
                                        this.props.pageSize +
                                        index}`}
                                />
                            </Box>
                        ))
                )}
            </Grid>
        );
    }
}

export default JobsCards;
