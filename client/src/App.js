import React, { useEffect, useState } from "react";
import "./App.css";
import JobsCards from "./components/ListCards";

function App() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
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
