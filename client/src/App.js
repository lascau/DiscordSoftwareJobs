import React, { useEffect, useState } from "react";
import "./App.css";
import JobsCards from "./components/ListCards";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { Box, Stack, Pagination, CircularProgress } from "@mui/material";
import DarkMode from "./components/DarkMode";
import "./components/css/DarkMode.css";
import BottomPage from "./components/BottomPage";
import JobsFilterDialog from "./components/JobsFilterDialog";

const serverBaseURL = "http://localhost:3006/api/v1/jobs";

function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage, setJobsPerPage] = useState(5);
    const [globalJobs, setGlobalJobs] = useState([]);

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
                    />
                    <BottomPage />
                </Box>
            )}
        </div>
    );
}

export default App;
