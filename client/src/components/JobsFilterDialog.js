import React, { useState } from "react";

import { Box, Stack, Dialog, Checkbox } from "@mui/material";

export const JobsFilterDialog = (props) => {
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    // filters
    const [isFilteredByHiring, setIsFilteredByHiring] = useState(false);
    const [isFilteredByRemote, setIsFilteredByRemote] = useState(false);
    const [isFilteredByForHire, setIsFilteredByForHire] = useState(false);

    const handleHiringCheckbox = (e) => {
        const isHiringChecked = document.getElementById("hiring_checkbox")
            .checked;
        const isRemoteChecked = document.getElementById("remote_checkbox")
            .checked;
        const isForHireChecked = document.getElementById("for_hire_checkbox")
            .checked;

        const filteredJobs = props.globalJobs.filter(
            (job) =>
                (isHiringChecked
                    ? job.content.toLowerCase().includes("hiring")
                    : true) &&
                (isRemoteChecked
                    ? job.content.toLowerCase().includes("remote")
                    : true) &&
                (isForHireChecked
                    ? job.content.toLowerCase().includes("for hire")
                    : true)
        );

        props.setJobs(filteredJobs);
        props.setTotalPages(Math.ceil(filteredJobs.length / props.jobsPerPage));
        props.setCurrentPage(1);

        //filters
        setIsFilteredByHiring(isHiringChecked);
        setIsFilteredByRemote(isRemoteChecked);
        setIsFilteredByForHire(isForHireChecked);
    };

    const showFilterDialogHandler = () => {
        setShowFilterDialog(!showFilterDialog);
    };

    return (
        <div>
            <img
                src="filter-funnel.svg"
                sx={{
                    "&:hover": {
                        transform: "rotate(-10deg) ",
                    },
                }}
                onClick={showFilterDialogHandler}
                alt="filter funnel logo"
            />
            <Dialog
                open={showFilterDialog}
                onClose={() => setShowFilterDialog(false)}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="300px"
                >
                    <Stack>
                        <Stack direction="row">
                            <p>For Hire</p>
                            <Checkbox
                                id="for_hire_checkbox"
                                onChange={handleHiringCheckbox}
                                checked={isFilteredByForHire}
                                label="For-Hire"
                                style={{ color: "black" }}
                            />
                        </Stack>
                        <Stack direction="row">
                            <p>Hiring &nbsp;&nbsp;</p>
                            <Checkbox
                                id="hiring_checkbox"
                                onChange={handleHiringCheckbox}
                                checked={isFilteredByHiring}
                                style={{ color: "black" }}
                            />
                        </Stack>
                        <Stack direction="row">
                            <p>Remote</p>
                            <Checkbox
                                id="remote_checkbox"
                                onChange={handleHiringCheckbox}
                                checked={isFilteredByRemote}
                                label="Remote"
                                style={{ color: "black" }}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Dialog>
        </div>
    );
};
