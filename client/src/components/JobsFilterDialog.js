import React, { useState } from "react";

import { Box, Stack, Dialog, Checkbox } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const JobsFilterDialog = (props) => {
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
        console.log(isForHireChecked, isHiringChecked, isRemoteChecked);

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
            <FilterAltIcon onClick={showFilterDialogHandler} />
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
                            />
                        </Stack>
                        <Stack direction="row">
                            <p>Hiring &nbsp;&nbsp;</p>
                            <Checkbox
                                id="hiring_checkbox"
                                onChange={handleHiringCheckbox}
                                checked={isFilteredByHiring}
                                label="Hiring"
                            />
                        </Stack>
                        <Stack direction="row">
                            <p>Remote</p>
                            <Checkbox
                                id="remote_checkbox"
                                onChange={handleHiringCheckbox}
                                checked={isFilteredByRemote}
                                label="Remote"
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Dialog>
        </div>
    );
};

export default JobsFilterDialog;
