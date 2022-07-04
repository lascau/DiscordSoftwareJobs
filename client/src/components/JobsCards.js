import React from "react";
import { JobCard } from "../components/Card";
import { Box, Grid } from "@mui/material";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
export class JobsCards extends React.Component {
    render() {
        return (
            <Grid item md={6} xs={12}>
                {this.props.jobs.length === 0 ? (
                    <Box ml={-10}>
                        <DoDisturbIcon
                            fontSize="large"
                            style={{ color: "red" }}
                        />
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
