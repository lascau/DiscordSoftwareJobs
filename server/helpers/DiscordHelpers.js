require("dotenv").config({ path: "../../.env" });

const axios = require("axios");

// endpoint for getting avatar
// https://cdn.discordapp.com/avatars/author_id/avatar_id.png?size=160
//"https://cdn.discordapp.com/avatars/445824895402901505/12f652cd35ca1e28e33262cb92edc0d0.png?size=60"
const getJobsbyChannel = async(channel_id, limit = 5) => {
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
                console.log('avatar->', message.author.avatar, message.author.id)
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
                }).catch(err => console.log(err));
            }));
        })
        .catch((err) => {
            console.log(err);
        });

    return areNewJobs;
};

exports.getJobsbyChannel = getJobsbyChannel;
