require("dotenv").config();
const express = require("express");
const jobs_routes = require("./routes/jobs");
const app = express();
const port = process.env.PORT;

app.use(express.json());

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
