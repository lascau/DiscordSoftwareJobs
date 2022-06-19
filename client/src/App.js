import React, { useEffect, useState } from "react";
import "./App.css";
import JobsCards from "./components/ListCards";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const serverBaseURL = "http://localhost:3006/api/v1/jobs";

function App() {
    const [jobs, setJobs] = useState([]);

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
                    //const data = JSON.parse(event.data);
                    console.log(event.data);
                },
                onclose() {
                    console.log("Connection closed by the server");
                },
                onerror(err) {
                    console.log("There was an error from server", err);
                },
            });
        };
        fetchJobs();

        fetch("http://localhost:3006/api/v1/jobs")
            .then((res) => res.json())
            .then((jobs) => {
                console.log(jobs);
                setJobs(jobs);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="App">
            <JobsCards jobs={jobs} />
        </div>
    );
}

export default App;
