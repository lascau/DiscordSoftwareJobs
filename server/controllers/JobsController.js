const Job = require("../models/Job");

const createJob = (req, res) => {
    // Validate request
    if (!req.body.content) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    // Create a Job
    const job = {
        content: req.body.content,
        author: req.body.author,
        date_posted: req.body.date_posted,
    };

    // Save Job in the database
    Job.create(job)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Job.",
            });
        });
};

const updateJob = (req, res) => {
    const _id = req.params.id;

    const updatedJob = {
        content: req.body.content,
        author: req.body.author,
        date_posted: req.body.date_posted,
    };

    Job.update(updatedJob, { where: { id: _id } })
        .then((num) => {
            if (num == 1) {
                res.send({ message: "Job was updated succesfully!" });
            } else {
                res.send({
                    message: `Cannot update Job with id = ${_id}!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not update Job with id=${_id}!`,
            });
        });
};

const deleteJob = (req, res) => {
    const _id = req.params.id;
    Job.destroy({
        where: {
            id: _id,
        },
    })
        .then((num) => {
            if (num == 1) {
                res.send({ message: "Job was deleted succesfully!" });
            } else {
                res.send({ message: `Cannot delete Job with id=${_id}!` });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Could not delete Job with id=${_id}!`,
            });
        });
};

const fetchJob = (req, res) => {
    const _id = req.params.id;
    Job.findAll({
        where: {
            id: _id,
        },
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving job.",
            });
        });
};

const fetchAllJobs = (req, res) => {
    Job.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving jobs.",
            });
        });
};

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    fetchJob,
    fetchAllJobs,
};
