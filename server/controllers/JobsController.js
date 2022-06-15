const Job = require("../models/Job");

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
    };
    const _transaction = await Job.sequelize.transaction();
    try {
        Job.findOne({ where: { author: job.author, content: job.content } })
            .then((token) => token !== null)
            .then((jobExist) => {
                if (!jobExist) {
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
                } else {
                    res.status(200).send({ message: "Duplicare job in table" });
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

module.exports = {
    createJob,
    updateJob,
    deleteJob,
    fetchJob,
    fetchAllJobs,
};
