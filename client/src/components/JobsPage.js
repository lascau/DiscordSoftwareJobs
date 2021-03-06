import React, { useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Box, Stack, Pagination, CircularProgress } from "@mui/material";
import "./css/DarkMode.css";
import JobsCards from "./JobsCards";
import { JobsFilterDialog } from "./JobsFilterDialog";
import { JobsFooter } from "./JobsFooter";
import { DarkMode } from "./DarkMode";
import { AboutPage } from "./AboutPage";

const GET_ALL_JOBS_ENDPOINT = "http://localhost:3006/api/v1/jobs";

export const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(5);
    const [globalJobs, setGlobalJobs] = useState([]);

    const getAllJobs = () => {
        setLoading(true);
        fetch(GET_ALL_JOBS_ENDPOINT)
            .then((res) => res.json())
            .then((jobs) => {
                setJobs(jobs);
                setGlobalJobs(jobs);
                setTotalPages(Math.ceil(jobs.length / jobsPerPage));
                setLoading(false);
            })
            .catch((err) => console.log(err));
        console.log(loading);
    };

    const fetchJobs = async () => {
        await fetchEventSource(`http://localhost:3006/api/v1/jobs/stream`, {
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
                    // console.log("trueee");
                    getAllJobs();
                } else {
                    //console.log("falseee");
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

    useEffect(() => {
        getAllJobs();
        fetchJobs();
    }, []);

    const handleChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div className="App">
            {loading ? (
                <CircularProgress style={{ color: "#000000" }} />
            ) : (
                <Box
                    m={3}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    <AboutPage />
                    <Stack direction="row" spacing={10}>
                        <JobsFilterDialog
                            globalJobs={globalJobs}
                            setJobs={setJobs}
                            setTotalPages={setTotalPages}
                            jobsPerPage={jobsPerPage}
                            setCurrentPage={setCurrentPage}
                        />
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
                        key={Math.random()}
                    />
                    <JobsFooter jobsLength={jobs.length} />
                </Box>
            )}
        </div>
    );
};
