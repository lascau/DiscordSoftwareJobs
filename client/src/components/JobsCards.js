import React from "react";
import { JobCard } from "../components/Card";
import { Box, Grid, Typography } from "@mui/material";

const JobsCards = (props) => {
    return (
        <Grid item md={6} xs={12}>
            {props.jobs.length === 0 ? (
                <Box display="flex" alignItems="center" flexDirection="column">
                    <Typography variant="h5" gutterBottom>
                        No jobs available
                    </Typography>
                </Box>
            ) : (
                props.jobs
                    .slice(
                        (props.currentPage - 1) * props.pageSize,
                        (props.currentPage - 1) * props.pageSize +
                            props.pageSize
                    )
                    .map((job, index) => (
                        <Box mb={2}>
                            <JobCard
                                author={job.author}
                                jobDescription={job.content}
                                avatarId={job.avatar_id}
                                authorId={job.author_id}
                                key={`JobCard
                                    ${(props.currentPage - 1) * props.pageSize +
                                        index}
                                `}
                                cardId={
                                    (props.currentPage - 1) * props.pageSize +
                                    index +
                                    500
                                }
                            />
                        </Box>
                    ))
            )}
        </Grid>
    );
};

export default JobsCards;
