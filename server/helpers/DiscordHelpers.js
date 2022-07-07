require("dotenv").config({ path: "../../.env" });

const axios = require("axios");

const getJobsbyChannel = async(channel_id, limit = 5) => {
    const headers = {
        "Content-Type": "application/json",
        authorization: process.env.DISCORD_AUTHORIZATION_TEST_ACCOUNT,
    };
    let areNewJobs = false;
    await axios
        .get(
            `https://discord.com/api/v9/channels/${channel_id}/messages?limit=${limit}`,
            { headers }
        )
        .then(async(res) => {
            let discord_messages = res.data;
            await Promise.all(discord_messages.map(async (message) => {
                await axios.post("http://localhost:3006/api/v1/jobs", {
                    author: message.author.username,
                    content: message.content,
                    date_posted: message.timestamp,
                    avatar_id: message.author.avatar,
                    author_id: message.author.id
                }).then(res => {
                    if (res.status === 200) {
                        areNewJobs = true;
                    }
                }).catch(err => {});
            }));
        })
        .catch((err) => {});

    return areNewJobs;
};

exports.getJobsbyChannel = getJobsbyChannel;
