const updateKnowledgeBase = require('../utils/updateKnowledgeBase');
const getEventById = require('../utils/getEventByID');
const authenticate = require("./authCheck");
const discordBots = require("../models/discordBot.model");

module.exports = async function eventAnnouncement(event, text='None') {
    const auth = await authenticate(event.guild.id)
    const guildData = auth.guildData
    const notify = guildData[0][event.guild.id].eventNotification;
    let rolePing = "";

    if (notify) {
        rolePing = ` <@&${notify}>`
    }

    if (text === 'None' || !text) {
        text = guildData[0][event.guild.id]['eventDefaultText']
    }
    text = text.slice(0, 1900);
    const eventChannel = await event.client.channels.fetch(guildData[0][event.guild.id].eventChannelId);
    await eventChannel.send({ content: text + rolePing + `[.](${event.url})`})


}