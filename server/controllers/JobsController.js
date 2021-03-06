const Job = require("../models/Job");
const background_tasks = require("../helpers/DiscordHelpers");
require("dotenv").config({ path: "../.env" });

const createJob = async (req, res) => {
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
        author_id: req.body.author_id,
        avatar_id: req.body.avatar_id 
    };
    const _transaction = await Job.sequelize.transaction();
    try {
        Job.findOne({ where: { author: job.author, content: job.content } })
            .then((token) => token !== null)
            .then((jobExist) => {
                if (!jobExist) {
                    Job.create(job)
                        .then((data) => {
                            res.send({data: data, message: "New Job added"});
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    "Some error occurred while creating the Job.",
                            });
                        });
                } else {
                    res.status(409).send({ message: "Duplicate job in table" });
                }
            });
        _transaction.commit();
    } catch (error) {
        _transaction.rollback();
    }
};

const updateJob = async (req, res) => {
    const _id = req.params.id;

    const updatedJob = {
        content: req.body.content,
        author: req.body.author,
        date_posted: req.body.date_posted,
    };

    const _transaction = await Job.sequelize.transaction();
    try {
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
        _transaction.commit();
    } catch (error) {
        _transaction.rollback();
    }
};

const deleteJob = async (req, res) => {
    const _id = req.params.id;
    const _transaction = await Job.sequelize.transaction();
    try {
        Job.destroy(
            {
                where: {
                    id: _id,
                },
            },
            _transaction
        )
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
        _transaction.commit();
    } catch (error) {
        _transaction.rollback();
    }
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

const streamNotifyNewJobs = async(req, res) => {

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
    });

   await background_tasks
        .getJobsbyChannel(process.env.REACTIFLUX_JOB_BOARD_SERVER_ID)
        .then(r => {
            res.write(`data: ${r}`);
            res.write("\n\n");
        })  
};

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    fetchJob,
    fetchAllJobs,
    streamNotifyNewJobs,
};
