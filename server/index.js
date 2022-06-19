const express = require("express");
const cors = require("cors");
const jobs_routes = require("./routes/jobs");
const background_tasks = require("./helpers/DiscordHelpers.js");
const app = express();
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT_SERVER;

app.use(express.json());
app.use(cors());

// Database Connection
const db = require("./config/db");
db.authenticate()
    .then(() => {
        console.log("Database connected...");
    })
    .catch((err) => {
        console.log("Error: " + err);
    });

setInterval(() => {
    //Reactiflux
    let areNewJobs = background_tasks.getJobsbyChannel(103882387330457600);
    areNewJobs.then(are_jobs => console.log(are_jobs))
    //console.log("------>$$$", areNewJobs.then(job => console.log(job)));
    //background_tasks.getJobsbyChannel(755177988533780480);
    //
}, 3000);

// Home
app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>");
});

//Job's routes
app.use("/api/v1/jobs", jobs_routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
