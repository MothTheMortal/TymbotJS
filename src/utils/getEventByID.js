const discordBots = require("../models/discordBot.model");
const events = require("node:events");



module.exports = async function getEventByID(eventId, guildID) {
    const discordBot = await discordBots.findOne({discordGuilds: guildID.toString()});
    const data = discordBot.guildData

    const events = data[0][guildID.toString()].events

    for (let event of events) {
        if (event.id.toString() === eventId) {
            return event
        }
    }

}