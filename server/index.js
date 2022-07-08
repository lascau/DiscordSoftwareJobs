const express = require("express");
const cors = require("cors");
const jobs_routes = require("./routes/jobs");
const app = express();
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3009;

app.use(express.json());
var corsOptions = {
    origin: [ "https://discord-jobs-server.herokuapp.com'"],
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

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
