const fs = require("node:fs");
const updateKnowledgeBase = require('../utils/updateKnowledgeBase');
const authenticate = require("./authCheck");

async function sendAnnouncement(channels) {

}


module.exports = async function eventAnnouncement(event) {
    const auth = await authenticate(event.guild.id)
    const botData = auth.toJson()
    const guildData = botData.guildData[event.guild.id];

    for (const eventChannelID of guildData.eventChannels) {
        const eventChannel = await event.client.channels.fetch(eventChannelID);
        await eventChannel.send({ content: `[New Event!](${event.url})`})
    }


}