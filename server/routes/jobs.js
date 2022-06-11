const express = require("express");
const router = express.Router();

const {
    createJob,
    fetchJob,
    fetchAllJobs,
    updateJob,
    deleteJob,
} = require("../controllers/JobsController");

router.post("/", createJob);
router.get("/", fetchAllJobs);
router.get("/:id", fetchJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
