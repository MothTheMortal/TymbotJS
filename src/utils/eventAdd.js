const discordBots = require("../models/discordBot.model");

module.exports = async function eventAdd(eventId, guildID) {
    const discordBot = await discordBots.findOne({discordGuilds: guildID.toString()});
    const data = discordBot.guildData

    const eventData = {
        id: eventId.toString(),
        reminders: []
    }

    data[0][guildID]["events"].push(eventData)
    await discordBots.updateOne({discordGuilds: guildID.toString()}, {$set: {guildData: data}})

}
