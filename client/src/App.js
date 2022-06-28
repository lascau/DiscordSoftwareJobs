import React, { useEffect, useState } from "react";
import "./App.css";
import JobsCards from "./components/ListCards";
import { fetchEventSource } from "@microsoft/fetch-event-source";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
    Box,
    Stack,
    Dialog,
    Checkbox,
    Pagination,
    CircularProgress,
} from "@mui/material";
import DarkMode from "./components/DarkMode";
import "./components/css/DarkMode.css";
import BottomPage from "./components/BottomPage";

const serverBaseURL = "http://localhost:3006/api/v1/jobs";

function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(5);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [globalJobs, setGlobalJobs] = useState([]);
    // filters
    const [isFilteredByHiring, setIsFilteredByHiring] = useState(false);
    const [isFilteredByRemote, setIsFilteredByRemote] = useState(false);
    const [isFilteredByForHire, setIsFilteredByForHire] = useState(false);

    const getAllJobs = () => {
        setLoading(true);
        fetch("http://localhost:3006/api/v1/jobs")
            .then((res) => res.json())
            .then((jobs) => {
                setJobs(jobs);
                setGlobalJobs(jobs);
                setTotalPages(Math.ceil(jobs.length / jobsPerPage));
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const fetchJobs = async () => {
            await fetchEventSource(`${serverBaseURL}/stream`, {
                method: "POST",
                headers: {
                    Accept: "text/event-stream",
                },
                onopen(res) {
                    if (res.ok && res.status === 200) {
                        console.log("Connection made ", res);
                    } else if (
                        res.status >= 400 &&
                        res.status < 500 &&
                        res.status !== 429
                    ) {
                        console.log("Client side error ", res);
                    }
                },
                onmessage(event) {
                    // notify client side new jobs are posted
                    console.log(event.data);
                    if (event.data === "true") {
                        console.log("trueee");
                        getAllJobs();
                    }
                },
                onclose() {
                    console.log("Connection closed by the server");
                },
                onerror(err) {
                    console.log("There was an error from server", err);
                },
            });
        };
        getAllJobs();
        //fetchJobs();
    }, []);

    const handleChange = (event, page) => {
        console.log(page);
        setCurrentPage(page);
    };

    const showFilterDialogHandler = () => {
        setShowFilterDialog(!showFilterDialog);
    };

    const handleHiringCheckbox = (e) => {
        const isHiringChecked = document.getElementById("hiring_checkbox")
            .checked;
        const isRemoteChecked = document.getElementById("remote_checkbox")
            .checked;
        const isForHireChecked = document.getElementById("for_hire_checkbox")
            .checked;
        console.log(isForHireChecked, isHiringChecked, isRemoteChecked);

        const filteredJobs = globalJobs.filter(
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

        setJobs(filteredJobs);
        setTotalPages(Math.ceil(filteredJobs.length / jobsPerPage));
        setCurrentPage(1);

        //filters
        setIsFilteredByHiring(isHiringChecked);
        setIsFilteredByRemote(isRemoteChecked);
        setIsFilteredByForHire(isForHireChecked);
    };

    return (
        <div className="App">
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    <Box
                        m={3}
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <Stack direction="row" spacing={10}>
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
                            <Pagination
                                count={totalPages}
                                shape="rounded"
                                variant="text"
                                className={"paginationLinkStyle"}
                                onChange={handleChange}
                            />
                            <DarkMode />
                        </Stack>
                        <JobsCards
                            jobs={jobs}
                            currentPage={currentPage}
                            pageSize={jobsPerPage}
                        />
                        <BottomPage />
                    </Box>
                </div>
            )}
        </div>
    );
}

export default App;
