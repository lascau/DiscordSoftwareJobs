require("dotenv").config({ path: "../.env" });

const axios = require("axios");

const getJobsbyChannel = (channel_id, limit = 1) => {
    let jobs = [];
    let job = {};
    const headers = {
        "Content-Type": "application/json",
        authorization: process.env.DISCORD_AUTHORIZATION,
    };

    axios
        .get(
            `https://discord.com/api/v9/channels/${channel_id}/messages?limit=${limit}`,
            { headers }
        )
        .then((res) => {
            //console.log(res);
            let discord_messages = res.data;
            discord_messages.forEach((message) => {
                job.content = message.content;
                job.author = message.author.username;
                job.date_posted = message.timestamp;
                // add current job to list
                jobs.push(job);
            });
            console.log(jobs);
        })
        .catch((err) => console.log(err));
};

getJobsbyChannel("426384543818448896");
