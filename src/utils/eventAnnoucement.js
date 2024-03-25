const fs = require("node:fs");
const updateKnowledgeBase = require('../utils/updateKnowledgeBase');
const authenticate = require("./authCheck");
const discordBots = require("../models/discordBot.model");

module.exports = async function eventAnnouncement(event) {
    const auth = await authenticate(event.guild.id)
    const guildData = auth.guildData

    const notify = guildData[0][event.guild.id].eventNotification;
    let rolePing = "";

    if (notify) {
        rolePing = `<@&${notify}> `
    }

    for (const eventChannelID of guildData[0][event.guild.id].eventChannels) {
        const eventChannel = await event.client.channels.fetch(eventChannelID);
        await eventChannel.send({ content: rolePing + `[New Event!](${event.url})`})
    }

}