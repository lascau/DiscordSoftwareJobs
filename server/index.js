const express = require("express");
const cors = require("cors");
const jobs_routes = require("./routes/jobs");
const app = express();
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3009;

app.use(express.json());

app.options('*', cors()) 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://discord-jobs-client.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Database Connection
const db = require("./config/db");
db.authenticate()
    .then(() => {
        console.log("Database connected...");
    })
    .catch((err) => {
        console.log("Error: " + err);
    });

// Home
app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>");
});

//Job's routes
app.use("/api/v1/jobs", jobs_routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
