require("dotenv").config({ path: "../.env" });

const axios = require("axios");

// endpoint for getting avatar
// https://cdn.discordapp.com/avatars/author_id/avatar_id.png?size=160

const getJobsbyChannel = async (channel_id, limit = 1) => {
    const headers = {
        "Content-Type": "application/json",
        authorization: process.env.DISCORD_AUTHORIZATION,
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
                }).then(res => {
                    if (res.data.message !== "Duplicare job in table") {
                        areNewJobs = true;
                    }
                }).catch(err => console.log(err));
            }));
        })
        .catch((err) => {
            console.log(err, "->$$$");
        });
    return areNewJobs;
};

exports.getJobsbyChannel = getJobsbyChannel;
